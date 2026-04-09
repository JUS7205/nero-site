'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [skipLoader, setSkipLoader] = useState(false);

  useEffect(() => {
    // Skip loader on repeat visits within the same session
    if (typeof window !== 'undefined') {
      const hasVisited = sessionStorage.getItem('nero_visited');
      if (hasVisited) {
        setSkipLoader(true);
        setIsLoaded(true);
      }
    }
  }, []);

  const handleComplete = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('nero_visited', 'true');
    }
    setIsLoaded(true);
  };

  // Lazy import to avoid SSR issues with the loader
  const SystemLoader = skipLoader ? null : require('./SystemLoader').default;

  return (
    <>
      {!skipLoader && (
        <AnimatePresence mode="wait">
          {!isLoaded && SystemLoader && (
            <SystemLoader key="loader" onComplete={handleComplete} />
          )}
        </AnimatePresence>
      )}

      <div className={isLoaded ? (skipLoader ? '' : 'flicker-reveal') : 'invisible h-0 overflow-hidden'}>
        {children}
      </div>
    </>
  );
}
