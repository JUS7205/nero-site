'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Parallax: content moves up slower than scroll
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const handleScrollTo = (id: string) => {
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(184,151,106,0.05)_0%,transparent_70%)] blur-[200px] pointer-events-none" />

      {/* Parallax content wrapper */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl"
      >
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-[family-name:var(--font-space)] text-[10px] tracking-[0.4em] uppercase text-nero-concrete mb-8"
        >
          Industrial Luxury Performance
        </motion.p>

        {/* Logo */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-[family-name:var(--font-space)] text-[48px] md:text-[96px] font-bold tracking-[0.3em] text-nero-bone leading-none"
        >
          NERO
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-24 h-[1px] bg-nero-bronze my-10"
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-[family-name:var(--font-inter)] text-[16px] md:text-[18px] font-light text-nero-smoke leading-relaxed max-w-xl"
        >
          Performance clothing for those who refuse to look like they live in the gym. Engineered for the iron. Designed for everywhere.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-col sm:flex-row gap-4 mt-12"
        >
          <button
            onClick={() => handleScrollTo('#waitlist')}
            className="font-[family-name:var(--font-space)] text-[11px] font-medium tracking-[0.15em] px-8 py-3.5 bg-nero-bone text-nero-void hover:bg-nero-bronze hover:-translate-y-0.5 transition-all duration-500 cursor-pointer"
            style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.4, 0.25, 1)' }}
          >
            JOIN THE WAITLIST
          </button>
          <button
            onClick={() => handleScrollTo('#about')}
            className="font-[family-name:var(--font-space)] text-[11px] font-medium tracking-[0.15em] px-8 py-3.5 border border-nero-steel text-nero-bone hover:border-nero-bone hover:-translate-y-0.5 transition-all duration-500 bg-transparent cursor-pointer"
            style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.4, 0.25, 1)' }}
          >
            OUR STORY
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 scroll-indicator"
      >
        <span className="font-[family-name:var(--font-space)] text-[9px] tracking-[0.3em] text-nero-concrete uppercase">
          Scroll
        </span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-nero-concrete to-transparent" />
      </motion.div>
    </section>
  );
}
