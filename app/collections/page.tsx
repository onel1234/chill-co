import TopNavBar from '@/components/TopNavBar';
import MobileNavBar from '@/components/MobileNavBar';
import CollectionsClient from '@/components/CollectionsClient';
import Footer from '@/components/Footer';

export default function CollectionsPage() {
  return (
    <>
      <div className="hidden md:block">
        <TopNavBar />
      </div>
      <div className="block md:hidden">
        <MobileNavBar />
      </div>
      
      <CollectionsClient />
      
      <Footer />
    </>
  );
}
