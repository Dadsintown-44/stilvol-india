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
    await prisma.subcategory.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Subcategory not found' }, { status: 404 });
  }
}

export async function PUT(request: NextRequest, context: Context) {
  const unauthorized = ensureAdminRequest(request);
  if (unauthorized) return unauthorized;

  const { id } = await context.params;
  const body = await request.json();

  try {
    const updated = await prisma.subcategory.update({
      where: { id },
      data: {
        name: body.name,
        description: body.description,
        sortOrder: body.sortOrder,
        imageUrl: body.imageUrl,
        categoryId: body.categoryId,
      },
    });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update subcategory' }, { status: 500 });
  }
}
