import Image from 'next/image';

const galleryImages = [
  { src: '/hero/image1.jpg', alt: 'Premium interior space' },
  { src: '/products/image2.jpg', alt: 'Modern sliding wardrobe' },
  { src: '/products/image3.jpg', alt: 'Glass partition system' },
  { src: '/products/image4.jpg', alt: 'Walk-in closet profile' },
  { src: '/products/image7.jpg', alt: 'Fluted glass partition' },
  { src: '/products/image8.jpg', alt: 'Open wardrobe layout' },
  { src: '/products/image9.jpg', alt: 'Aluminium framed sliding doors' },
  { src: '/products/image13.jpg', alt: 'Space and structure panel' },
  { src: '/products/image2.jpg', alt: 'Wardrobe system finish' },
  { src: '/products/image3.jpg', alt: 'Partition profile detail' },
  { src: '/products/image7.jpg', alt: 'Glass and aluminium workspace' },
  { src: '/products/image8.jpg', alt: 'Contemporary storage layout' },
];

export default function GallerySection() {
  return (
    <section className="bg-[#FAF9F6] pt-28 pb-32 px-6 md:px-12 lg:px-20 text-[#333] overflow-visible">
      <div className="max-w-[1400px] mx-auto">
        <p className="text-xs uppercase tracking-[0.25em] text-[#39795F] font-semibold text-center mb-4">
          Gallery
        </p>

        <h1 className="text-4xl md:text-5xl font-serif text-center text-[#1F2937] tracking-tight mb-8">
          Gallery
        </h1>

        <blockquote className="max-w-2xl mx-auto text-center text-lg md:text-xl text-gray-600 italic leading-relaxed mb-14 px-4 border-l-0">
          &ldquo;A memorial to the craft of making — every profile, partition, and finish shaped
          with care, built to elevate the spaces we live and work in.&rdquo;
        </blockquote>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 pb-4">
          {galleryImages.map((item, index) => (
            <div
              key={`${item.src}-${index}`}
              className="group relative w-full aspect-[4/5] min-h-[220px] bg-[#EFECE8] overflow-hidden rounded-sm shadow-sm hover:shadow-lg transition-shadow"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              <p className="absolute bottom-0 left-0 right-0 px-3 py-2 text-xs text-white bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.alt}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
