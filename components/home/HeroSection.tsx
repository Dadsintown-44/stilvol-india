"use client";

import { useState, useEffect } from 'react';
import Reveal from '../common/Reveal';

const words = ["Architectural", "Innovative", "Elegant", "Sustainable"];

export default function HeroSection() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    let typingSpeed = isDeleting ? 50 : 150;

    if (!isDeleting && displayedText === currentWord) {
      typingSpeed = 2000;
      setTimeout(() => setIsDeleting(true), typingSpeed);
      return;
    } else if (isDeleting && displayedText === "") {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayedText((prev) =>
        isDeleting
          ? prev.slice(0, -1)
          : currentWord.slice(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentWordIndex]);

  return (
    <section 
      className="relative min-h-[100vh] flex items-center bg-fixed pt-24 pb-16 bg-cover bg-center"
      style={{ backgroundImage: "url('/hero/image1.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="max-w-7xl mx-auto px-6 md:px-10 w-full relative z-10 grid grid-cols-1 md:grid-cols-2">
        <Reveal direction="up" delay={0.2}>
          <div className="flex flex-col justify-center items-start pt-10">
            <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-tight  tracking-wide min-h-[1em]">
              Elevating Spaces
              <br />
              With Premium
              <br />
              <span className="px-2 py-1 inline-block mt-2 mb-2">
                {displayedText}
                <span className="animate-pulse">|</span>
              </span>
              <br />
              Solutions
            </h1>
            <p className="text-slate-200 mt-6 text-lg tracking-wide">
              The Future of Hardware.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              <button className="bg-[#39795F] hover:bg-[#39795F] text-white px-8 py-3 text-sm font-medium transition-colors flex items-center gap-2">
                Catalogue <span className="text-lg">↓</span>
              </button>
              <button className="border border-white text-white hover:bg-white hover:text-black px-8 py-3 text-sm font-medium transition-colors border-opacity-70 bg-black/20 backdrop-blur-sm">
                Get In Touch
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
