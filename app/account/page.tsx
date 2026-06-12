import AccountClient from '@/components/AccountClient';
import TopNavBar from '@/components/TopNavBar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'My Account | Chill Co.',
  description: 'Manage your Chill Co. account and view order history.',
};

export default function AccountPage() {
  return (
    <>
      <TopNavBar />
      <AccountClient />
      <Footer />
    </>
  );
}
