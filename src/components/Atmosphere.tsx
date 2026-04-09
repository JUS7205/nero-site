'use client';

import { motion } from 'framer-motion';

export default function Atmosphere() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[0]">
      {/* Dynamic Noise Overlay */}
      <div className="noise-overlay" />
      
      {/* Technical Lattice Grid */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 lattice-grid"
      />

      {/* Vignette for depth */}
      <div className="vignette" />

      {/* Global Accent Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-nero-bronze/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-nero-bronze/3 blur-[120px] rounded-full" />
    </div>
  );
}
