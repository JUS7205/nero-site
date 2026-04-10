'use client';

import { useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface TechnicalSpec {
  label: string;
  value: string;
}

interface ProductDossierProps {
  product: {
    name: string;
    category: string;
    description: string;
    price: string;
    image: string;
    specs: TechnicalSpec[];
    engineering: string[];
  } | null;
  isOpen: boolean;
  onClose: () => void;
  onPreOrder: (id: string) => void;
}

export default function ProductDossier({ product, isOpen, onClose, onPreOrder }: ProductDossierProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open and force scroll to top
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Force modal content to scroll to top explicitly when opened
      if (panelRef.current) {
        panelRef.current.scrollTop = 0;
      }
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleScrollToWaitlist = useCallback(() => {
    onClose();
    setTimeout(() => {
      const target = document.querySelector('#waitlist');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  }, [onClose]);

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex justify-end" role="dialog" aria-modal="true" aria-label={`Product details: ${product.name}`}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-nero-void/80 backdrop-blur-md cursor-pointer"
          />

          {/* Dossier Panel */}
          <motion.div
            ref={panelRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-2xl h-full technical-panel flex flex-col p-8 md:p-12 overflow-y-auto"
          >
            {/* Scan Line Animation */}
            <div className="scan-line" />

            {/* Header */}
            <div className="flex justify-between items-start mb-10 border-b border-nero-steel/30 pb-6">
              <div className="space-y-2">
                <p className="font-[family-name:var(--font-space)] text-[11px] tracking-[0.4em] text-nero-bronze uppercase">
                  Technical Dossier
                </p>
                <h2 className="font-[family-name:var(--font-space)] text-[28px] md:text-[36px] font-bold text-nero-bone leading-none uppercase">
                  {product.name}
                </h2>
                <p className="font-[family-name:var(--font-space)] text-[10px] tracking-[0.2em] text-nero-concrete uppercase">
                  {product.category} — {product.price}
                </p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 border border-nero-steel hover:border-nero-bronze text-nero-concrete hover:text-nero-bronze transition-all cursor-pointer"
                aria-label="Close product details"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Product Visual */}
              <div className="space-y-6">
                <div className="relative aspect-[3/4] bg-nero-charcoal border border-nero-steel/50 overflow-hidden group">
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    fill 
                    className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                </div>
                
                <div className="p-6 border border-nero-steel/30 bg-nero-void/50 space-y-3">
                  <p className="font-[family-name:var(--font-space)] text-[10px] tracking-[0.2em] text-nero-bronze uppercase font-bold">Design Rationale</p>
                  <p className="text-[14px] leading-relaxed text-nero-smoke font-light">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="space-y-8">
                <section>
                  <h3 className="font-[family-name:var(--font-space)] text-[12px] tracking-[0.3em] text-nero-bone uppercase mb-5 border-l-2 border-nero-bronze pl-4">
                    Material Science
                  </h3>
                  <div className="space-y-3">
                    {product.specs.map((spec) => (
                      <div key={spec.label} className="flex justify-between items-end gap-3">
                        <span className="text-[11px] text-nero-concrete mono-spec uppercase whitespace-nowrap">{spec.label}</span>
                        <div className="flex-1 border-b border-dashed border-nero-steel/50 mb-1" />
                        <span className="text-[11px] text-nero-bone font-bold mono-spec whitespace-nowrap">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="font-[family-name:var(--font-space)] text-[12px] tracking-[0.3em] text-nero-bone uppercase mb-5 border-l-2 border-nero-bronze pl-4">
                    Engineering
                  </h3>
                  <ul className="space-y-3">
                    {product.engineering.map((eng, idx) => (
                      <li key={idx} className="flex gap-3 items-start">
                        <span className="text-nero-bronze text-[10px] mt-1 font-mono">0{idx + 1}</span>
                        <p className="text-[13px] text-nero-smoke leading-relaxed">{eng}</p>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Actions */}
                <div className="pt-6 border-t border-nero-steel/30 flex flex-col gap-3">
                  <button 
                    onClick={handleScrollToWaitlist}
                    className="w-full bg-nero-bone text-nero-void font-[family-name:var(--font-space)] text-[12px] font-bold tracking-[0.2em] py-4 uppercase hover:bg-nero-bronze hover:text-white transition-colors cursor-pointer"
                  >
                    JOIN WAITLIST
                  </button>
                  <button 
                    onClick={onClose}
                    className="w-full border border-nero-steel text-nero-concrete font-[family-name:var(--font-space)] text-[11px] tracking-[0.1em] py-3 uppercase hover:border-nero-bronze hover:text-nero-bone transition-colors cursor-pointer"
                  >
                    CLOSE
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
