'use client';

export default function Footer() {
  const socialLinks = [
    { label: 'INSTAGRAM', href: 'https://instagram.com' },
    { label: 'TIKTOK', href: 'https://tiktok.com' },
    { label: 'YOUTUBE', href: 'https://youtube.com' },
  ];

  return (
    <footer className="bg-nero-void border-t border-nero-steel/10 py-16">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        {/* Main footer row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
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
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-[family-name:var(--font-space)] text-[11px] tracking-[0.2em] text-nero-concrete hover:text-nero-bone transition-colors duration-500"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="font-[family-name:var(--font-space)] text-[11px] tracking-[0.15em] text-nero-concrete">
            &copy; 2025 NERO. SOUTH AFRICA.
          </p>
        </div>

        {/* Tagline */}
        <p className="text-center font-[family-name:var(--font-inter)] text-[12px] font-light text-nero-steel mt-12 tracking-wider">
          Forged in darkness. Built for everywhere.
        </p>
      </div>
    </footer>
  );
}
