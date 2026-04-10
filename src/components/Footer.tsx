'use client';

import Link from 'next/link';

export default function Footer() {
  const socialLinks = [
    { label: 'INSTAGRAM', href: '#' },
    { label: 'TIKTOK', href: '#' },
    { label: 'YOUTUBE', href: '#' },
  ];

  return (
    <footer className="bg-nero-void border-t border-nero-steel/10 py-16">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        {/* Main footer row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="font-[family-name:var(--font-space)] text-[18px] font-semibold tracking-[0.3em] text-nero-bone hover:text-nero-bronze transition-colors duration-500"
          >
            NERO
          </a>

          {/* Social links */}
          <div className="flex items-center gap-8">
            {socialLinks.map((link) => (
              <span
                key={link.label}
                className="font-[family-name:var(--font-space)] text-[11px] tracking-[0.2em] text-nero-smoke opacity-80 hover:text-nero-bone transition-colors cursor-default select-none"
                title="Coming soon"
              >
                {link.label}
              </span>
            ))}
          </div>

          {/* Copyright */}
          <p className="font-[family-name:var(--font-space)] text-[11px] tracking-[0.15em] text-nero-smoke/80">
            &copy; 2026 NERO. SOUTH AFRICA.
          </p>
        </div>

        {/* Bottom row: Tagline & Policies */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-nero-steel/10 gap-6">
          <p className="font-[family-name:var(--font-inter)] text-[12px] font-light text-nero-smoke tracking-wider text-center md:text-left">
            Forged in darkness. Built for everywhere.
          </p>
          
          <div className="flex items-center gap-6 justify-center">
            <Link href="/policies/terms" className="font-[family-name:var(--font-space)] text-[9px] tracking-[0.15em] text-nero-smoke/80 hover:text-nero-bronze transition-colors uppercase">
              Terms of Service
            </Link>
            <Link href="/policies/privacy" className="font-[family-name:var(--font-space)] text-[9px] tracking-[0.15em] text-nero-smoke/80 hover:text-nero-bronze transition-colors uppercase">
              Privacy Policy
            </Link>
            <Link href="/policies/returns" className="font-[family-name:var(--font-space)] text-[9px] tracking-[0.15em] text-nero-smoke/80 hover:text-nero-bronze transition-colors uppercase">
              Return Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
