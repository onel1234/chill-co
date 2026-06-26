import TopNavBar from '@/components/TopNavBar';
import HeroSection from '@/components/HeroSection';
import MarqueeQuote from '@/components/MarqueeQuote';
import CuratedSelection from '@/components/CuratedSelection';
import OurCollections from '@/components/OurCollections';
import CustomPrintSection from '@/components/CustomPrintSection';
import Manifesto from '@/components/Manifesto';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <TopNavBar />
      <HeroSection />
      <MarqueeQuote />
      <CuratedSelection />
      <CustomPrintSection />
      <OurCollections />
      <Manifesto />
      <Newsletter />
      <Footer />
    </>
  );
}
