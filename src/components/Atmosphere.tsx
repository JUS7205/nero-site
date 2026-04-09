'use client';

import { motion } from 'framer-motion';

export default function Atmosphere() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[0] bg-nero-void">
      {/* Dynamic Noise Overlay (Subtle Grit) */}
      <div className="noise-overlay" />
      
      {/* Liquid Wave Engine */}
      <div className="liquid-wave">
        <svg className="w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
          <filter id="wave-noise">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.005 0.01" 
              numOctaves="2" 
              seed="2" 
              result="noise"
            >
              <animate 
                attributeName="baseFrequency" 
                dur="60s" 
                values="0.005 0.01; 0.007 0.015; 0.005 0.01" 
                repeatCount="indefinite" 
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="50" />
          </filter>
          
          <motion.rect 
            width="100%" 
            height="100%" 
            filter="url(#wave-noise)" 
            fill="transparent"
            animate={{
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </svg>
      </div>

      {/* Primary Abstract Gradients (The "Waves") */}
      <motion.div 
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-[-20%] right-[-10%] w-[120%] h-[120%] bg-radial from-nero-bronze/10 via-transparent to-transparent blur-[150px] rounded-full" 
      />

      <motion.div 
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
          rotate: [0, -5, 0]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute bottom-[-20%] left-[-10%] w-[100%] h-[100%] bg-radial from-nero-bronze/5 via-transparent to-transparent blur-[150px] rounded-full" 
      />

      {/* Global Vignette */}
      <div className="vignette" />
    </div>
  );
}
