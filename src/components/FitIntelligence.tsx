'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FitIntelligenceProps {
  productName: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function FitIntelligence({ productName, isOpen, onClose }: FitIntelligenceProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    preferredFit: 'Oversized',
  });

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/fit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, productName }),
      });
      const data = await res.json();
      setResult(data.recommendation);
    } catch (err) {
      console.error('Fit Calc failed', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-nero-void/90 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-nero-obsidian border border-nero-steel/30 p-8 shadow-2xl"
          >
            <h2 className="font-[family-name:var(--font-space)] text-[18px] font-bold tracking-[0.2em] text-nero-bone uppercase mb-2">
              Fit Intelligence
            </h2>
            <p className="font-[family-name:var(--font-space)] text-[10px] tracking-widest text-nero-concrete uppercase mb-8">
              Calculating drape metrics for: {productName}
            </p>

            {result ? (
              <div className="space-y-6">
                <div className="p-6 bg-nero-steel/10 border border-nero-bronze/20">
                  <p className="font-[family-name:var(--font-inter)] text-nero-smoke text-[15px] leading-relaxed">
                    {result}
                  </p>
                </div>
                <button
                  onClick={() => setResult(null)}
                  className="w-full font-[family-name:var(--font-space)] text-[11px] tracking-[0.2em] py-4 border border-nero-steel text-nero-bone hover:border-nero-bronze transition-colors uppercase"
                >
                  Recalculate
                </button>
                <button
                  onClick={onClose}
                  className="w-full font-[family-name:var(--font-space)] text-[11px] tracking-[0.2em] py-4 text-nero-concrete hover:text-nero-bone transition-colors uppercase"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleCalculate} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] text-nero-concrete uppercase tracking-widest">Height (CM)</label>
                    <input 
                      required
                      type="number"
                      value={formData.height}
                      onChange={(e) => setFormData({...formData, height: e.target.value})}
                      placeholder="180"
                      className="w-full bg-nero-void border border-nero-steel/30 px-4 py-3 text-nero-bone text-[14px] focus:outline-none focus:border-nero-bronze/50 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] text-nero-concrete uppercase tracking-widest">Weight (KG)</label>
                    <input 
                      required
                      type="number"
                      value={formData.weight}
                      onChange={(e) => setFormData({...formData, weight: e.target.value})}
                      placeholder="85"
                      className="w-full bg-nero-void border border-nero-steel/30 px-4 py-3 text-nero-bone text-[14px] focus:outline-none focus:border-nero-bronze/50 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] text-nero-concrete uppercase tracking-widest">Drape Preference</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Standard', 'Oversized'].map((fit) => (
                      <button
                        key={fit}
                        type="button"
                        onClick={() => setFormData({...formData, preferredFit: fit})}
                        className={`py-3 text-[11px] font-[family-name:var(--font-space)] tracking-widest uppercase border transition-all ${
                          formData.preferredFit === fit 
                            ? 'bg-nero-bronze/10 border-nero-bronze text-nero-bone' 
                            : 'border-nero-steel/30 text-nero-concrete hover:border-nero-steel'
                        }`}
                      >
                        {fit}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  disabled={loading}
                  className="w-full bg-nero-bone text-nero-void font-[family-name:var(--font-space)] text-[11px] font-bold tracking-[0.25em] py-5 hover:bg-nero-bronze transition-colors uppercase flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-nero-void/30 border-t-nero-void rounded-full animate-spin" />
                  ) : 'Run Optimization'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
