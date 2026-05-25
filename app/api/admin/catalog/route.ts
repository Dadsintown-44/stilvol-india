import { NextRequest, NextResponse } from 'next/server';
import { ensureAdminRequest } from '../../../../lib/admin-route';
import { getCatalogData } from '../../../../lib/catalog';

export async function GET(request: NextRequest) {
  const unauthorized = ensureAdminRequest(request);
  if (unauthorized) {
    return unauthorized;
  }

  const categories = await getCatalogData();
  return NextResponse.json({ categories });
}
