'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BOOT_SCRIPT = [
  '>> NERO_OS_v1.0.4_INITIALIZING...',
  '>> CORE_ATMOSPHERE: ACTIVE',
  '>> LATTICE_GRID: STABLE',
  '>> STRATEGIST_AI: SYNCED',
  '>> HOLOGRAPHY: CALIBRATED',
  '>> ACCESS_GRANTED'
];

export default function SystemLoader({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress bar simulation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 20);

    // Boot script simulation
    let currentLine = 0;
    const lineInterval = setInterval(() => {
      if (currentLine < BOOT_SCRIPT.length) {
        setLines(prev => [...prev, BOOT_SCRIPT[currentLine]]);
        currentLine++;
      } else {
        clearInterval(lineInterval);
        setTimeout(onComplete, 800); // Final delay before entry
      }
    }, 250);

    return () => {
      clearInterval(interval);
      clearInterval(lineInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[200] bg-nero-void flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden">
      <div className="w-full max-w-[600px] space-y-12">
        {/* Terminal Text */}
        <div className="space-y-3 min-h-[160px]">
          {lines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="terminal-text text-[11px] md:text-[13px] tracking-[0.2em]"
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Progress System */}
        <div className="space-y-3">
          <div className="flex justify-between items-end text-nero-bronze">
              <span className="text-[10px] tracking-[0.4em] font-mono uppercase">System_Load</span>
              <span className="text-[14px] font-bold font-mono">{progress}%</span>
          </div>
          <div className="h-1 w-full bg-nero-steel/20 relative">
            <motion.div 
              className="absolute left-0 top-0 h-full bg-nero-bronze"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
        </div>

        {/* Footer info */}
        <div className="flex justify-between opacity-30">
            <span className="text-[8px] font-mono tracking-widest text-nero-bronze">STABLE_BUILD_HASH: 0x4F92B</span>
            <span className="text-[8px] font-mono tracking-widest text-nero-bronze uppercase">Phase_01_Deployment</span>
        </div>
      </div>
    </div>
  );
}
