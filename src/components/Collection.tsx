'use client';

import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import FitIntelligence from './FitIntelligence';
import dynamic from 'next/dynamic';
import ProductDossier from './ProductDossier';

// Dynamic import for Three.js component to save on initial bundle size
const ProductScene = dynamic(() => import('./ProductScene'), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-nero-void animate-pulse" />
});

const products = [
  {
    id: 'price_tee',
    category: 'OVERSIZED / 280GSM',
    name: 'THE FOUNDATION TEE',
    description: 'A structural cornerstone of the Phase 01 wardrobe. Engineered with a brutalist box-cut and a reinforced neckline to ensure the garment holds its architecture through high-load activity.',
    price: 'R799',
    image: '/products/tee.png',
    specs: [
      { label: 'WEIGHT', value: '280GSM' },
      { label: 'COMPOSITION', value: '96% SUPRA-COTTON / 4% ELASTANE' },
      { label: 'KNIT', value: 'SINGLE JERSEY / INTERLOCK' },
      { label: 'ORIGIN', value: 'CAPE TOWN / ZA' }
    ],
    engineering: [
      'High-Density Tonal Micro-Embroidery',
      'Reinforced Ribbed Collar Core',
      'Dropped Shoulder for Overhead Mobility',
      'Internal Taped Shoulder Seams'
    ]
  },
  {
    id: 'price_hoodie',
    category: 'OVERSIZED / 400GSM',
    name: 'THE COMPOUND HOODIE',
    description: 'Engineered for thermal regulation and external armor. The Compound Hoodie uses heavy Core-Spun French Terry to create a protective silhouette that doesn\'t sacrifice athletic range.',
    price: 'R1,899',
    image: '/products/hoodie.png',
    specs: [
      { label: 'WEIGHT', value: '400GSM' },
      { label: 'COMPOSITION', value: '100% CORE-SPUN COTTON' },
      { label: 'KNIT', value: 'BRUSHED FRENCH TERRY' },
      { label: 'ORIGIN', value: 'JOHANNESBURG / ZA' }
    ],
    engineering: [
      'Double-Layer Sculptural Hood',
      'Industrial Cross-Locked Stitching',
      'Ribbed Side Panels for Expansion',
      'Concealed Internal Tech-Pockets'
    ]
  },
  {
    id: 'price_short',
    category: 'TECHNICAL / 7" INSEAM',
    name: 'THE SESSION SHORT',
    description: 'Superior mobility meets industrial durability. The Session Short is built from a high-performance 4-way stretch microfiber designed to move seamlessly from explosive sprints to maximal loads.',
    price: 'R1,199',
    image: '/products/short.png',
    specs: [
      { label: 'STRETCH', value: '360° FLEX-WEAVE' },
      { label: 'COMPOSITION', value: '92% POLY-MICRO / 8% SPANDEX' },
      { label: 'FINISH', value: 'DWR / ANTI-MICROBIAL' },
      { label: 'ORIGIN', value: 'CAPE TOWN / ZA' }
    ],
    engineering: [
      'Laser-Cut Ventilation Zones',
      'Semi-Auto Lock YKK Zippers',
      'Zero-Restriction Gusseted Crotch',
      'Compression-Liner Integration Ready'
    ]
  },
];

export default function Collection() {
  const ref = useRef<HTMLElement>(null);

  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [active3D, setActive3D] = useState<string | null>(null);
  const [activeDossier, setActiveDossier] = useState<(typeof products)[0] | null>(null);

  const handleNotify = () => {
    const target = document.querySelector('#waitlist');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCheckout = (priceId: string) => {
    // Forwarding to checkout simulation
    console.log('Initiating checkout for:', priceId);
  };

  return (
    <section id="collection" className="bg-transparent py-16 md:py-24" ref={ref}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8 }}
            className="font-[family-name:var(--font-space)] text-[12px] tracking-[0.3em] uppercase text-nero-concrete mb-4"
          >
            COLLECTION 001
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-[family-name:var(--font-space)] text-[32px] md:text-[48px] font-bold text-nero-bone leading-tight mb-6"
          >
            The Foundation
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-[family-name:var(--font-inter)] text-[16px] md:text-[18px] font-light text-nero-smoke max-w-2xl"
          >
            Three pieces. Zero compromise. Built for the athlete who moves between the gym and the real world without changing.
          </motion.p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {products.map((product, i) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="group"
            >
              {/* Product Image Placeholder */}
              <div 
                onClick={() => setActiveDossier(product)}
                className="relative aspect-[3/4] bg-nero-charcoal mb-6 overflow-hidden flex items-center justify-center cursor-pointer transition-transform duration-700 group-hover:-translate-y-2"
                style={{ transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)' }}
              >
                {/* 3D Selector */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActive3D(active3D === product.name ? null : product.name);
                  }}
                  className="absolute top-4 right-4 z-[25] p-2 bg-nero-void/80 border border-nero-steel/30 text-[9px] font-[family-name:var(--font-space)] tracking-widest text-nero-concrete hover:text-nero-bronze transition-colors flex items-center gap-2"
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${active3D === product.name ? 'bg-nero-bronze animate-pulse' : 'bg-nero-steel'}`} />
                  {active3D === product.name ? 'SCAN_EXIT' : '3D_SCAN'}
                </button>

                {/* Content Switcher: 3D vs Image */}
                {active3D === product.name ? (
                  <ProductScene />
                ) : (
                  <>
                    <Image 
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover opacity-85 group-hover:opacity-100 transition-all duration-700 transform group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />

                    {/* Hover overlay and text */}
                    <div className="absolute inset-0 bg-nero-void/0 group-hover:bg-nero-void/40 backdrop-blur-[0px] group-hover:backdrop-blur-[2px] transition-all duration-500 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <span className="font-[family-name:var(--font-space)] text-[11px] tracking-[0.4em] text-nero-bone border border-nero-bone/20 px-6 py-3 bg-nero-void/60">
                        VIEW_DATA_OS
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Product Info */}
              <div className="flex justify-between items-start mb-3">
                <p className="font-[family-name:var(--font-space)] text-[9px] tracking-[0.3em] text-nero-bronze uppercase">
                  {product.category}
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => setSelectedProduct(product.name)}
                    className="font-[family-name:var(--font-space)] text-[9px] tracking-[0.1em] text-nero-concrete hover:text-white transition-colors"
                  >
                    [AI_FIT]
                  </button>
                </div>
              </div>
              <h3 className="font-[family-name:var(--font-space)] text-[20px] font-bold tracking-tighter text-nero-bone mb-2">
                {product.name}
              </h3>
              <p className="font-[family-name:var(--font-space)] text-[11px] tracking-[0.2em] text-nero-smoke mb-4 border-b border-nero-steel/30 pb-4">
                DATA_SPEC // {product.price}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Launch Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-24 border-t border-nero-steel/30 pt-16 flex flex-col items-center gap-8"
        >
          <div className="space-y-1 text-center">
             <p className="font-[family-name:var(--font-space)] text-[12px] tracking-[0.5em] text-nero-concrete uppercase">Phase_01</p>
             <p className="font-[family-name:var(--font-space)] text-[24px] font-bold text-nero-bone">COMING SOON</p>
          </div>
          <button
            onClick={handleNotify}
            className="font-[family-name:var(--font-space)] text-[12px] font-bold tracking-[0.3em] px-12 py-4 bg-nero-bone text-nero-void hover:bg-nero-bronze hover:text-white transition-all duration-500"
          >
            JOIN THE WAITLIST
          </button>
        </motion.div>
      </div>
      
      {/* Dossier Overlay */}
      <ProductDossier 
        product={activeDossier}
        isOpen={!!activeDossier}
        onClose={() => setActiveDossier(null)}
        onPreOrder={handleCheckout}
      />

      {/* AI Fit Modal */}
      <FitIntelligence 
        productName={selectedProduct || ''} 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
      />
    </section>
  );
}
