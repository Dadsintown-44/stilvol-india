import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticatedRequest } from './admin-auth';

export function ensureAdminRequest(request: NextRequest) {
  if (!isAuthenticatedRequest(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}
