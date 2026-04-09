'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const values = [
  {
    number: '01',
    title: 'ENGINEERED',
    description: 'Every stitch has purpose. Built with the precision of brutalist architecture.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'INVISIBLE',
    description: 'Gym performance, street aesthetic. Move between worlds without changing.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z" />
        <path d="M2 12h20" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'INTELLIGENT',
    description: 'Building toward AI integration. Your clothing becomes part of the system.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M9 9h6v6H9z" />
        <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
      </svg>
    ),
  },
];

export default function Manifesto() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="bg-transparent py-16 md:py-24" ref={ref}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-[family-name:var(--font-space)] text-[12px] tracking-[0.3em] uppercase text-nero-concrete mb-8"
        >
          THE MANIFESTO
        </motion.p>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-[family-name:var(--font-space)] text-[32px] md:text-[56px] font-bold leading-[1.1] mb-14"
        >
          <span className="text-nero-bone">Born from iron.</span>
          <br />
          <span className="text-nero-concrete">Designed for everywhere.</span>
        </motion.h2>

        {/* Body - 2 column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-20"
        >
          <div className="space-y-6">
            <p className="font-[family-name:var(--font-inter)] text-[16px] font-light text-nero-smoke leading-relaxed">
              Performance wear has stagnated. We are sold neon logos, synthetic fabrics that degrade, and designs that scream for attention in spaces meant for focus.
            </p>
            <p className="font-[family-name:var(--font-inter)] text-[16px] font-light text-nero-smoke leading-relaxed">
              The modern athlete requires more than moisture-wicking properties. They require garments engineered with the precision of brutalist architecture—built to withstand maximum load, uncompromising in form, and entirely invisible to distraction.
            </p>
          </div>
          <div className="space-y-6">
            <p className="font-[family-name:var(--font-inter)] text-[16px] font-light text-nero-smoke leading-relaxed">
              NERO is the synthesis of unyielding strength and refined design. We create industrial luxury wear for individuals who train with extreme intent, moving seamlessly between the iron and the street.
            </p>
            <p className="font-[family-name:var(--font-inter)] text-[16px] font-light text-nero-smoke leading-relaxed">
              The ultimate evolution of physical performance requires an intelligent ecosystem. We are building the clothing. We are building the app. We are building the framework for the first truly integrated AI training environment.
            </p>
          </div>
        </motion.div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((value, i) => (
            <motion.div
              key={value.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 + i * 0.15 }}
              className="relative border border-nero-steel/20 p-8 group hover:border-nero-bronze/40 hover:bg-nero-charcoal/30 transition-all duration-700 overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(184,151,106,0.04),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <div className="relative z-10">
                {/* Icon + number row */}
                <div className="flex items-center justify-between mb-6">
                  <div className="text-nero-bronze/60 group-hover:text-nero-bronze transition-colors duration-500">
                    {value.icon}
                  </div>
                  <span className="font-[family-name:var(--font-space)] text-[11px] tracking-[0.2em] text-nero-bronze">
                    {value.number}
                  </span>
                </div>
                <h3 className="font-[family-name:var(--font-space)] text-[14px] font-semibold tracking-[0.2em] text-nero-bone mb-3">
                  {value.title}
                </h3>
                <p className="font-[family-name:var(--font-inter)] text-[14px] font-light text-nero-concrete group-hover:text-nero-smoke transition-colors duration-500 leading-relaxed">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
