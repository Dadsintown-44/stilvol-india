export default function AboutSection() {
  return (
    <section className="bg-[#FAF9F6] pt-28 pb-24 px-6 md:px-12 lg:px-20 text-[#333] min-h-screen">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs uppercase tracking-[0.25em] text-[#39795F] font-semibold text-center mb-4">
          About Us
        </p>

        <h1 className="text-4xl md:text-5xl font-serif text-center text-[#1F2937] tracking-tight mb-3">
          Stilvoll India
        </h1>

        <p className="text-center text-lg md:text-xl text-gray-600 italic mb-12">
          Modern and elegant. Designed for perfection.
        </p>

        <div className="space-y-6 text-gray-600 leading-relaxed text-[15px] md:text-base border-t border-stone-200/60 pt-10">
          <p>
            Stilvoll India crafts premium interior solutions for homes, offices, and commercial
            spaces — where function meets refined design. We specialise in aluminium wardrobe
            systems, sliding partitions, and architectural profiles built to last.
          </p>
          <p>
            Our wardrobe and partition profiles are engineered to be efficient and easy to install,
            while delivering a clean, aesthetic finish. From modular storage to glass and aluminium
            dividers, every product is chosen to give your space a modern, cohesive look.
          </p>
          <p>
            Whether you are planning a new interior or upgrading an existing layout, we help you
            elevate spaces with hardware that performs quietly and looks exceptional.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <li className="bg-white border border-stone-200/60 rounded-sm px-4 py-5">
            <p className="text-sm font-semibold text-[#39795F] uppercase tracking-wider mb-1">
              Efficient
            </p>
            <p className="text-xs text-gray-500">Smart systems, smooth operation</p>
          </li>
          <li className="bg-white border border-stone-200/60 rounded-sm px-4 py-5">
            <p className="text-sm font-semibold text-[#39795F] uppercase tracking-wider mb-1">
              Aesthetic
            </p>
            <p className="text-xs text-gray-500">Refined finishes for every room</p>
          </li>
          <li className="bg-white border border-stone-200/60 rounded-sm px-4 py-5">
            <p className="text-sm font-semibold text-[#39795F] uppercase tracking-wider mb-1">
              Modern
            </p>
            <p className="text-xs text-gray-500">Contemporary profiles &amp; hardware</p>
          </li>
        </ul>
      </div>
    </section>
  );
}
