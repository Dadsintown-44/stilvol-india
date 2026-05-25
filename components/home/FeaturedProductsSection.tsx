import Image from 'next/image';

interface ProductCardProps {
  image: string;
  title: string;
  designer: string;
  price: string;
  colors: string[];
}

function ProductCard({ image, title, designer, price, colors }: ProductCardProps) {
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

export default function FeaturedProductsSection() {
  return (
    <section className="bg-[#FAF9F6] py-24 px-6 md:px-12 lg:px-20 text-[#333]">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Heading Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-serif mb-12 tracking-tight">Preferrments</h2>
          
          {/* Three columns top text */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-sm">
            <div className="md:text-left text-center font-semibold uppercase tracking-[0.2em] text-xs">
              Curated Selections
            </div>
            <div className="text-center text-gray-500 italic max-w-md mx-auto leading-relaxed">
              We curated eighteen pieces covering the most demanding needs, and a large portion of original ideas. We remain available for your inquiries, whether they are technical or aesthetic.
            </div>
            <div className="md:text-right text-center font-semibold uppercase tracking-[0.2em] text-xs">
              Exploring Horizons
            </div>
          </div>
        </div>

        {/* First Row of Products */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-16 mb-24">
          <ProductCard 
            image="/products/image2.jpg"
            title="Modern Sliding Wardrobe"
            designer="Stilvoll Collection"
            price="₹99,600"
            colors={['bg-gray-400', 'bg-[#D2B48C]']}
          />
          <ProductCard 
            image="/products/image3.jpg"
            title="Glass Partition System"
            designer="Premium Series"
            price="₹37,350"
            colors={['bg-amber-600', 'bg-stone-300']}
          />
          <ProductCard 
            image="/products/image4.jpg"
            title="Walk-in Closet Profile"
            designer="Modular Designs"
            price="₹31,540"
            colors={['bg-[#E5E4E2]', 'bg-stone-800']}
          />
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end mb-24 border-t border-b border-stone-200/60 py-16">
          <div className="pb-4">
            <p className="text-2xl font-serif text-gray-700 mb-10 max-w-md leading-snug">
              Discover our premium wardrobes and sliding partition systems for modern spaces.
            </p>
            <div className="flex items-center gap-4 text-xl font-bold cursor-pointer group">
              Best Sellers 
              <span className="text-gray-400 border border-gray-300 rounded-full px-3 py-1 text-sm group-hover:bg-black group-hover:text-white transition-colors">
                ⊕ &rarr;
              </span>
            </div>
          </div>
          <div className="bg-[#EFECE8] relative h-full md:h-80 overflow-hidden flex flex-col items-center justify-start pt-10 rounded-sm">
            <h4 className="font-serif text-2xl z-10 text-gray-800">Space & Structure</h4>
            <p className="text-xs tracking-[0.2em] uppercase mb-4 z-10 text-gray-500 mt-2">Premium</p>
            <div className="absolute bottom-0 w-full h-full">
              <Image 
                src="/products/image13.jpg" 
                alt="Partition" 
                fill 
                className="object-cover object-top opacity-90 hover:scale-105 transition-transform duration-700" 
              />
            </div>
          </div>
        </div>

        {/* Second Row of Products */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-16">
          <ProductCard 
            image="/products/image7.jpg"
            title="Fluted Glass Partition"
            designer="Architectural Solutions"
            price="₹87,150"
            colors={['bg-gray-500']}
          />
          <ProductCard 
            image="/products/image8.jpg"
            title="Minimalist Open Wardrobe"
            designer="Contemporary Line"
            price="₹73,870"
            colors={['bg-stone-200']}
          />
          <ProductCard 
            image="/products/image9.jpg"
            title="Aluminum Framed Sliding Doors"
            designer="Stilvoll Design"
            price="₹91,300"
            colors={['bg-stone-600', 'bg-stone-400']}
          />
        </div>

      </div>
    </section>
  );
}
