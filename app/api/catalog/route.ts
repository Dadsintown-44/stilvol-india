import { NextResponse } from 'next/server';
import { getCatalogData } from '../../../lib/catalog';

export async function GET() {
  const categories = await getCatalogData();
  return NextResponse.json({ categories });
}
