import Link from 'next/link';

const policies: Record<string, { title: string; date: string; content: React.ReactNode }> = {
  privacy: {
    title: 'Privacy Policy',
    date: 'April 2026',
    content: (
      <>
        <h3 className="text-nero-bone font-bold mb-4 font-[family-name:var(--font-space)] text-xl tracking-wider uppercase">1. Information Architecture</h3>
        <p className="mb-8">This Privacy Policy governs the collection, processing, and storage of telemetry and user-provided data across all NERO platforms, including the primary website, associated digital interfaces, and embedded garment technology. We do not operate as data brokers. The data you provide operates exclusively as fuel for the NERO ecosystem to optimize production scaling, user experience, and individualized machine-learning inferences.</p>
        
        <h3 className="text-nero-bone font-bold mb-4 font-[family-name:var(--font-space)] text-xl tracking-wider uppercase">2. Telemetry and Data Acquisition</h3>
        <p className="mb-4">When interacting with the NERO platform or our proprietary physical gear, we aggregate several classes of data:</p>
        <ul className="list-disc pl-6 mb-8 text-nero-smoke markers:text-nero-bronze space-y-2">
          <li><strong>Identity & Access Parameters:</strong> Name, secure cryptographic email tokens, sizing preferences, demographic vectors utilized during checkout and application onboarding.</li>
          <li><strong>Biometric & Usage Telemetry:</strong> Metrics captured via the NERO app or smart-textile nodes (where applicable), including movement frequency, environmental exposure, and stress conditions. This is strictly opt-in and stored in highly encrypted shards.</li>
          <li><strong>Digital Traversal Data:</strong> IP signatures, browser architecture, load sequences, and active session paths across our digital nodes to fortify system responses and security.</li>
        </ul>

        <h3 className="text-nero-bone font-bold mb-4 font-[family-name:var(--font-space)] text-xl tracking-wider uppercase">3. Utilization Protocols</h3>
        <p className="mb-8">Your data acts as the architectural blueprint for your experience. We utilize your specifications strictly to formulate highly targeted updates, build out future clothing iterations, execute logistics/shipping commands, and calibrate the AI performance matrix tied to your user profile. NERO fundamentally refuses to monetize raw user identity data through external third-party syndication.</p>

        <h3 className="text-nero-bone font-bold mb-4 font-[family-name:var(--font-space)] text-xl tracking-wider uppercase">4. Security Infrastructure</h3>
        <p className="mb-8">All incoming data payloads are funneled through military-grade encryption tunnels. We employ a brutalist approach to cyber-defense: databases are restricted behind rigorous identity and access management (IAM) protocols and multi-factor authentication requirements for all internal operatives. No system is technically impenetrable, but our defensive grid is built to modern peak specifications.</p>
      </>
    ),
  },
  terms: {
    title: 'Terms of Service',
    date: 'April 2026',
    content: (
      <>
         <h3 className="text-nero-bone font-bold mb-4 font-[family-name:var(--font-space)] text-xl tracking-wider uppercase">1. Protocol Acceptance</h3>
         <p className="mb-8">Welcome to NERO. By actively connecting to this digital hub, pre-ordering our physical architecture (gear), or communicating with the NERO Intelligence framework, you acknowledge and agree to be bound unconditionally by these Terms of Service. If you find these parameters unacceptable, sever your connection to this site immediately.</p>
         
         <h3 className="text-nero-bone font-bold mb-4 font-[family-name:var(--font-space)] text-xl tracking-wider uppercase">2. Intellectual Property Rights</h3>
         <p className="mb-8">Every digital schematic, physical design, logo, AI framework, and linguistic construct operating under the NERO banner is the exclusive intellectual property of NERO LABS. Reverse-engineering our embedded tech, unauthorized distribution of our physical designs, or duplication of our digital brand assets will result in immediate termination of access and potential legal escalation under international IP law.</p>

         <h3 className="text-nero-bone font-bold mb-4 font-[family-name:var(--font-space)] text-xl tracking-wider uppercase">3. Production and Fulfillment Limits</h3>
         <p className="mb-8">NERO operates on an extreme precision model. Drops are limited and production runs are meticulously calculated. Securing a spot on the waitlist or executing a pre-order does not definitively guarantee fulfillment until your payment node is verified and an absolute shipping manifest is generated. We reserve the unequivocal right to refuse service, cancel orders, or restrict quantities to maintain supply-chain integrity.</p>
         
         <h3 className="text-nero-bone font-bold mb-4 font-[family-name:var(--font-space)] text-xl tracking-wider uppercase">4. Liability Restraints</h3>
         <p className="mb-8">Our garments are engineered for intense, brutal physiological strain. However, NERO assumes zero liability for bodily injury, equipment failure, or environmental damage incurred while wearing our gear. You are solely responsible for the physical actions you undertake while operating within our clothing.</p>
      </>
    ),
  },
  returns: {
    title: 'Return Policy',
    date: 'April 2026',
    content: (
      <>
         <h3 className="text-nero-bone font-bold mb-4 font-[family-name:var(--font-space)] text-xl tracking-wider uppercase">1. The NERO Guarantee</h3>
         <p className="mb-8">We engineer perfection. If your gear arrives operating below the intended specification, featuring structural anomalies or unmitigated manufacturing flaws, we will rectify the issue. The NERO Return Protocol is strictly constrained to 14 days post-delivery.</p>
         
         <h3 className="text-nero-bone font-bold mb-4 font-[family-name:var(--font-space)] text-xl tracking-wider uppercase">2. RMA Execution</h3>
         <p className="mb-4">To initiate a return or structural exchange, you must generate a Return Merchandise Authorization (RMA) token via our support node. Unauthorized returns sent blindly to our logistics center will be immediately classified as lost and incinerated without refund.</p>
         <ul className="list-disc pl-6 mb-8 text-nero-smoke markers:text-nero-bronze space-y-2">
          <li><strong>Uncompromised State:</strong> Apparel must be fundamentally unworn, unwashed, and completely uncompromised.</li>
          <li><strong>Telemetry Tags:</strong> All technical labels, NFC tags, and packaging nodes must be attached and intact.</li>
          <li><strong>Refusal Rights:</strong> If the gear is returned smelling of ozone, sweat, or any physical exertion, the exchange will be nullified.</li>
        </ul>

         <h3 className="text-nero-bone font-bold mb-4 font-[family-name:var(--font-space)] text-xl tracking-wider uppercase">3. Logistics and Tariffs</h3>
         <p className="mb-8">The user is entirely responsible for the return shipping vector. NERO is not liable for packages intercepted, lost, or destroyed during transit by third-party courier services. Original shipping tariffs are non-refundable unless the physical failure was explicitly determined to be an error originating from NERO Labs.</p>
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
