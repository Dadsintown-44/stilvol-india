'use client';

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Settings, Droplet, Zap, ArrowRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay },
  }),
};

const fadeLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

function InfoCard({ icon, title, description, delay = 0 }: InfoCardProps) {
  return (
    <motion.div
      custom={delay}
      variants={fadeUp}
      className="group flex flex-col items-center text-center cursor-pointer p-8 rounded-none bg-white border border-[#39795F]/10 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-[#39795F]/30 transition-all duration-300"
    >
      <div className="w-16 h-16 rounded-full bg-[#39795F]/10 group-hover:bg-[#39795F] flex items-center justify-center mb-6 transition-colors duration-300 text-[#39795F] group-hover:text-white">
        {icon}
      </div>
      <h3 className="font-serif text-[#1F2937] text-xl mb-3">{title}</h3>
      <p className="text-[#6B7280] text-[15px] leading-relaxed">{description}</p>
    </motion.div>
  );
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const isHeroInView = useInView(heroRef, { once: true, margin: '-80px' });
  const isContentInView = useInView(contentRef, { once: true, margin: '-80px' });

  return (
    <section ref={sectionRef} className="bg-[#FAF9F6] overflow-hidden min-h-screen">
      
      {/* ─── Hero Banner ─── */}
      <div className="bg-gradient-to-br from-[#39795F] to-[#2d5f4a] pt-40 pb-32 px-4 relative overflow-hidden">
        {/* Decorative rings */}
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full border border-white/10 pointer-events-none" />
        <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full border border-white/10 pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full border border-white/5 pointer-events-none" />

        <div className="max-w-[1240px] mx-auto relative z-10 text-center" ref={heroRef}>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block text-white/70 uppercase tracking-[0.25em] text-xs font-semibold mb-6"
          >
            Our Story
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6 leading-tight"
          >
            Stilvoll India
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto italic font-light"
          >
            Modern and elegant. Designed for perfection.
          </motion.p>
        </div>
      </div>

      {/* ─── Value Cards (Overlapping) ─── */}
      <div className="max-w-[1240px] mx-auto px-6 md:px-12 -mt-16 relative z-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <InfoCard
            delay={0}
            icon={<Settings className="w-7 h-7" strokeWidth={1.5} />}
            title="Efficient Engineering"
            description="Our smart systems are built for smooth operation and easy installation, ensuring lasting reliability."
          />
          <InfoCard
            delay={0.15}
            icon={<Droplet className="w-7 h-7" strokeWidth={1.5} />}
            title="Aesthetic Mastery"
            description="We deliver refined, premium finishes that elevate the visual appeal of any interior space."
          />
          <InfoCard
            delay={0.3}
            icon={<Zap className="w-7 h-7" strokeWidth={1.5} />}
            title="Modern Solutions"
            description="Contemporary profiles and advanced hardware designed specifically for today's dynamic architectural needs."
          />
        </motion.div>
      </div>

      {/* ─── Main Content: Image + Text ─── */}
      <div className="max-w-[1240px] mx-auto px-6 md:px-12 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center" ref={contentRef}>
          
          {/* Left – Image */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="relative"
          >
            {/* Green accent blob */}
            <div className="absolute -top-8 -left-8 w-3/4 h-[90%] bg-[#39795F]/10 rounded-none -z-10" />
            <div className="absolute -bottom-8 -right-8 w-1/2 h-[50%] bg-[#2d5f4a]/5 rounded-none -z-10" />

            <div className="relative rounded-none overflow-hidden aspect-[4/5] shadow-2xl">
              <Image
                src="/contact/image14.jpg"
                alt="Premium Hardware by Stilvoll India"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-1000 hover:scale-105"
                priority
              />
            </div>
          </motion.div>

          {/* Right – Text Content */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="flex flex-col"
          >
            <motion.span
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate={isContentInView ? 'visible' : 'hidden'}
              className="inline-block text-[#39795F] uppercase tracking-[0.2em] text-xs font-semibold mb-4"
            >
              Who We Are
            </motion.span>
            <motion.h2
              custom={0.1}
              variants={fadeUp}
              initial="hidden"
              animate={isContentInView ? 'visible' : 'hidden'}
              className="text-3xl md:text-5xl font-serif text-[#1F2937] mb-8 leading-tight"
            >
              Crafting Premium <br />
              <span className="text-[#39795F]">Interior Solutions</span>
            </motion.h2>
            
            <div className="space-y-6">
              <motion.p
                custom={0.2}
                variants={fadeUp}
                initial="hidden"
                animate={isContentInView ? 'visible' : 'hidden'}
                className="text-[#6B7280] text-[16px] leading-relaxed"
              >
                Stilvoll India crafts premium interior solutions for homes, offices, and commercial
                spaces — where function meets refined design. We specialise in aluminium wardrobe
                systems, sliding partitions, and architectural profiles built to last.
              </motion.p>
              
              <motion.p
                custom={0.3}
                variants={fadeUp}
                initial="hidden"
                animate={isContentInView ? 'visible' : 'hidden'}
                className="text-[#6B7280] text-[16px] leading-relaxed"
              >
                Our wardrobe and partition profiles are engineered to be efficient and easy to install,
                while delivering a clean, aesthetic finish. From modular storage to glass and aluminium
                dividers, every product is chosen to give your space a modern, cohesive look.
              </motion.p>
              
              <motion.p
                custom={0.4}
                variants={fadeUp}
                initial="hidden"
                animate={isContentInView ? 'visible' : 'hidden'}
                className="text-[#6B7280] text-[16px] leading-relaxed mb-8"
              >
                Whether you are planning a new interior or upgrading an existing layout, we help you
                elevate spaces with hardware that performs quietly and looks exceptional.
              </motion.p>
            </div>

            <motion.div
              custom={0.5}
              variants={fadeUp}
              initial="hidden"
              animate={isContentInView ? 'visible' : 'hidden'}
              className="mt-8 pt-8 border-t border-stone-200"
            >
              <a 
                href="/products" 
                className="inline-flex items-center gap-3 text-[#39795F] font-semibold text-[15px] uppercase tracking-wider hover:gap-5 transition-all"
              >
                Explore Our Catalogue
                <ArrowRight className="w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
