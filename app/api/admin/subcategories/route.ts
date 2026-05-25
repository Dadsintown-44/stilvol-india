import { NextRequest, NextResponse } from 'next/server';
import { ensureAdminRequest } from '../../../../lib/admin-route';
import { prisma } from '../../../../lib/prisma';
import { makeUid } from '../../../../lib/uid';

export async function POST(request: NextRequest) {
  const unauthorized = ensureAdminRequest(request);
  if (unauthorized) {
    return unauthorized;
  }

  try {
    const body = await request.json();
    const categoryId = String(body?.categoryId || '').trim();
    const name = String(body?.name || '').trim();
    const description = String(body?.description || '').trim();
    const imageUrl = body?.imageUrl ? String(body.imageUrl).trim() : null;
    const sortOrder = Number(body?.sortOrder ?? 0);

    if (!categoryId || !name) {
      return NextResponse.json(
        { error: 'Category and name are required.' },
        { status: 400 }
      );
    }

    const created = await prisma.subcategory.create({
      data: {
        uid: makeUid('sub', name),
        categoryId,
        name,
        description,
        imageUrl,
        sortOrder: Number.isFinite(sortOrder) ? sortOrder : 0,
      },
    });

    return NextResponse.json({ subcategory: created });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to create subcategory' },
      { status: 400 }
    );
  }
}
