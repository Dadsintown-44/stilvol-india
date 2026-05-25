import { productCatalog, type Product } from './catalog';

export type ProductSearchResult = {
  product: Product;
  categorySlug: string;
  subcategorySlug: string;
};

function scoreMatch(query: string, text: string): number {
  const q = query.trim().toLowerCase();
  const t = text.toLowerCase();
  if (!q || !t) return 0;
  if (t === q) return 100;
  if (t.startsWith(q)) return 90;
  if (t.includes(q)) return 75;

  const queryWords = q.split(/\s+/).filter(Boolean);
  const matchedWords = queryWords.filter((word) => t.includes(word)).length;
  if (matchedWords === 0) return 0;
  return 50 + (matchedWords / queryWords.length) * 25;
}

function collectScoredMatches(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const matches: { score: number; result: ProductSearchResult }[] = [];

  for (const category of productCatalog) {
    for (const subcategory of category.subcategories) {
      for (const product of subcategory.products) {
        const fields = [
          product.title,
          product.designer,
          product.description,
          category.name,
          subcategory.name,
          product.colorVariants.map((c) => c.name).join(' '),
        ];

        const score = Math.max(...fields.map((field) => scoreMatch(q, field)));

        if (score > 0) {
          matches.push({
            score,
            result: {
              product,
              categorySlug: category.slug,
              subcategorySlug: subcategory.slug,
            },
          });
        }
      }
    }
  }

  return matches;
}

/** Live suggestions while typing (e.g. "war" → wardrobe products). */
export function getProductSearchSuggestions(
  query: string,
  limit = 6
): ProductSearchResult[] {
  if (query.trim().length < 2) return [];

  const seen = new Set<string>();
  return collectScoredMatches(query)
    .sort((a, b) => b.score - a.score)
    .filter(({ result }) => {
      if (seen.has(result.product.id)) return false;
      seen.add(result.product.id);
      return true;
    })
    .slice(0, limit)
    .map(({ result }) => result);
}

/** Search catalogue for exact or close product matches (form submit). */
export function searchProducts(query: string): ProductSearchResult | null {
  const suggestions = getProductSearchSuggestions(query, 1);
  const best = collectScoredMatches(query).sort((a, b) => b.score - a.score)[0];
  return best && best.score >= 50 ? best.result : suggestions[0] ?? null;
}
