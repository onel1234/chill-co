import TopNavBar from '@/components/TopNavBar';
import MobileNavBar from '@/components/MobileNavBar';
import ProductTeeClient from '@/components/ProductTeeClient';
import Footer from '@/components/Footer';

export default function ProductTeePage() {
  return (
    <>
      <div className="hidden md:block">
        <TopNavBar />
      </div>
      <div className="block md:hidden">
        <MobileNavBar />
      </div>
      
      <ProductTeeClient />
      
      <Footer />
    </>
  );
}
