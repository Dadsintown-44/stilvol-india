import { createHmac, randomBytes, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const ADMIN_COOKIE_NAME = 'admin_session';
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

const DEFAULT_ADMIN_EMAIL = 'vinaymore0110@gmail.com';
const DEFAULT_ADMIN_PASSWORD = '1201';

function base64url(value: string) {
  return Buffer.from(value, 'utf8').toString('base64url');
}

function unbase64url(value: string) {
  return Buffer.from(value, 'base64url').toString('utf8');
}

function getSigningSecret() {
  return process.env.ADMIN_AUTH_SECRET || 'change-this-admin-secret';
}

function sign(payload: string) {
  return createHmac('sha256', getSigningSecret()).update(payload).digest('base64url');
}

export function getAdminCredentials() {
  return {
    email: process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD,
  };
}

export function isValidAdminCredentials(email: string, password: string) {
  const admin = getAdminCredentials();
  return email.trim().toLowerCase() === admin.email.toLowerCase() && password === admin.password;
}

export function createAdminSessionToken(email: string) {
  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const nonce = randomBytes(8).toString('hex');
  const payload = `${email}|${exp}|${nonce}`;
  const encodedPayload = base64url(payload);
  const signature = sign(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

export function verifyAdminSessionToken(token?: string | null) {
  if (!token || !token.includes('.')) {
    return null;
  }

  const [encodedPayload, receivedSignature] = token.split('.');
  const expectedSignature = sign(encodedPayload);

  const receivedBuffer = Buffer.from(receivedSignature, 'utf8');
  const expectedBuffer = Buffer.from(expectedSignature, 'utf8');

  if (receivedBuffer.length !== expectedBuffer.length) {
    return null;
  }

  if (!timingSafeEqual(receivedBuffer, expectedBuffer)) {
    return null;
  }

  const [email, expRaw] = unbase64url(encodedPayload).split('|');
  const exp = Number(expRaw);

  if (!email || Number.isNaN(exp) || exp < Math.floor(Date.now() / 1000)) {
    return null;
  }

  return { email };
}

export function setAdminSessionCookie(response: NextResponse, email: string) {
  response.cookies.set(ADMIN_COOKIE_NAME, createAdminSessionToken(email), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_TTL_SECONDS,
  });
}

export function clearAdminSessionCookie(response: NextResponse) {
  response.cookies.set(ADMIN_COOKIE_NAME, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires: new Date(0),
  });
}

export function isAuthenticatedRequest(request: NextRequest) {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  return !!verifyAdminSessionToken(token);
}

export async function getAdminSessionFromServerCookies() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return verifyAdminSessionToken(token);
}
