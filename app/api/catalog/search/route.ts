import { NextRequest, NextResponse } from 'next/server';
import { searchCatalogProducts } from '../../../../lib/catalog';

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q') || '';
  const products = await searchCatalogProducts(query);
  return NextResponse.json({ products });
}
