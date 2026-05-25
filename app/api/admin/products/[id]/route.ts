import { NextRequest, NextResponse } from 'next/server';
import { ensureAdminRequest } from '../../../../../lib/admin-route';
import { prisma } from '../../../../../lib/prisma';

type Context = {
  params: Promise<{ id: string }>;
};

export async function DELETE(request: NextRequest, context: Context) {
  const unauthorized = ensureAdminRequest(request);
  if (unauthorized) {
    return unauthorized;
  }

  const { id } = await context.params;

  try {
    await prisma.product.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Product not found' }, { status: 404 });
  }
}

export async function PUT(request: NextRequest, context: Context) {
  const unauthorized = ensureAdminRequest(request);
  if (unauthorized) return unauthorized;

  const { id } = await context.params;
  const body = await request.json();

  try {
    const updated = await prisma.product.update({
      where: { id },
      data: {
        name: body.name,
        description: body.description,
        sortOrder: body.sortOrder,
        imageUrl: body.imageUrl,
        subcategoryId: body.subcategoryId,
        colorVariants: {
          deleteMany: {},
          create: body.colorVariants || [],
        },
      },
    });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}
