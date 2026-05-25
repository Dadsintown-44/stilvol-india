"use client";

import { useState } from 'react';
import Image from 'next/image';
import { formatPriceInr, type Product } from './catalog';

type ProductDetailProps = {
  product: Product;
  categoryName: string;
  subcategoryName: string;
  onBack: () => void;
};

export default function ProductDetail({
  product,
  categoryName,
  subcategoryName,
  onBack,
}: ProductDetailProps) {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const selectedColor = product.colorVariants[selectedColorIndex];
  const colorNames = product.colorVariants.map((c) => c.name).join(', ');

  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="text-sm text-[#39795F] hover:underline mb-8 font-medium"
      >
        ← Back to {subcategoryName}
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <div>
          <div className="relative aspect-[4/5] bg-[#F4F1ED] overflow-hidden rounded-sm">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="mt-6">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3 text-center">
              Available colors
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {product.colorVariants.map((variant, index) => (
                <button
                  key={variant.name}
                  type="button"
                  onClick={() => setSelectedColorIndex(index)}
                  className="flex flex-col items-center gap-2 group"
                  aria-label={variant.name}
                  aria-pressed={selectedColorIndex === index}
                >
                  <span
                    className={`w-12 h-12 rounded-full ${variant.swatch} shadow-md border-2 transition-all ${
                      selectedColorIndex === index
                        ? 'border-[#39795F] ring-2 ring-[#39795F]/30 scale-110'
                        : 'border-white/80 group-hover:scale-105'
                    }`}
                  />
                  <span
                    className={`text-xs ${
                      selectedColorIndex === index
                        ? 'text-[#39795F] font-medium'
                        : 'text-gray-500'
                    }`}
                  >
                    {variant.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-xs uppercase tracking-[0.2em] text-[#39795F] font-semibold mb-2">
            {categoryName} / {subcategoryName}
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-[#1F2937] mb-2">{product.title}</h2>
          <p className="text-sm text-gray-500 mb-6">{product.designer}</p>
          <p className="text-2xl font-bold text-[#1F2937] mb-8">
            {formatPriceInr(product.priceInr)}
          </p>

          <div className="space-y-6 text-[#333] border-t border-stone-200/60 pt-8">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1F2937] mb-2">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1F2937] mb-2">
                Size
              </h3>
              <p className="text-gray-600">{product.size}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1F2937] mb-2">
                Colors available
              </h3>
              <p className="text-gray-600">{colorNames}</p>
              {selectedColor && (
                <p className="text-sm text-[#39795F] mt-2">
                  Selected: {selectedColor.name}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
