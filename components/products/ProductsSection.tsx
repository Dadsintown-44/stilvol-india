"use client";

import { useState, useEffect } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { type Category, type Product } from './catalog';
import ProductDetail from './ProductDetail';

function ProductCard({ product, onSelect }: { product: Product; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex flex-col group cursor-pointer text-left w-full"
    >
      <div className="relative aspect-[5/5] bg-[#F4F1ED] mb-6 overflow-hidden flex items-center justify-center transition-all duration-500 group-hover:shadow-xl">
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <div className="text-sm text-gray-500">No image</div>
        )}
      </div>
      <div className="text-center text-sm space-y-1.5">
        <h3 className="font-medium text-gray-800 text-base">{product.name}</h3>
        <p className="text-gray-500 text-xs line-clamp-2">{product.description}</p>
      </div>
    </button>
  );
}

export default function ProductsSection() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [catalog, setCatalog] = useState<Category[]>([]);
  const [activeCategorySlug, setActiveCategorySlug] = useState<string | null>(null);
  const [activeSubcategorySlug, setActiveSubcategorySlug] = useState<string | null>(null);
  const [activeProductId, setActiveProductId] = useState<string | null>(null);
  const [searchNotFound, setSearchNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCatalog() {
      const response = await fetch('/api/catalog', { cache: 'no-store' });
      if (!response.ok) {
        setCatalog([]);
        setLoading(false);
        return;
      }
      const data = await response.json();
      setCatalog(Array.isArray(data.categories) ? data.categories : []);
      setLoading(false);
    }

    loadCatalog();
  }, []);

  useEffect(() => {
    let productId = searchParams.get('product');
    let categorySlug = searchParams.get('category');
    let subcategorySlug = searchParams.get('subcategory');
    const notFound = searchParams.get('notFound');

    if (notFound === '1') {
      setSearchNotFound(true);
      return;
    }

    setSearchNotFound(false);
    
    // Parse custom route format: /category=Category / Subcategory / Product
    if (pathname && pathname.startsWith('/category=')) {
      try {
        const decoded = decodeURIComponent(pathname);
        const parts = decoded.replace('/category=', '').split(' / ');
        
        if (parts.length >= 1) {
          const catName = parts[0];
          const subName = parts[1];
          const prodName = parts[2];
          
          const category = catalog.find((c) => c.name === catName);
          if (category) {
            categorySlug = category.slug;
            
            if (subName) {
              const subcategory = category.subcategories.find((s) => s.name === subName);
              if (subcategory) {
                subcategorySlug = subcategory.slug;
                
                if (prodName) {
                  const product = subcategory.products.find((p) => p.name === prodName);
                  if (product) {
                    productId = product.id;
                  }
                }
              }
            }
          }
        }
      } catch (e) {
        console.error('Failed to parse category route', e);
      }
    }

    if (categorySlug) {
      const category = catalog.find((c) => c.slug === categorySlug);
      
      if (subcategorySlug && category) {
        const subcategory = category.subcategories.find((s) => s.slug === subcategorySlug);
        
        if (productId && subcategory) {
          const product = subcategory.products.find((p) => p.id === productId);
          if (product) {
            setActiveCategorySlug(categorySlug);
            setActiveSubcategorySlug(subcategorySlug);
            setActiveProductId(productId);
            return;
          }
        }
        
        setActiveCategorySlug(categorySlug);
        setActiveSubcategorySlug(subcategorySlug);
        setActiveProductId(null);
        return;
      }
      
      setActiveCategorySlug(categorySlug);
      setActiveSubcategorySlug(null);
      setActiveProductId(null);
      return;
    }

    // If no categorySlug is found in the URL, reset everything
    if (!pathname?.startsWith('/category=')) {
       // Only reset if we are on /products (and not in the middle of a custom route error)
       if (pathname === '/products' && !searchParams.get('category')) {
          setActiveCategorySlug(null);
          setActiveSubcategorySlug(null);
          setActiveProductId(null);
       }
    }
  }, [searchParams, pathname, catalog]);

  const activeCategory = catalog.find((c) => c.slug === activeCategorySlug);
  const activeSubcategory = activeCategory?.subcategories.find((s) => s.slug === activeSubcategorySlug);
  const activeProduct = activeSubcategory?.products.find((p) => p.id === activeProductId);

  const updateUrl = (catSlug: string | null, subSlug: string | null, prodId: string | null) => {
    if (!catSlug) {
      router.push('/products', { scroll: false });
      return;
    }
    
    const cat = catalog.find((c) => c.slug === catSlug);
    if (!cat) return;

    if (subSlug && prodId) {
      const sub = cat.subcategories.find((s) => s.slug === subSlug);
      const prod = sub?.products.find((p) => p.id === prodId);
      if (sub && prod) {
        router.push(`/category=${encodeURIComponent(cat.name)} / ${encodeURIComponent(sub.name)} / ${encodeURIComponent(prod.name)}`, { scroll: false });
        return;
      }
    }
    
    if (subSlug) {
      const sub = cat.subcategories.find((s) => s.slug === subSlug);
      if (sub) {
        router.push(`/category=${encodeURIComponent(cat.name)} / ${encodeURIComponent(sub.name)}`, { scroll: false });
        return;
      }
    }
    
    router.push(`/category=${encodeURIComponent(cat.name)}`, { scroll: false });
  };

  const resetToCategories = () => {
    setActiveCategorySlug(null);
    setActiveSubcategorySlug(null);
    setActiveProductId(null);
    updateUrl(null, null, null);
  };

  const selectCategory = (slug: string) => {
    setActiveCategorySlug(slug);
    setActiveSubcategorySlug(null);
    setActiveProductId(null);
    updateUrl(slug, null, null);
  };

  const selectSubcategory = (slug: string) => {
    setActiveSubcategorySlug(slug);
    setActiveProductId(null);
    updateUrl(activeCategorySlug, slug, null);
  };

  const backToSubcategory = () => {
    setActiveProductId(null);
    updateUrl(activeCategorySlug, activeSubcategorySlug, null);
  };

  if (loading) {
    return (
      <section className="bg-[#FAF9F6] pt-28 pb-24 px-6 md:px-12 lg:px-20 text-[#333] min-h-screen">
        <div className="max-w-[1400px] mx-auto text-sm text-gray-600">Loading products...</div>
      </section>
    );
  }

  return (
    <section className="bg-[#FAF9F6] pt-28 pb-24 px-6 md:px-12 lg:px-20 text-[#333] min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        {searchNotFound && (
          <div
            role="alert"
            className="mb-8 px-4 py-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-sm text-center"
          >
            Product not found. No such item present.
          </div>
        )}

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif tracking-tight text-[#1F2937] mb-4">
            Product Catalogue
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Browse by category and subcategory.
          </p>
        </div>

        <nav className="flex flex-wrap items-center gap-2 text-sm mb-10 text-gray-500">
          <button
            type="button"
            onClick={resetToCategories}
            className={`hover:text-[#39795F] transition-colors ${!activeCategory ? 'text-[#39795F] font-medium' : ''}`}
          >
            All Categories
          </button>
          {activeCategory && (
            <>
              <span>/</span>
              <button
                type="button"
                onClick={() => {
                  setActiveSubcategorySlug(null);
                  setActiveProductId(null);
                  updateUrl(activeCategory.slug, null, null);
                }}
                className={`hover:text-[#39795F] transition-colors ${!activeSubcategory && !activeProduct ? 'text-[#39795F] font-medium' : ''}`}
              >
                {activeCategory.name}
              </button>
            </>
          )}
          {activeSubcategory && (
            <>
              <span>/</span>
              <button
                type="button"
                onClick={backToSubcategory}
                className={`hover:text-[#39795F] transition-colors ${!activeProduct ? 'text-[#39795F] font-medium' : ''}`}
              >
                {activeSubcategory.name}
              </button>
            </>
          )}
          {activeProduct && (
            <>
              <span>/</span>
              <span className="text-[#39795F] font-medium">{activeProduct.name}</span>
            </>
          )}
        </nav>

        {!activeCategory && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {catalog.map((category) => (
              <button
                key={category.slug}
                type="button"
                onClick={() => selectCategory(category.slug)}
                className="text-left group bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-stone-200/60"
              >
                <div className="relative aspect-[10/10] bg-[#EFECE8] overflow-hidden">
                  {category.image ? (
                    <img src={category.image} alt={category.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  ) : (
                    <div className="h-full flex items-center justify-center text-sm text-gray-500">No image</div>
                  )}
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-serif text-[#1F2937] mb-2 group-hover:text-[#39795F] transition-colors">
                    {category.name}
                  </h2>
                  <p className="text-sm text-gray-500 leading-relaxed">{category.description}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#39795F] mt-4 font-semibold">
                    {category.subcategories.length} subcategories
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}

        {activeCategory && !activeSubcategory && (
          <div>
            <div className="mb-10 pb-8 border-b border-stone-200/60">
              <h2 className="text-3xl font-serif text-[#1F2937] mb-2">{activeCategory.name}</h2>
              <p className="text-gray-500">{activeCategory.description}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeCategory.subcategories.map((sub) => (
                <button
                  key={sub.slug}
                  type="button"
                  onClick={() => selectSubcategory(sub.slug)}
                  className="text-left group bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-stone-200/60 flex flex-col h-full"
                >
                  <div className="relative aspect-[10/10] bg-[#EFECE8] overflow-hidden w-full">
                    {sub.image ? (
                      <img src={sub.image} alt={sub.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                      <div className="h-full flex items-center justify-center text-sm text-gray-500">No image</div>
                    )}
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-lg font-medium text-[#1F2937] group-hover:text-[#39795F] transition-colors mb-2">
                      {sub.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4 line-clamp-3 flex-1">{sub.description}</p>
                    <p className="text-xs uppercase tracking-[0.15em] text-gray-400 mt-auto">
                      {sub.products.length} product{sub.products.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeCategory && activeSubcategory && activeProduct && (
          <ProductDetail
            product={activeProduct}
            categoryName={activeCategory.name}
            subcategoryName={activeSubcategory.name}
            onBack={backToSubcategory}
          />
        )}

        {activeCategory && activeSubcategory && !activeProduct && (
          <div>
            <div className="mb-10 pb-8 border-b border-stone-200/60">
              <p className="text-xs uppercase tracking-[0.2em] text-[#39795F] font-semibold mb-2">
                {activeCategory.name}
              </p>
              <h2 className="text-3xl font-serif text-[#1F2937] mb-2">{activeSubcategory.name}</h2>
              <p className="text-gray-500">{activeSubcategory.description}</p>
            </div>

            <aside className="flex flex-wrap gap-2 mb-12">
              {activeCategory.subcategories.map((sub) => (
                <button
                  key={sub.slug}
                  type="button"
                  onClick={() => selectSubcategory(sub.slug)}
                  className={`px-4 py-2 text-sm rounded-sm border transition-colors ${sub.slug === activeSubcategorySlug ? 'bg-[#39795F] text-white border-[#39795F]' : 'bg-white text-gray-600 border-stone-200 hover:border-[#39795F]/50'}`}
                >
                  {sub.name}
                </button>
              ))}
            </aside>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
              {activeSubcategory.products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={() => {
                    setActiveProductId(product.id);
                    updateUrl(activeCategorySlug, activeSubcategorySlug, product.id);
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
