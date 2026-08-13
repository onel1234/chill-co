"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/lib/context/CartContext';
import { useAuth } from '@/lib/context/AuthContext';

export default function PaymentCallbackClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { clearCart } = useCart();
  const { user, profile } = useAuth();

  const transactionId = searchParams.get('transactionId');
  const orderId = searchParams.get('orderId');
  const statusParam = searchParams.get('status');

  const [status, setStatus] = useState<'loading' | 'success' | 'failure' | 'pending'>('loading');
  const [attempts, setAttempts] = useState(0);
  const [pointsEarned, setPointsEarned] = useState(0);
  const maxAttempts = 10;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!transactionId || !orderId) {
      setStatus('failure');
      return;
    }

    const verifyPayment = async () => {
      try {
        const res = await fetch('/api/payment/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ transactionId, orderId }),
        });
        
        const data = await res.json();
        
        if (data.paymentStatus === 'COMPLETED') {
          setStatus('success');
          setPointsEarned(data.pointsEarned || 0);
          await clearCart();
        } else if (data.paymentStatus === 'PENDING') {
          setStatus('pending');
        } else {
          setStatus('failure');
        }
      } catch (error) {
        console.error('Verification error:', error);
        setStatus('failure');
      }
    };

    if (status === 'loading' || status === 'pending') {
      if (status === 'loading') {
        verifyPayment();
      } else if (status === 'pending') {
        if (attempts < maxAttempts) {
          timeoutRef.current = setTimeout(() => {
            setAttempts(prev => prev + 1);
            verifyPayment();
          }, 3000);
        } else {
          setStatus('failure');
        }
      }
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [transactionId, orderId, status, attempts, clearCart]);

  if (status === 'loading' || status === 'pending') {
    return (
      <main className="pt-[120px] pb-section-gap px-margin-mobile md:px-margin-desktop min-h-[70vh] flex flex-col items-center justify-center text-center">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mb-6"></div>
        <h1 className="font-headline-lg text-headline-lg text-primary uppercase tracking-tighter mb-4">
          Verifying Payment
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md mb-2">
          {status === 'pending' ? `Still checking... (Attempt ${attempts + 1}/${maxAttempts})` : 'Please wait while we confirm your transaction...'}
        </p>
      </main>
    );
  }

  if (status === 'success') {
    return (
      <main className="pt-[120px] pb-section-gap px-margin-mobile md:px-margin-desktop min-h-[70vh] flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-4xl">check_circle</span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-primary uppercase tracking-tighter mb-4">Order Confirmed</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md mb-2">
          Thank you for your purchase. Your chill is on the way.
        </p>
        
        {user && profile?.is_loyalty_member && pointsEarned > 0 && (
          <div className="bg-primary/5 text-primary border border-primary/20 px-6 py-4 rounded-full inline-block mt-4 mb-6">
            <span className="font-label-caps text-sm uppercase tracking-widest">+ {pointsEarned} Loyalty Points Earned!</span>
          </div>
        )}

        {orderId && (
          <p className="font-label-caps text-label-caps text-on-surface-variant mb-8 mt-2">
            Order #{orderId.slice(0, 8).toUpperCase()}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {user && orderId && (
            <Link
              href={`/account/orders/${orderId}`}
              className="bg-surface-container-low border border-surface-variant text-on-surface font-button-text text-button-text uppercase py-4 px-8 hover:border-primary transition-colors"
            >
              View Order
            </Link>
          )}
          <Link
            href="/shop"
            className="bg-primary text-on-primary font-button-text text-button-text uppercase py-4 px-8 hover:bg-primary-container transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  // failure
  return (
    <main className="pt-[120px] pb-section-gap px-margin-mobile md:px-margin-desktop min-h-[70vh] flex flex-col items-center justify-center text-center">
      <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6">
        <span className="material-symbols-outlined text-4xl">error</span>
      </div>
      <h1 className="font-headline-lg text-headline-lg text-primary uppercase tracking-tighter mb-4">Payment Failed</h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md mb-8">
        We couldn't verify your payment. It might have been declined or timed out.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href="/checkout"
          className="bg-primary text-on-primary font-button-text text-button-text uppercase py-4 px-8 hover:bg-primary-container transition-colors"
        >
          Try Again
        </Link>
      </div>
    </main>
  );
}
