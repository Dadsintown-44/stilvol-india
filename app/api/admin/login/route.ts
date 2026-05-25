import { NextResponse } from 'next/server';
import { isValidAdminCredentials, setAdminSessionCookie } from '../../../../lib/admin-auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body?.email || '');
    const password = String(body?.password || '');

    if (!isValidAdminCredentials(email, password)) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const response = NextResponse.json({ success: true });
    setAdminSessionCookie(response, email.trim().toLowerCase());
    return response;
  } catch {
    return NextResponse.json({ error: 'Unable to login' }, { status: 400 });
  }
}
