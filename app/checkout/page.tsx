import React from 'react';
import CheckoutClient from '@/components/CheckoutClient';
import TopNavBar from '@/components/TopNavBar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Checkout | Chill Co.',
  description: 'Complete your purchase.',
};

export default function CheckoutPage() {
  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50">
        <TopNavBar />
      </header>
      <CheckoutClient />
      <Footer />
    </>
  );
}
