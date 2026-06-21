import AdminPanelClient from '@/components/AdminPanelClient';
import TopNavBar from '@/components/TopNavBar';
import Footer from '@/components/Footer';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Admin Panel | Chill Co.',
  description: 'Manage store orders and settings.',
};

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/account/login');
  }

  // Verify admin status from DB
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single();

  const adminEmails = (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  const isAdmin = !!profile?.is_admin || adminEmails.includes(user.email?.toLowerCase() ?? '');

  if (!isAdmin) {
    redirect('/');
  }

  // Fetch all orders
  const { data: orders } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .order('created_at', { ascending: false });

  return (
    <>
      <TopNavBar />
      <AdminPanelClient initialOrders={orders || []} />
      <Footer />
    </>
  );
}
