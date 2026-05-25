export type CatalogColor = {
  id: string;
  name: string;
  image: string | null;
  sortOrder: number;
};

export type CatalogProduct = {
  id: string;
  dbId: string;
  name: string;
  description: string;
  image: string | null;
  sortOrder: number;
  colorVariants: CatalogColor[];
};

export type CatalogSubcategory = {
  slug: string;
  dbId: string;
  name: string;
  description: string;
  image: string | null;
  sortOrder: number;
  products: CatalogProduct[];
};

export type CatalogCategory = {
  slug: string;
  dbId: string;
  name: string;
  description: string;
  image: string | null;
  sortOrder: number;
  subcategories: CatalogSubcategory[];
};
