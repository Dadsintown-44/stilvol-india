"use client";

import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const [isPresent, setIsPresent] = useState(false);

  useEffect(() => {
    setIsPresent(true);
  }, []);

  const flutedStyle = {
    backgroundImage: `
      repeating-linear-gradient(
        to right,
        rgba(0,0,0,0.02),
        rgba(0,0,0,0.02) 2px,
        rgba(255,255,255,0.05) 2px,
        rgba(255,255,255,0.05) 4px
      )
    `,
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
  };

  return (
    <>
      {/* Left Partition */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "-100%" }}
        transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
        className="fixed top-0 left-0 w-1/2 h-[100dvh] z-[9999] bg-[#FAF9F6]/20 shadow-[10px_0_30px_rgba(0,0,0,0.05)] flex items-center justify-end pointer-events-none"
        style={flutedStyle}
      >
        <div className="w-3 h-32 bg-gradient-to-b from-[#555] via-[#888] to-[#555] rounded-full mr-6 shadow-md border border-white/10 opacity-80" />
      </motion.div>

      {/* Right Partition */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "100%" }}
        transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
        className="fixed top-0 right-0 w-1/2 h-[100dvh] z-[9999] bg-[#FAF9F6]/20 shadow-[-10px_0_30px_rgba(0,0,0,0.05)] flex items-center justify-start pointer-events-none"
        style={flutedStyle}
      >
        <div className="w-3 h-32 bg-gradient-to-b from-[#555] via-[#888] to-[#555] rounded-full ml-6 shadow-md border border-white/10 opacity-80" />
      </motion.div>

      {/* Page Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
      >
        {children}
      </motion.div>
    </>
  );
}
