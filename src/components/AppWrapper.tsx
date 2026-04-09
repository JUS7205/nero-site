'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import SystemLoader from './SystemLoader';

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <AnimatePresence mode="wait">
        {!isLoaded && (
          <SystemLoader key="loader" onComplete={() => setIsLoaded(true)} />
        )}
      </AnimatePresence>

      <div className={isLoaded ? 'flicker-reveal' : 'invisible h-0 overflow-hidden'}>
        {children}
      </div>
    </>
  );
}
