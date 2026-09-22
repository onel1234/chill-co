import dynamic from 'next/dynamic';
import TopNavBar from '@/components/TopNavBar';
import HeroSection from '@/components/HeroSection';
import MarqueeQuote from '@/components/MarqueeQuote';
import CuratedSelection from '@/components/CuratedSelection';

const CustomPrintSection = dynamic(() => import('@/components/CustomPrintSection'));
const OurCollections = dynamic(() => import('@/components/OurCollections'));
const Manifesto = dynamic(() => import('@/components/Manifesto'));
const Newsletter = dynamic(() => import('@/components/Newsletter'));
const Footer = dynamic(() => import('@/components/Footer'));

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
