import TopNavBar from '@/components/TopNavBar';
import MobileNavBar from '@/components/MobileNavBar';
import AboutClient from '@/components/AboutClient';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <>
      <div className="hidden md:block">
        <TopNavBar />
      </div>
      <div className="block md:hidden">
        <MobileNavBar />
      </div>
      
      <AboutClient />
      
      <Footer />
    </>
  );
}
