import React, { Suspense } from 'react';
import PaymentCallbackClient from '@/components/PaymentCallbackClient';
import TopNavBar from '@/components/TopNavBar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Payment Status | Chill Co.',
  description: 'Payment verification status.',
};

export default function CheckoutCallbackPage() {
  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50">
        <TopNavBar />
      </header>
      <Suspense fallback={<div className="min-h-screen pt-[120px] text-center font-body-md text-on-surface-variant">Loading...</div>}>
        <PaymentCallbackClient />
      </Suspense>
      <Footer />
    </>
  );
}
