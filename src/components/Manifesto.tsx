'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const values = [
  {
    number: '01',
    title: 'ENGINEERED',
    description: 'Every stitch has purpose',
  },
  {
    number: '02',
    title: 'INVISIBLE',
    description: 'Gym performance, street aesthetic',
  },
  {
    number: '03',
    title: 'INTELLIGENT',
    description: 'Building toward AI integration',
  },
];

export default function Manifesto() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="bg-nero-void py-20 md:py-32" ref={ref}>
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
          className="font-[family-name:var(--font-space)] text-[32px] md:text-[56px] font-bold leading-[1.1] mb-16"
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
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-24"
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, i) => (
            <motion.div
              key={value.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 + i * 0.15 }}
              className="border border-nero-steel/30 p-8 group hover:border-nero-bronze/30 transition-all duration-500"
            >
              <span className="font-[family-name:var(--font-space)] text-[11px] tracking-[0.2em] text-nero-bronze">
                {value.number}
              </span>
              <h3 className="font-[family-name:var(--font-space)] text-[14px] font-semibold tracking-[0.2em] text-nero-bone mt-4 mb-3">
                {value.title}
              </h3>
              <p className="font-[family-name:var(--font-inter)] text-[14px] font-light text-nero-concrete group-hover:text-nero-smoke transition-colors duration-500">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
