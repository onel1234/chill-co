"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/context/CartContext';
import { useAuth } from '@/lib/context/AuthContext';
import { createClient } from '@/lib/supabase/client';

interface LoyaltyTier {
  id: string;
  name: string;
  required_points: number;
  discount_percentage: number;
}

export default function CheckoutClient() {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const { user, profile } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [email, setEmail] = useState(profile?.email || user?.email || '');
  
  // Loyalty State
  const [tiers, setTiers] = useState<LoyaltyTier[]>([]);
  const [isRedeemingPoints, setIsRedeemingPoints] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    if (profile?.is_loyalty_member) {
      fetch('/api/loyalty/tiers')
        .then(res => res.json())
        .then(data => {
          if (!data.error) setTiers(data);
        });
    }
  }, [profile]);

  // Find best eligible tier
  const bestTier = tiers
    .filter(t => (profile?.loyalty_points || 0) >= t.required_points)
    .sort((a, b) => b.discount_percentage - a.discount_percentage)[0];

  const shippingCost = totalPrice >= 100 || items.length === 0 ? 0 : 10;
  
  // Apply discount if redeeming
  const discountAmount = isRedeemingPoints && bestTier 
    ? totalPrice * (bestTier.discount_percentage / 100) 
    : 0;

  const orderTotal = totalPrice - discountAmount + shippingCost;

  // Calculate points earned for this order
  const pointsEarned = items.reduce((sum, item) => sum + (item.loyaltyPoints || 0) * item.quantity, 0);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    if (user) {
      // Create order in Supabase
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          status: 'confirmed',
          subtotal: totalPrice - discountAmount,
          shipping: shippingCost,
          total: orderTotal,
        })
        .select()
        .single();

      if (orderError || !order) {
        console.error('Failed to create order:', orderError);
        setIsProcessing(false);
        return;
      }

      // Insert order items
      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.productId,
        name: item.name,
        price: item.price,
        image: item.image,
        color: item.color,
        size: item.size,
        quantity: item.quantity,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) {
        console.error('Failed to insert order items:', itemsError);
      }

      // Update Loyalty Points
      if (profile) {
        const newTotalPoints = isRedeemingPoints 
          ? pointsEarned 
          : (profile.loyalty_points || 0) + pointsEarned;
          
        await supabase
          .from('profiles')
          .update({ loyalty_points: newTotalPoints })
          .eq('id', user.id);
      }

      setOrderId(order.id);
      await clearCart();
    } else {
      // Guest checkout — just simulate
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }

    setIsProcessing(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
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

  return (
    <main className="pt-[120px] pb-section-gap px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto min-h-screen">
      <h1 className="font-headline-lg text-headline-lg text-primary uppercase tracking-tighter mb-stack-lg border-b border-surface-variant pb-stack-md">
        Checkout
      </h1>

      {/* Guest prompt */}
      {!user && (
        <div className="mb-stack-lg p-4 bg-primary/5 border border-primary/20 flex items-center gap-4">
          <span className="material-symbols-outlined text-primary">person</span>
          <p className="font-body-md text-sm text-on-surface flex-1">
            <Link href="/account/login" className="text-primary font-semibold hover:underline">Sign in</Link>
            {" "}to save your order history and earn loyalty points.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Left Column: Form */}
        <div className="lg:col-span-7 flex flex-col gap-stack-lg">
          <form onSubmit={handleCheckout} className="space-y-stack-lg">
            
            {/* Contact Information */}
            <section>
              <h2 className="font-headline-sm text-headline-sm uppercase mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full bg-surface-container-low border border-surface-variant p-4 font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                  />
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
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Complete Order
                  <span className="material-symbols-outlined">arrow_forward</span>
                </>
              )}
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
                <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 scrollbar-hide">
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

                {/* Loyalty Banner */}
                {profile?.is_loyalty_member && (
                  <div className="border border-surface-variant p-4 bg-surface-container-lowest">
                    {bestTier ? (
                      <div className="flex flex-col gap-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-headline-sm text-sm text-primary uppercase flex items-center gap-1">
                              <span className="material-symbols-outlined text-[16px]">loyalty</span>
                              Loyalty Discount Available!
                            </p>
                            <p className="font-body-md text-xs text-on-surface-variant mt-1">
                              You have <span className="font-bold">{profile.loyalty_points}</span> points.
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setIsRedeemingPoints(!isRedeemingPoints)}
                            className={`font-label-caps text-xs uppercase px-3 py-1.5 transition-colors border ${
                              isRedeemingPoints 
                                ? 'bg-primary text-on-primary border-primary' 
                                : 'text-primary border-primary hover:bg-primary/10'
                            }`}
                          >
                            {isRedeemingPoints ? 'Remove' : 'Redeem'}
                          </button>
                        </div>
                        {isRedeemingPoints && (
                          <div className="bg-primary/10 p-2 text-xs text-primary font-mono text-center">
                            {bestTier.name} applied! Points will reset to zero.
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-on-surface-variant">loyalty</span>
                        <div>
                          <p className="font-body-md text-sm text-on-surface-variant">
                            You have <span className="font-bold">{profile.loyalty_points || 0}</span> points.
                          </p>
                          {tiers.length > 0 && (
                            <p className="font-body-md text-xs text-on-surface-variant mt-1">
                              {tiers[0].required_points - (profile.loyalty_points || 0)} more points to unlock a discount.
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Totals */}
                <div className="border-t border-surface-variant pt-6 space-y-4">
                  <div className="flex justify-between font-body-md text-on-surface-variant">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  {isRedeemingPoints && discountAmount > 0 && (
                    <div className="flex justify-between font-body-md text-secondary">
                      <span>Loyalty Discount (-{bestTier?.discount_percentage}%)</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-body-md text-on-surface-variant">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between font-headline-sm text-headline-sm uppercase pt-4 border-t border-surface-variant">
                    <span>Total</span>
                    <span>${orderTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Points Earned Predictor */}
                {profile?.is_loyalty_member && pointsEarned > 0 && (
                  <div className="text-center border-t border-surface-variant pt-4">
                    <p className="font-label-caps text-xs text-on-surface-variant uppercase tracking-widest">
                      You will earn <span className="text-primary font-bold">{pointsEarned}</span> points
                    </p>
                  </div>
                )}

              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
