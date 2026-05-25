"use client";

import { useState } from 'react';
import Image from 'next/image';
import { productCatalog, type Product } from './catalog';

function ProductCard({ image, title, designer, price, colors }: Product) {
  return (
    <div className="flex flex-col group cursor-pointer">
      <div className="relative aspect-[4/5] bg-[#F4F1ED] mb-6 overflow-hidden flex items-center justify-center transition-all duration-500 group-hover:shadow-xl">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 right-4 flex gap-2 z-10">
          {colors.map((c, i) => (
            <div
              key={i}
              className={`w-6 h-6 rounded-full ${c} shadow-md border-2 border-white/50`}
            />
          ))}
        </div>
      </div>
      <div className="text-center text-sm space-y-1.5">
        <h3 className="font-medium text-gray-800 text-base">{title}</h3>
        <p className="text-gray-500 text-xs tracking-wide">{designer}</p>
        <p className="font-bold text-gray-900 mt-2">{price}</p>
      </div>
    </div>
  );
}

export default function ProductsSection() {
  const [activeCategorySlug, setActiveCategorySlug] = useState<string | null>(null);
  const [activeSubcategorySlug, setActiveSubcategorySlug] = useState<string | null>(null);

  const activeCategory = productCatalog.find((c) => c.slug === activeCategorySlug);
  const activeSubcategory = activeCategory?.subcategories.find(
    (s) => s.slug === activeSubcategorySlug
  );

  const resetToCategories = () => {
    setActiveCategorySlug(null);
    setActiveSubcategorySlug(null);
  };

  const selectCategory = (slug: string) => {
    setActiveCategorySlug(slug);
    setActiveSubcategorySlug(null);
  };

  const selectSubcategory = (slug: string) => {
    setActiveSubcategorySlug(slug);
  };

  return (
    <section className="bg-[#FAF9F6] pt-28 pb-24 px-6 md:px-12 lg:px-20 text-[#333] min-h-screen">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif tracking-tight text-[#1F2937] mb-4">
            Product Catalogue
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Browse by category and subcategory — aluminium profiles, wardrobe systems, glass
            partitions, door hardware, and kitchen fittings.
          </p>
        </div>

        <nav className="flex flex-wrap items-center gap-2 text-sm mb-10 text-gray-500">
          <button
            type="button"
            onClick={resetToCategories}
            className={`hover:text-[#39795F] transition-colors ${
              !activeCategory ? 'text-[#39795F] font-medium' : ''
            }`}
          >
            All Categories
          </button>
          {activeCategory && (
            <>
              <span>/</span>
              <button
                type="button"
                onClick={() => setActiveSubcategorySlug(null)}
                className={`hover:text-[#39795F] transition-colors ${
                  !activeSubcategory ? 'text-[#39795F] font-medium' : ''
                }`}
              >
                {activeCategory.name}
              </button>
            </>
          )}
          {activeSubcategory && (
            <>
              <span>/</span>
              <span className="text-[#39795F] font-medium">{activeSubcategory.name}</span>
            </>
          )}
        </nav>

        {!activeCategory && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {productCatalog.map((category) => (
              <button
                key={category.slug}
                type="button"
                onClick={() => selectCategory(category.slug)}
                className="text-left group bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-stone-200/60"
              >
                <div className="relative aspect-[16/10] bg-[#EFECE8] overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
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
                  className="text-left p-6 bg-white border border-stone-200/60 rounded-sm hover:border-[#39795F]/40 hover:shadow-md transition-all group"
                >
                  <h3 className="text-lg font-medium text-[#1F2937] group-hover:text-[#39795F] transition-colors mb-2">
                    {sub.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">{sub.description}</p>
                  <p className="text-xs uppercase tracking-[0.15em] text-gray-400">
                    {sub.products.length} product{sub.products.length !== 1 ? 's' : ''}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeCategory && activeSubcategory && (
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
                  className={`px-4 py-2 text-sm rounded-sm border transition-colors ${
                    sub.slug === activeSubcategorySlug
                      ? 'bg-[#39795F] text-white border-[#39795F]'
                      : 'bg-white text-gray-600 border-stone-200 hover:border-[#39795F]/50'
                  }`}
                >
                  {sub.name}
                </button>
              ))}
            </aside>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
              {activeSubcategory.products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
