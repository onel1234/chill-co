import TopNavBar from '@/components/TopNavBar';
import MobileNavBar from '@/components/MobileNavBar';
import ShopClient from '@/components/ShopClient';
import Footer from '@/components/Footer';

export default function ShopPage() {
  return (
    <>
      <div className="hidden md:block">
        <TopNavBar />
      </div>
      <div className="block md:hidden">
        <MobileNavBar />
      </div>
      
      <ShopClient />
      
      <Footer />
    </>
  );
}
