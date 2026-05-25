"use client";

import { useState } from 'react';
import { type Product } from './catalog';

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
  const detailImage = selectedColor?.image || product.image;
  const colorNames = product.colorVariants.map((c) => c.name).join(', ');

  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="text-sm text-[#39795F] hover:underline mb-8 font-medium"
      >
        Back to {subcategoryName}
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <div className="flex justify-center lg:justify-start">
          <div className="relative aspect-[4/5] w-full max-w-md bg-[#F4F1ED] overflow-hidden rounded-sm">
            {detailImage ? (
              <img src={detailImage} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="h-full flex items-center justify-center text-sm text-gray-500">
                No image
              </div>
            )}
            
            {product.colorVariants.length > 0 && (
              <div className="absolute top-4 right-4 flex flex-col gap-3 z-10">
                {product.colorVariants.map((variant, index) => (
                  <button
                    key={variant.id}
                    type="button"
                    onClick={() => setSelectedColorIndex(index)}
                    className="relative group"
                    aria-label={variant.name}
                    aria-pressed={selectedColorIndex === index}
                    title={variant.name}
                  >
                    <span
                      className={`block w-10 h-10 rounded-full border-2 shadow-md transition-all ${selectedColorIndex === index ? 'border-white ring-2 ring-[#39795F] scale-110' : 'border-white/80 hover:scale-105'}`}
                      style={{ 
                        backgroundImage: variant.image ? `url(${variant.image})` : undefined, 
                        backgroundColor: !variant.image ? '#e5e5e5' : undefined,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-xs uppercase tracking-[0.2em] text-[#39795F] font-semibold mb-2">
            {categoryName} / {subcategoryName}
          </p>
          <h2 className="text-3xl md:text-4xl font-serif text-[#1F2937] mb-6">{product.name}</h2>

          <div className="space-y-6 text-[#333] border-t border-stone-200/60 pt-8">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1F2937] mb-2">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>
            {product.colorVariants.length > 0 ? (
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1F2937] mb-2">
                  Colors available
                </h3>
                <p className="text-gray-600">{colorNames}</p>
                {selectedColor ? (
                  <p className="text-sm text-[#39795F] mt-2 font-medium">Selected: {selectedColor.name}</p>
                ) : null}
              </div>
            ) : null}

            <div className="pt-4 border-t border-stone-200/60 mt-8">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`Hello, I am interested in the ${product.name} from the ${subcategoryName} collection. Can you provide more details?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-3 rounded-md font-medium transition-colors w-full sm:w-auto"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                Send to Client on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
