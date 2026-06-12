import OrderDetailClient from '@/components/OrderDetailClient';
import TopNavBar from '@/components/TopNavBar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Order Details | Chill Co.',
  description: 'View your order details.',
};

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = await params;
  return (
    <>
      <TopNavBar />
      <OrderDetailClient orderId={id} />
      <Footer />
    </>
  );
}
