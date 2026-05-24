"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Variants } from 'framer-motion';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact Us', href: '/contact' }
  ];

  const drawerVariants: Variants = {
    hidden: { x: '100%' },
    visible: {
      x: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1], staggerChildren: 0.1, delayChildren: 0.2 },
    },
    exit: { x: '100%', transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
  };

  const linkVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 py-4 px-4 sm:px-10 flex items-center justify-between transition-all shadow-sm border-b border-white/10 ${
          scrolled ? 'bg-[#39795F]' : 'transparent'
        }`}>
        {/* Logo Area */}
        <div className="flex items-center gap-3">
          <Link href="/">
            <Image 
              src="/logo3.png" 
              alt="Stilvoll India India" 
              width={290} 
              height={120} 
              className="h-12 sm:h-13 w-auto ml-0 md:ml-32 object-contain"
              priority
            />
          </Link>
        </div>

        {/* Navigation - Open Drawer Button */}
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="text-white hover:text-[#FF5A30] p-2 flex items-center gap-2 transition-colors mr-2 sm:mr-8"
            onClick={() => setMenuOpen(true)}
            aria-label="Toggle menu"
          >
            <span className="hidden sm:inline font-medium uppercase tracking-widest text-sm mr-2">Menu</span>
            <Menu className="w-7 h-7 sm:w-8 sm:h-8" />
          </motion.button>
        </div>
      </header>

      {/* Right Side Drawer Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Blurred Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-md z-[55]"
              onClick={() => setMenuOpen(false)}
            />

            <motion.div
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 h-full w-full sm:w-[450px] shadow-2xl bg-white z-[60] flex flex-col"
            >
              {/* Close Header */}
              <div className="flex items-center justify-between p-6 sm:px-10 sm:py-8 border-b border-slate-100">
                <span className="font-bold text-[#1F2937] text-2xl tracking-wider">Stilvoll India</span>
                <motion.button
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setMenuOpen(false)}
                  className="p-2 text-[#1F2937] hover:text-[#FF5A30] transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-8 h-8" />
                </motion.button>
              </div>

              {/* Menu Links */}
              <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 gap-5 sm:gap-4 overflow-y-auto">
                {navLinks.map((link) => (
                  <motion.div key={link.name} variants={linkVariants}>
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-4xl sm:text-5xl text-[#1F2937] font-normal tracking-wide hover:text-[#39795F] transition-colors relative group w-fit block py-1"
                    >
                      <span className="relative z-10">{link.name}</span>
                      <span className="absolute bottom-1 left-0 w-0 h-[2px] bg-[#39795F] transition-all duration-500 ease-out group-hover:w-full"></span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Footer area inside drawer */}
              <motion.div 
                variants={linkVariants}
                className="p-8 sm:p-12 bg-[#39795F] text-white"
              >
                <h4 className="text-white font-medium tracking-widest text-xs uppercase mb-4">Contact</h4>
                <p className="text-sm opacity-90 mb-2">+91 9930865508</p>
                <p className="text-sm opacity-90">connect@stilvollindia.com</p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
