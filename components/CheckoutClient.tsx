"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/context/CartContext';

export default function CheckoutClient() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <main className="pt-[120px] pb-section-gap px-margin-mobile md:px-margin-desktop min-h-[70vh] flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
          <span className="material-symbols-outlined text-4xl">check_circle</span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-primary uppercase tracking-tighter mb-4">Order Confirmed</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md mb-8">
          Thank you for your purchase. Your chill is on the way. We&apos;ve sent a confirmation email with your order details.
        </p>
        <Link href="/shop" className="bg-primary text-on-primary font-button-text text-button-text uppercase py-4 px-8 hover:bg-primary-container transition-colors">
          Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="pt-[120px] pb-section-gap px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto min-h-screen">
      <h1 className="font-headline-lg text-headline-lg text-primary uppercase tracking-tighter mb-stack-lg border-b border-surface-variant pb-stack-md">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Left Column: Form */}
        <div className="lg:col-span-7 flex flex-col gap-stack-lg">
          <form onSubmit={handleCheckout} className="space-y-stack-lg">
            
            {/* Contact Information */}
            <section>
              <h2 className="font-headline-sm text-headline-sm uppercase mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <input required type="email" placeholder="Email" className="w-full bg-surface-container-low border border-surface-variant p-4 font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="newsletter" className="w-4 h-4 accent-primary" />
                  <label htmlFor="newsletter" className="font-body-md text-sm text-on-surface-variant">Email me with news and offers</label>
                </div>
              </div>
            </section>

            {/* Shipping Address */}
            <section>
              <h2 className="font-headline-sm text-headline-sm uppercase mb-4">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <select className="w-full bg-surface-container-low border border-surface-variant p-4 font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all appearance-none">
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                  </select>
                </div>
                <div>
                  <input required type="text" placeholder="First name" className="w-full bg-surface-container-low border border-surface-variant p-4 font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
                </div>
                <div>
                  <input required type="text" placeholder="Last name" className="w-full bg-surface-container-low border border-surface-variant p-4 font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
                </div>
                <div className="col-span-2">
                  <input required type="text" placeholder="Address" className="w-full bg-surface-container-low border border-surface-variant p-4 font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
                </div>
                <div className="col-span-2">
                  <input type="text" placeholder="Apartment, suite, etc. (optional)" className="w-full bg-surface-container-low border border-surface-variant p-4 font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
                </div>
                <div>
                  <input required type="text" placeholder="City" className="w-full bg-surface-container-low border border-surface-variant p-4 font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input required type="text" placeholder="State" className="w-full bg-surface-container-low border border-surface-variant p-4 font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
                  <input required type="text" placeholder="ZIP code" className="w-full bg-surface-container-low border border-surface-variant p-4 font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" />
                </div>
              </div>
            </section>

            <button 
              type="submit" 
              disabled={items.length === 0 || isProcessing}
              className="w-full bg-primary text-on-primary font-button-text text-button-text uppercase py-5 hover:bg-primary-container transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              {isProcessing ? 'Processing...' : 'Complete Order'}
              {!isProcessing && <span className="material-symbols-outlined">arrow_forward</span>}
            </button>
          </form>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5 mt-stack-xl lg:mt-0">
          <div className="bg-surface-container-low p-stack-lg border border-surface-variant sticky top-[120px]">
            <h2 className="font-headline-sm text-headline-sm uppercase mb-stack-md border-b border-surface-variant pb-4">Order Summary</h2>
            
            {items.length === 0 ? (
              <div className="py-8 text-center text-on-surface-variant">
                <p>Your bag is empty.</p>
                <Link href="/shop" className="text-primary underline mt-2 inline-block font-label-caps uppercase">Continue Shopping</Link>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Items */}
                <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative w-20 h-24 flex-shrink-0 bg-surface">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        <span className="absolute -top-2 -right-2 bg-on-surface text-surface text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 flex flex-col">
                        <h3 className="font-body-md text-sm font-medium uppercase leading-tight">{item.name}</h3>
                        <p className="font-body-md text-xs text-on-surface-variant mt-1">{item.color} / {item.size}</p>
                        <div className="mt-auto flex justify-between items-center">
                          <div className="flex border border-surface-variant items-center">
                            <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 text-on-surface-variant hover:text-primary">-</button>
                            <span className="px-2 text-xs">{item.quantity}</span>
                            <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 text-on-surface-variant hover:text-primary">+</button>
                          </div>
                          <button type="button" onClick={() => removeFromCart(item.id)} className="text-xs text-tertiary underline">Remove</button>
                        </div>
                      </div>
                      <div className="text-sm font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="border-t border-surface-variant pt-6 space-y-4">
                  <div className="flex justify-between font-body-md text-on-surface-variant">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-body-md text-on-surface-variant">
                    <span>Shipping</span>
                    <span>{totalPrice >= 100 ? 'Free' : '$10.00'}</span>
                  </div>
                  <div className="flex justify-between font-headline-sm text-headline-sm uppercase pt-4 border-t border-surface-variant">
                    <span>Total</span>
                    <span>${(totalPrice + (totalPrice >= 100 || items.length === 0 ? 0 : 10)).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
