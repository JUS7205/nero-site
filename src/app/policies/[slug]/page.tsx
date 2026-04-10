import Link from 'next/link';

const policies: Record<string, { title: string; date: string; content: React.ReactNode }> = {
  privacy: {
    title: 'Privacy Policy',
    date: 'April 2026',
    content: (
      <>
        <h3 className="text-nero-bone font-bold mb-4 font-[family-name:var(--font-space)] text-xl tracking-wider uppercase">1. Information Collection</h3>
        <p className="mb-8">We gather telemetry from our platforms to improve the ecosystem. Identifying data is stripped and fully encrypted. We are building a secure network, not a data broker.</p>
        
        <h3 className="text-nero-bone font-bold mb-4 font-[family-name:var(--font-space)] text-xl tracking-wider uppercase">2. Use of Data</h3>
        <p className="mb-8">Your hardware specifications and interaction metrics may be logged to ensure optimal performance. This data is exclusively utilized to refine NERO performance parameters and improve the infrastructure.</p>

        <h3 className="text-nero-bone font-bold mb-4 font-[family-name:var(--font-space)] text-xl tracking-wider uppercase">3. Security Operations</h3>
        <p className="mb-8">We employ brutalist encryption standards. Our databases are heavily locked down. While no system is impenetrable, we utilize state-of-the-art defensive protocols.</p>
      </>
    ),
  },
  terms: {
    title: 'Terms of Service',
    date: 'April 2026',
    content: (
      <>
         <h3 className="text-nero-bone font-bold mb-4 font-[family-name:var(--font-space)] text-xl tracking-wider uppercase">1. Acceptance</h3>
         <p className="mb-8">By accessing the NERO network or purchasing our gear, you agree to abide by these terms. If you do not agree, disconnect immediately.</p>
         
         <h3 className="text-nero-bone font-bold mb-4 font-[family-name:var(--font-space)] text-xl tracking-wider uppercase">2. Equipment Utilization</h3>
         <p className="mb-8">Our garments and hardware are engineered for high-intensity application. We are not liable for misuse, improper maintenance, or damages resulting from operations outside of specifications.</p>
      </>
    ),
  },
  returns: {
    title: 'Return Policy',
    date: 'April 2026',
    content: (
      <>
         <h3 className="text-nero-bone font-bold mb-4 font-[family-name:var(--font-space)] text-xl tracking-wider uppercase">1. Authorizations</h3>
         <p className="mb-8">Defective or incorrectly sized hardware may be returned within 14 days of acquisition. All returns require an authorized digital RMA token.</p>
         
         <h3 className="text-nero-bone font-bold mb-4 font-[family-name:var(--font-space)] text-xl tracking-wider uppercase">2. Condition of Return</h3>
         <p className="mb-8">Apparel must be unworn, unmodified, and contain all original packaging and telemetry tags. Scratched or utilized items will be rejected by our inspection facility.</p>
      </>
    ),
  }
};

export default function PolicyPage({ params }: { params: { slug: string } }) {
  const policy = policies[params.slug];

  if (!policy) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div>
          <h1 className="font-[family-name:var(--font-space)] text-4xl text-nero-bone mb-4">DATA NOT FOUND</h1>
          <Link href="/" className="text-nero-bronze hover:underline font-[family-name:var(--font-space)] text-sm tracking-widest uppercase">Return to Base</Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 bg-nero-void relative z-10 selection:bg-nero-bronze/30 selection:text-nero-bone">
       <div className="max-w-3xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-nero-steel hover:text-nero-bronze transition-colors mb-16 font-[family-name:var(--font-space)] tracking-[0.2em] text-[10px] uppercase">
            &larr; Back
          </Link>
          
          <header className="mb-16 border-b border-nero-steel/30 pb-8">
            <h1 className="font-[family-name:var(--font-space)] text-4xl md:text-5xl font-bold text-nero-bone leading-tight tracking-[0.1em] uppercase mb-4">
              {policy.title}
            </h1>
            <p className="font-[family-name:var(--font-space)] text-nero-bronze text-xs tracking-[0.3em] uppercase">
              Last Updated: {policy.date}
            </p>
          </header>

          <article className="prose prose-invert prose-p:text-nero-smoke prose-p:leading-relaxed prose-p:font-light font-[family-name:var(--font-inter)] max-w-none text-[15px]">
            {policy.content}
          </article>
       </div>
    </main>
  );
}
