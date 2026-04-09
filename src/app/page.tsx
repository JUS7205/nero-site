import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Manifesto from '@/components/Manifesto';
import Collection from '@/components/Collection';
import Vision from '@/components/Vision';
import Waitlist from '@/components/Waitlist';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Manifesto />
      <Vision />
      <Collection />
      <Waitlist />
      <Footer />
    </main>
  );
}
