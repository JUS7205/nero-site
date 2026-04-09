'use client';

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
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex justify-end">
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
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-2xl h-full technical-panel flex flex-col p-8 md:p-12 overflow-y-auto"
          >
            {/* Scan Line Animation */}
            <div className="scan-line" />

            {/* Header */}
            <div className="flex justify-between items-start mb-12 border-b border-nero-steel/30 pb-8">
              <div className="space-y-2">
                <p className="font-[family-name:var(--font-space)] text-[11px] tracking-[0.4em] text-nero-bronze uppercase">
                  Technical_Dossier_v01
                </p>
                <h2 className="font-[family-name:var(--font-space)] text-[32px] md:text-[40px] font-bold text-nero-bone leading-none uppercase">
                  {product.name}
                </h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 border border-nero-steel hover:border-nero-bronze text-nero-concrete hover:text-nero-bronze transition-all"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Product Visual */}
              <div className="space-y-6">
                <div className="relative aspect-[3/4] bg-nero-charcoal border border-nero-steel/50 overflow-hidden group">
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    fill 
                    className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                  {/* Visual ID Tag */}
                  <div className="absolute bottom-4 left-4 bg-nero-void/90 px-3 py-1 border border-nero-bronze/30">
                    <p className="text-[9px] font-mono text-nero-bronze tracking-widest uppercase">ID: {product.name.replace(/\s+/g, '_')}</p>
                  </div>
                </div>
                
                <div className="p-6 border border-nero-steel/30 bg-nero-void/50 space-y-4">
                  <p className="font-[family-name:var(--font-space)] text-[10px] tracking-[0.2em] text-nero-bronze uppercase font-bold">Design_Rationale</p>
                  <p className="text-[14px] leading-relaxed text-nero-smoke font-light italic">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="space-y-10">
                <section>
                  <h3 className="font-[family-name:var(--font-space)] text-[12px] tracking-[0.3em] text-nero-bone uppercase mb-6 border-l-2 border-nero-bronze pl-4">
                    Material_Science
                  </h3>
                  <div className="space-y-4">
                    {product.specs.map((spec) => (
                      <div key={spec.label} className="flex justify-between items-end gap-4">
                        <span className="text-[11px] text-nero-concrete mono-spec uppercase">{spec.label}</span>
                        <div className="flex-1 border-b border-dashed border-nero-steel/50 mb-1" />
                        <span className="text-[11px] text-nero-bone font-bold mono-spec">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="font-[family-name:var(--font-space)] text-[12px] tracking-[0.3em] text-nero-bone uppercase mb-6 border-l-2 border-nero-bronze pl-4">
                    Engineering_Specs
                  </h3>
                  <ul className="space-y-3">
                    {product.engineering.map((eng, idx) => (
                      <li key={idx} className="flex gap-4 items-start">
                        <span className="text-nero-bronze text-[10px] mt-1.5 font-mono">0{idx + 1}</span>
                        <p className="text-[13px] text-nero-smoke leading-relaxed uppercase tracking-wider">{eng}</p>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Actions */}
                <div className="pt-8 border-t border-nero-steel/30 flex flex-col gap-4">
                  <button 
                    onClick={() => onPreOrder(product.name)}
                    className="w-full bg-nero-bronze text-nero-void font-[family-name:var(--font-space)] text-[12px] font-bold tracking-[0.2em] py-4 uppercase hover:bg-white transition-colors"
                  >
                    DEPLOY PRE-ORDER
                  </button>
                  <button 
                    onClick={onClose}
                    className="w-full border border-nero-steel text-nero-bone font-[family-name:var(--font-space)] text-[11px] tracking-[0.1em] py-3 uppercase hover:border-nero-bronze transition-colors flex items-center justify-center gap-2"
                  >
                    <span>PROTOCOL_STANDBY</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Footer Metering */}
            <div className="mt-auto pt-16 flex justify-between items-center opacity-30 pointer-events-none">
                <div className="flex gap-1">
                   {[...Array(10)].map((_, i) => <div key={i} className="w-1.5 h-3 bg-nero-bronze" />)}
                </div>
                <p className="text-[8px] font-mono tracking-widest uppercase">© NERO ARCHIVES 2026 // ALL_RIGHTS_RESERVED</p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
