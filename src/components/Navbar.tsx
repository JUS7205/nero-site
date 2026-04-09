'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'MANIFESTO', href: '#about' },
  { label: 'VISION', href: '#vision' },
  { label: 'COLLECTION', href: '#collection' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWaitlistClick = () => {
    setMobileOpen(false);
    const target = document.querySelector('#waitlist');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 h-20 flex items-center transition-all duration-500 ${
          scrolled
            ? 'glass-chassis'
            : 'bg-transparent'
        }`}
      >
        {scrolled && <div className="bronze-rim-light" />}

        <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="font-[family-name:var(--font-space)] text-[20px] font-semibold tracking-[0.3em] text-nero-bone hover:text-nero-bronze transition-colors duration-500"
          >
            NERO
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="font-[family-name:var(--font-space)] text-[11px] font-medium tracking-[0.2em] text-nero-concrete hover:text-nero-bone transition-colors duration-500"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <button
            onClick={handleWaitlistClick}
            className="hidden md:block font-[family-name:var(--font-space)] text-[11px] font-medium tracking-[0.15em] px-6 py-2.5 bg-nero-bone text-nero-void hover:bg-nero-bronze hover:-translate-y-0.5 transition-all duration-500 cursor-pointer"
            style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.4, 0.25, 1)' }}
          >
            JOIN WAITLIST
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex flex-col gap-1.5 w-8 h-8 items-center justify-center cursor-pointer"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              className="block w-6 h-[1px] bg-nero-bone origin-center"
              transition={{ duration: 0.3 }}
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-[1px] bg-nero-bone"
              transition={{ duration: 0.3 }}
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block w-6 h-[1px] bg-nero-bone origin-center"
              transition={{ duration: 0.3 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-nero-void/98 backdrop-blur-xl flex flex-col items-center justify-center gap-10"
          >
            {navItems.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="font-[family-name:var(--font-space)] text-2xl font-semibold tracking-[0.2em] text-nero-bone hover:text-nero-bronze transition-colors duration-500"
              >
                {item.label}
              </motion.a>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              onClick={handleWaitlistClick}
              className="font-[family-name:var(--font-space)] text-[13px] font-medium tracking-[0.15em] px-8 py-3 bg-nero-bone text-nero-void hover:bg-nero-bronze transition-all duration-500 cursor-pointer"
            >
              JOIN WAITLIST
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
