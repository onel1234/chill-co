import TopNavBar from '@/components/TopNavBar';
import HeroSection from '@/components/HeroSection';
import CuratedSelection from '@/components/CuratedSelection';
import Manifesto from '@/components/Manifesto';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import MobileLanding from '@/components/MobileLanding';

export default function Home() {
  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:block">
        <TopNavBar />
        <HeroSection />
        <CuratedSelection />
        <Manifesto />
        <Newsletter />
        <Footer />
      </div>

      {/* Mobile View */}
      <div className="block md:hidden">
        <MobileLanding />
      </div>
    </>
  );
}
