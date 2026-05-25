import { prisma } from './prisma';
import type { CatalogCategory } from './catalog-types';

function mapCategory(raw: any): CatalogCategory {
  return {
    slug: raw.uid,
    dbId: raw.id,
    name: raw.name,
    description: raw.description,
    image: raw.imageUrl ?? null,
    sortOrder: raw.sortOrder,
    subcategories: raw.subcategories.map((sub: any) => ({
      slug: sub.uid,
      dbId: sub.id,
      name: sub.name,
      description: sub.description,
      image: sub.imageUrl ?? null,
      sortOrder: sub.sortOrder,
      products: sub.products.map((product: any) => ({
        id: product.uid,
        dbId: product.id,
        name: product.name,
        description: product.description,
        image: product.imageUrl ?? null,
        sortOrder: product.sortOrder,
        colorVariants: product.colorVariants.map((color: any) => ({
          id: color.id,
          name: color.name,
          image: color.imageUrl ?? null,
          sortOrder: color.sortOrder,
        })),
      })),
    })),
  };
}

export async function getCatalogData() {
  const categories = await prisma.category.findMany({
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
    include: {
      subcategories: {
        orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
        include: {
          products: {
            orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
            include: {
              colorVariants: {
                orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
              },
            },
          },
        },
      },
    },
  });

  return categories.map(mapCategory);
}

export async function searchCatalogProducts(query: string) {
  const q = query.trim();
  if (!q) {
    return [];
  }

  // Search Categories
  const categories = await prisma.category.findMany({
    where: { name: { contains: q, mode: 'insensitive' } },
    take: 3,
  });

  // Search Subcategories
  const subcategories = await prisma.subcategory.findMany({
    where: { name: { contains: q, mode: 'insensitive' } },
    take: 3,
    include: { category: true },
  });

  // Search Products
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: q, mode: 'insensitive' } },
        { description: { contains: q, mode: 'insensitive' } },
        {
          colorVariants: {
            some: { name: { contains: q, mode: 'insensitive' } },
          },
        },
      ],
    },
    take: 5,
    include: {
      subcategory: {
        include: { category: true },
      },
    },
  });

  const results: any[] = [];

  for (const cat of categories) {
    results.push({
      type: 'category',
      id: cat.uid,
      name: cat.name,
      image: cat.imageUrl ?? null,
      categoryName: cat.name,
    });
  }

  for (const sub of subcategories) {
    results.push({
      type: 'subcategory',
      id: sub.uid,
      name: sub.name,
      image: sub.imageUrl ?? null,
      categoryName: sub.category.name,
      subcategoryName: sub.name,
    });
  }

  for (const product of products) {
    results.push({
      type: 'product',
      id: product.uid,
      name: product.name,
      image: product.imageUrl ?? null,
      categoryName: product.subcategory.category.name,
      subcategoryName: product.subcategory.name,
      productName: product.name,
    });
  }

  return results;
}
