'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, FormEvent } from 'react';
import { joinWaitlist } from '@/app/actions/waitlist';

export default function Waitlist() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setStatus('error');
      return;
    }

    setLoading(true);

    try {
      const result = await joinWaitlist(email);
      
      if (result.status === 'success') {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Submission failed:', error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="waitlist" className="relative bg-nero-obsidian py-20 md:py-32 overflow-hidden" ref={ref}>
      {/* Glow behind form */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(184,151,106,0.04)_0%,transparent_70%)] blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-[640px] mx-auto px-6 md:px-12 text-center">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="font-[family-name:var(--font-space)] text-[12px] tracking-[0.3em] uppercase text-nero-bronze mb-4"
        >
          BE FIRST
        </motion.p>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-[family-name:var(--font-space)] text-[32px] md:text-[48px] font-bold text-nero-bone leading-tight mb-6"
        >
          Join the waitlist.
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-[family-name:var(--font-inter)] text-[16px] font-light text-nero-smoke mb-12"
        >
          First access to drops. Behind-the-scenes updates. Early pricing. Be part of building something that hasn&apos;t existed before.
        </motion.p>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center gap-3 py-4"
            >
              {/* Checkmark */}
              <svg
                className="w-5 h-5 text-nero-bronze"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-[family-name:var(--font-inter)] text-[16px] text-nero-bone">
                You&apos;re in. Watch your inbox.
              </span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                placeholder="Enter your email"
                required
                className={`flex-1 px-5 py-3.5 bg-nero-charcoal border text-nero-bone font-[family-name:var(--font-inter)] text-[14px] placeholder:text-nero-concrete/60 focus:outline-none focus:border-nero-bronze transition-colors duration-300 ${
                  status === 'error' ? 'border-red-500/50' : 'border-nero-steel'
                }`}
                aria-label="Email address"
              />
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3.5 bg-nero-bone text-nero-void font-[family-name:var(--font-space)] text-[12px] font-semibold tracking-[0.15em] hover:bg-nero-bronze hover:-translate-y-0.5 transition-all duration-500 disabled:opacity-50 disabled:hover:translate-y-0 cursor-pointer"
                style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.4, 0.25, 1)' }}
              >
                {loading ? (
                  <span className="inline-block w-4 h-4 border-2 border-nero-void/30 border-t-nero-void rounded-full animate-spin" />
                ) : (
                  'JOIN'
                )}
              </button>
            </form>
          )}

          {/* Error message */}
          {status === 'error' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-[family-name:var(--font-inter)] text-[13px] text-red-400/80 mt-3"
            >
              Something went wrong. Try again.
            </motion.p>
          )}
        </motion.div>

        {/* Fine print */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-[family-name:var(--font-inter)] text-[12px] text-nero-concrete/60 mt-6"
        >
          No spam. Just updates on the journey.
        </motion.p>
      </div>
    </section>
  );
}
