'use client';

import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(184,151,106,0.05)_0%,transparent_70%)] blur-[200px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center"
      >
        <p className="font-[family-name:var(--font-space)] text-[11px] tracking-[0.4em] text-nero-bronze uppercase mb-6">
          Signal Lost
        </p>

        <h1 className="font-[family-name:var(--font-space)] text-[80px] md:text-[120px] font-bold text-nero-bone leading-none tracking-[0.1em] mb-6">
          404
        </h1>

        <p className="font-[family-name:var(--font-inter)] text-[16px] font-light text-nero-smoke mb-10 max-w-md mx-auto">
          This page doesn&apos;t exist. The coordinates you entered lead nowhere.
        </p>

        <a 
          href="/"
          className="inline-block font-[family-name:var(--font-space)] text-[11px] font-medium tracking-[0.15em] px-8 py-3.5 bg-nero-bone text-nero-void hover:bg-nero-bronze hover:-translate-y-0.5 transition-all duration-500"
          style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.4, 0.25, 1)' }}
        >
          RETURN TO BASE
        </a>
      </motion.div>
    </div>
  );
}
