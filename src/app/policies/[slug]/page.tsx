import Link from 'next/link';

const policies: Record<string, { title: string; date: string; content: React.ReactNode }> = {
  privacy: {
    title: 'Privacy Policy',
    date: 'April 2026',
    content: (
      <>
        <h3 className="text-nero-bone font-bold mb-4 font-[family-name:var(--font-space)] text-xl tracking-wider uppercase">1. Information Architecture</h3>
        <p className="mb-8">This Privacy Policy governs the collection, processing, and storage of telemetry and user-provided data across all NERO platforms, including the primary website, associated digital interfaces, and physical technology. We collect, store, and process your information in accordance with applicable data protection laws. NERO does not sell, rent, or lease your personal data to third parties. Data is collected solely for fulfilling orders, product analytics, and platform security.</p>
        
        <h3 className="text-nero-bone font-bold mb-4 font-[family-name:var(--font-space)] text-xl tracking-wider uppercase">2. Telemetry and Data Acquisition</h3>
        <p className="mb-4">When interacting with the NERO platform, we aggregate the following classes of data:</p>
        <ul className="list-disc pl-6 mb-8 text-nero-smoke markers:text-nero-bronze space-y-2">
          <li><strong>Identity & Account Data:</strong> Name, secure cryptographic email tokens, sizing preferences, billing/shipping addresses, and demographic vectors utilized strictly for order fulfillment.</li>
          <li><strong>Biometric & Usage Telemetry:</strong> Metrics formally collected via the NERO app or smart-textiles. Collection of this data is strictly opt-in and utilized solely for providing functionality as requested by the user.</li>
          <li><strong>Digital Traversal Data:</strong> IP signatures, browser architecture, load sequences, and active session paths across our digital nodes. This is automatically collected to fortify system responses against unauthorized access.</li>
        </ul>

        <h3 className="text-nero-bone font-bold mb-4 font-[family-name:var(--font-space)] text-xl tracking-wider uppercase">3. Data Subject Rights & Processing</h3>
        <p className="mb-8">Users retain the absolute right to request access to, correction of, or deletion of their personal telemetry stored within our architecture. We reserve the right to retain specific transactional data necessary to comply with prevailing legal obligations or to resolve disputes. Requests for data erasure must be routed formally through official support channels.</p>

        <h3 className="text-nero-bone font-bold mb-4 font-[family-name:var(--font-space)] text-xl tracking-wider uppercase">4. Security Infrastructure</h3>
        <p className="mb-8">All incoming data payloads are funneled through military-grade encryption tunnels. We employ rigorous identity and access management (IAM) protocols. However, no data transmission over the Internet can be guaranteed to be 100% secure. You acknowledge that you provide your personal data at your own risk, and NERO shall not be liable for unauthorized decryption or third-party breaches outside of our direct control.</p>
      </>
    ),
  },
  terms: {
    title: 'Terms of Service',
    date: 'April 2026',
    content: (
      <>
         <h3 className="text-nero-bone font-bold mb-4 font-[family-name:var(--font-space)] text-xl tracking-wider uppercase">1. Protocol Acceptance & Modification</h3>
         <p className="mb-8">By actively connecting to this digital hub, ordering our physical architecture, or utilizing the NERO Intelligence framework, you agree to these Terms of Service. NERO explicitly reserves the right to modify, alter, or update these terms at any time, at our sole discretion, without prior notice. Your continued use of the platform following any modifications constitutes binding acceptance of those changes.</p>
         
         <h3 className="text-nero-bone font-bold mb-4 font-[family-name:var(--font-space)] text-xl tracking-wider uppercase">2. Intellectual Property Rights</h3>
         <p className="mb-8">All digital schematics, physical designs, algorithms, logos, and linguistic constructs operating under the NERO banner are the exclusive intellectual property of NERO. Unauthorized distribution, reverse-engineering, or commercial duplication of our physical or digital assets is strictly prohibited and will result in immediate termination of service and legal action to the fullest extent permitted by law.</p>

         <h3 className="text-nero-bone font-bold mb-4 font-[family-name:var(--font-space)] text-xl tracking-wider uppercase">3. Disclaimer of Warranties</h3>
         <p className="mb-8 uppercase text-sm">Our products and digital platforms are provided on an "as is" and "as available" basis without any warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement. NERO does not warrant that our product will meet your specific requirements, or that the operation of the product will be uninterrupted, error-free, or entirely secure.</p>
         
         <h3 className="text-nero-bone font-bold mb-4 font-[family-name:var(--font-space)] text-xl tracking-wider uppercase">4. Limitation of Liability</h3>
         <p className="mb-8 uppercase text-sm">Under no circumstances, including negligence, shall NERO, its directors, employees, or operational partners be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of the use of, or the inability to use, our physical apparel, software, or digital frameworks. Your sole and exclusive remedy for dissatisfaction with our products or services is to discontinue usage.</p>

         <h3 className="text-nero-bone font-bold mb-4 font-[family-name:var(--font-space)] text-xl tracking-wider uppercase">5. Governing Law</h3>
         <p className="mb-8">These Terms of Service and any separate agreements whereby we provide you products or services shall be governed by and construed in accordance with the laws of the Republic of South Africa. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the state.</p>
      </>
    ),
  },
  returns: {
    title: 'Return Policy',
    date: 'April 2026',
    content: (
      <>
         <h3 className="text-nero-bone font-bold mb-4 font-[family-name:var(--font-space)] text-xl tracking-wider uppercase">1. Return Parameters & Authorization</h3>
         <p className="mb-8">Returns are strictly constrained to 14 days post-delivery. To initiate a return, a Return Merchandise Authorization (RMA) token is categorically required. NERO retains the sole and absolute discretion to approve or reject any return request. Products sent to our logistics centers without an authorized RMA will be considered forfeited and will not be refunded or returned.</p>
         
         <h3 className="text-nero-bone font-bold mb-4 font-[family-name:var(--font-space)] text-xl tracking-wider uppercase">2. Condition of Goods</h3>
         <p className="mb-4">Apparel and hardware must be returned in fundamentally flawless, pristine condition.</p>
         <ul className="list-disc pl-6 mb-8 text-nero-smoke markers:text-nero-bronze space-y-2">
          <li><strong>Uncompromised State:</strong> Merchandise must be entirely unworn, unwashed, and completely uncompromised. Any evidence of sweat, physical exertion, perfume, or environmental odor immediately voids the return authorization.</li>
          <li><strong>Labeling Integrity:</strong> All technical labels, NFC tags, and bespoke packaging nodes must remain attached and structurally intact.</li>
          <li><strong>Final Validation:</strong> NERO logistics operatives hold sole authority in determining the condition of returned goods. Disputed conditions will always default to the final assessment made by our internal quality control.</li>
        </ul>

         <h3 className="text-nero-bone font-bold mb-4 font-[family-name:var(--font-space)] text-xl tracking-wider uppercase">3. Defective Protocol</h3>
         <p className="mb-8">Claims regarding manufacturing defects must be submitted within 7 days of delivery with supporting cryptographic/photographic evidence. "Defects" do not encompass damage caused by improper maintenance, normal wear and tear, or utilization outside of designated physical load parameters.</p>

         <h3 className="text-nero-bone font-bold mb-4 font-[family-name:var(--font-space)] text-xl tracking-wider uppercase">4. Financial and Logistical Liability</h3>
         <p className="mb-8">The user assumes all financial responsibility for return shipping tariffs. Original shipping fees, priority surcharges, and international customs duties are entirely non-refundable. NERO assumes zero liability for packages intercepted, stolen, or lost in transit by third-party delivery services. We strongly recommend utilizing tracking and insurance for all inward freight.</p>
      </>
    ),
  }
};

export default async function PolicyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const policy = policies[slug];

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
