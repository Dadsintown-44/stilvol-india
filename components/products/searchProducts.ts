export type ProductSearchResult = {
  type: 'category' | 'subcategory' | 'product';
  id: string;
  name: string;
  image: string | null;
  categoryName: string;
  subcategoryName?: string;
  productName?: string;
};

export async function getProductSearchSuggestions(query: string): Promise<ProductSearchResult[]> {
  const q = query.trim();
  if (q.length < 2) {
    return [];
  }

  const response = await fetch(`/api/catalog/search?q=${encodeURIComponent(q)}`, {
    method: 'GET',
    cache: 'no-store',
  });

  if (!response.ok) {
    return [];
  }

  const data = await response.json();
  const products = Array.isArray(data.products) ? data.products : [];
  return products.map((item: any) => ({
    type: item.type,
    id: String(item.id),
    name: String(item.name),
    image: item.image ? String(item.image) : null,
    categoryName: String(item.categoryName),
    subcategoryName: item.subcategoryName ? String(item.subcategoryName) : undefined,
    productName: item.productName ? String(item.productName) : undefined,
  }));
}

export async function searchProducts(query: string): Promise<ProductSearchResult | null> {
  const suggestions = await getProductSearchSuggestions(query);
  return suggestions[0] || null;
}
