'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const timeline = [
  {
    phase: 'PHASE 01',
    title: 'The Clothing',
    status: 'ACTIVE',
    description:
      'Premium performance wear with industrial luxury aesthetic. Every piece engineered for the gym but designed for the world.',
  },
  {
    phase: 'PHASE 02',
    title: 'The Intelligence',
    status: 'IN DEVELOPMENT',
    description:
      'Smart textiles with embedded sensors. An AI app that generates your training, tracks your progress, and learns your body.',
  },
  {
    phase: 'PHASE 03',
    title: 'The Gym',
    status: 'PLANNED',
    description:
      'A physical space where computer vision, smart equipment, and AI coaching create personalized training that has never existed before.',
  },
  {
    phase: 'PHASE 04',
    title: 'The Network',
    status: 'VISION',
    description:
      'Multiple locations worldwide. A global community of athletes training smarter. The new standard in fitness.',
  },
];

const statusColors: Record<string, string> = {
  'ACTIVE': 'bg-nero-bronze text-nero-void',
  'IN DEVELOPMENT': 'bg-nero-steel text-nero-bone',
  'PLANNED': 'bg-transparent border border-nero-steel text-nero-concrete',
  'VISION': 'bg-transparent border border-nero-steel/50 text-nero-concrete/60',
};

export default function Vision() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="vision" className="relative bg-nero-void py-16 md:py-24 overflow-hidden" ref={ref}>
      {/* Glow on right */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(184,151,106,0.06)_0%,transparent_70%)] blur-[200px] pointer-events-none" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-[family-name:var(--font-space)] text-[12px] tracking-[0.3em] uppercase text-nero-bronze mb-4"
        >
          THE VISION
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-[family-name:var(--font-space)] text-[32px] md:text-[48px] font-bold text-nero-bone leading-tight mb-6"
        >
          Beyond clothing.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-[family-name:var(--font-inter)] text-[16px] md:text-[18px] font-light text-nero-smoke max-w-2xl mb-16"
        >
          NERO isn&apos;t just a clothing brand. It&apos;s the foundation of an ecosystem where your clothing, your app, and your gym work as one intelligence—knowing your body better than any personal trainer ever could.
        </motion.p>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical center line - desktop only */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-nero-steel/30 -translate-x-1/2" />
          
          {/* Mobile left line */}
          <div className="md:hidden absolute left-4 top-0 bottom-0 w-[1px] bg-nero-steel/30" />

          <div className="space-y-12 md:space-y-20">
            {timeline.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={item.phase}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 + i * 0.15 }}
                  className="relative"
                >
                  {/* Dot - desktop */}
                  <div className="hidden md:block absolute left-1/2 top-2 w-3 h-3 -translate-x-1/2 rounded-full border-2 border-nero-bronze bg-nero-void z-10" />
                  
                  {/* Dot - mobile */}
                  <div className="md:hidden absolute left-4 top-2 w-3 h-3 -translate-x-1/2 rounded-full border-2 border-nero-bronze bg-nero-void z-10" />

                  {/* Content */}
                  <div
                    className={`pl-10 md:pl-0 md:w-[calc(50%-40px)] ${
                      isLeft ? 'md:mr-auto md:text-right md:pr-4' : 'md:ml-auto md:text-left md:pl-4'
                    }`}
                  >
                    <div className={`flex items-center gap-3 mb-3 ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
                      <span className={`font-[family-name:var(--font-space)] text-[10px] tracking-[0.25em] text-nero-bronze ${isLeft ? 'md:order-2' : ''}`}>
                        {item.phase}
                      </span>
                      <span className={`font-[family-name:var(--font-space)] text-[8px] tracking-[0.2em] px-2 py-0.5 ${statusColors[item.status]} ${isLeft ? 'md:order-1' : ''}`}>
                        {item.status}
                      </span>
                    </div>
                    <h3 className="font-[family-name:var(--font-space)] text-[18px] font-semibold tracking-[0.05em] text-nero-bone mb-3">
                      {item.title}
                    </h3>
                    <p className="font-[family-name:var(--font-inter)] text-[14px] font-light text-nero-smoke leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
