import { NextRequest, NextResponse } from 'next/server';
import { ensureAdminRequest } from '../../../../lib/admin-route';
import { prisma } from '../../../../lib/prisma';
import { makeUid } from '../../../../lib/uid';

type IncomingColor = {
  name?: string;
  imageUrl?: string | null;
  sortOrder?: number;
};

export async function POST(request: NextRequest) {
  const unauthorized = ensureAdminRequest(request);
  if (unauthorized) {
    return unauthorized;
  }

  try {
    const body = await request.json();
    const subcategoryId = String(body?.subcategoryId || '').trim();
    const name = String(body?.name || '').trim();
    const description = String(body?.description || '').trim();
    const imageUrl = body?.imageUrl ? String(body.imageUrl).trim() : null;
    const sortOrder = Number(body?.sortOrder ?? 0);
    const colors = Array.isArray(body?.colorVariants)
      ? (body.colorVariants as IncomingColor[])
      : [];

    if (!subcategoryId || !name) {
      return NextResponse.json(
        { error: 'Subcategory and name are required.' },
        { status: 400 }
      );
    }

    const normalizedColors = colors
      .map((color, index) => ({
        name: String(color?.name || '').trim(),
        imageUrl: color?.imageUrl ? String(color.imageUrl).trim() : null,
        sortOrder:
          typeof color?.sortOrder === 'number' && Number.isFinite(color.sortOrder)
            ? color.sortOrder
            : index,
      }))
      .filter((color) => color.name.length > 0);

    const created = await prisma.product.create({
      data: {
        uid: makeUid('prd', name),
        subcategoryId,
        name,
        description,
        imageUrl,
        sortOrder: Number.isFinite(sortOrder) ? sortOrder : 0,
        colorVariants: normalizedColors.length
          ? {
              create: normalizedColors,
            }
          : undefined,
      },
      include: {
        colorVariants: true,
      },
    });

    return NextResponse.json({ product: created });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to create product' }, { status: 400 });
  }
}
