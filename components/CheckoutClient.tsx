"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/context/CartContext';
import { useAuth } from '@/lib/context/AuthContext';
import { createClient } from '@/lib/supabase/client';

export default function CheckoutClient() {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const { user, profile } = useAuth();
  
  const [step, setStep] = useState<1 | 2>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  
  // Form State
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [shippingAddress, setShippingAddress] = useState({
    country: 'Sri Lanka',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zip: ''
  });
  
  // Loyalty States
  const [availableTiers, setAvailableTiers] = useState<any[]>([]);
  const [appliedTier, setAppliedTier] = useState<{
    id: string;
    name: string;
    discount_percentage: number;
    required_points: number;
  } | null>(null);

  const supabase = createClient();

  useEffect(() => {
    const userEmail = profile?.email || user?.email || (user?.user_metadata?.email as string) || '';
    if (userEmail) {
      setEmail(userEmail);
    }

    const fullName = profile?.full_name || (user?.user_metadata?.full_name as string) || (user?.user_metadata?.name as string) || '';
    if (fullName) {
      const parts = fullName.trim().split(/\s+/);
      const first = parts[0] || '';
      const last = parts.slice(1).join(' ') || '';
      setShippingAddress(prev => ({
        ...prev,
        firstName: prev.firstName || first,
        lastName: prev.lastName || last,
      }));
    }
  }, [profile, user]);

  useEffect(() => {
    const fetchTiers = async () => {
      const { data } = await supabase.from('loyalty_tiers').select('*').order('required_points', { ascending: false });
      if (data) setAvailableTiers(data);
    };
    fetchTiers();
  }, [supabase]);

  const shippingCost = totalPrice >= 15000 || items.length === 0 ? 0 : 350;

  // Apply discount from selected loyalty tier
  const discountAmount = appliedTier
    ? totalPrice * (appliedTier.discount_percentage / 100)
    : 0;

  const orderTotal = totalPrice - discountAmount + shippingCost;

  // Calculate points earned for this order
  const pointsEarned = items.reduce((sum, item) => sum + (item.loyaltyPoints || 0) * item.quantity, 0);

  const handleProceedToCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleCashOnDelivery = async () => {
    setIsProcessing(true);

    const generatedOrderId = crypto.randomUUID();

    const orderData = {
      id: generatedOrderId,
      user_id: user?.id || null, // null for guest checkout
      status: 'pending',
      subtotal: totalPrice - discountAmount,
      shipping: shippingCost,
      total: orderTotal,
      customer_email: email,
      customer_phone: phone,
      shipping_address: shippingAddress
    };

    const { error: orderError } = await supabase
      .from('orders')
      .insert(orderData);

    if (orderError) {
      console.error('Failed to create order:', JSON.stringify(orderError, null, 2));
      setIsProcessing(false);
      return;
    }

    const orderItems = items.map((item) => ({
      order_id: generatedOrderId,
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

    // Update Loyalty Points for logged in members
    if (user && profile) {
      let newTotalPoints = (profile.loyalty_points || 0) + pointsEarned;
      if (appliedTier) {
        // revert their points to 0 since they claimed the discount
        // but add back the points they earned from this new order
        newTotalPoints = pointsEarned;
      }
      await supabase
        .from('profiles')
        .update({ loyalty_points: newTotalPoints })
        .eq('id', user.id);
    }

    // Send order confirmation email asynchronously
    fetch('/api/mail/order-confirmation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        orderId: generatedOrderId,
        items: items,
        total: orderTotal,
      }),
    }).catch(err => console.error('Failed to trigger order confirmation email:', err));

    setOrderId(generatedOrderId);
    await clearCart();
    setIsProcessing(false);
    setIsSuccess(true);
  };

  const handleWhatsAppInquiry = () => {
    const waNumber = "94758441413";
    
    let message = `*NEW ORDER INQUIRY*\n\n`;
    message += `*Customer Details*\n`;
    message += `Name: ${shippingAddress.firstName} ${shippingAddress.lastName}\n`;
    message += `Email: ${email}\n`;
    message += `Phone: ${phone}\n\n`;
    
    message += `*Shipping Address*\n`;
    message += `${shippingAddress.address} ${shippingAddress.apartment ? shippingAddress.apartment + ' ' : ''}\n`;
    message += `${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.zip}\n`;
    message += `${shippingAddress.country}\n\n`;
    
    message += `*Order Items*\n`;
    items.forEach(item => {
      message += `- ${item.quantity}x ${item.name} (${item.color}, ${item.size}) - Rs. ${(item.price * item.quantity).toLocaleString('en-LK')}\n`;
    });
    
    message += `\n*Totals*\n`;
    message += `Subtotal: Rs. ${(totalPrice - discountAmount).toLocaleString('en-LK')}\n`;
    message += `Shipping: ${shippingCost === 0 ? 'Free' : `Rs. ${shippingCost.toLocaleString('en-LK')}`}\n`;
    message += `*Total: Rs. ${orderTotal.toLocaleString('en-LK')}*`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${waNumber}?text=${encodedMessage}`, '_blank');
  };

  const handleOnlinePayment = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/payment/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          email,
          phone,
          shippingAddress,
          appliedTier,
          discountAmount,
          userId: user?.id || null,
          totalPrice,
          shippingCost,
          orderTotal
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Payment creation failed');
      }
      
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        throw new Error('No payment URL received');
      }
    } catch (error) {
      console.error('Online payment error:', error);
      alert(error instanceof Error ? error.message : 'Failed to initiate payment');
      setIsProcessing(false);
    }
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
      {!user && step === 1 && (
        <div className="mb-stack-lg p-4 bg-primary/5 border border-primary/20 flex items-center gap-4">
          <span className="material-symbols-outlined text-primary">person</span>
          <p className="font-body-md text-sm text-on-surface flex-1">
            <Link href="/account/login" className="text-primary font-semibold hover:underline">Sign in</Link>
            {" "}to save your order history and earn loyalty points.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Left Column: Form / Payment Options */}
        <div className="lg:col-span-7 flex flex-col gap-stack-lg">
          {step === 1 ? (
            <form onSubmit={handleProceedToCheckout} className="space-y-stack-lg">
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
                  <div>
                    <input
                      required
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone Number"
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
                  <div>
                    <input 
                      required 
                      type="text" 
                      value={shippingAddress.firstName}
                      onChange={(e) => setShippingAddress({...shippingAddress, firstName: e.target.value})}
                      placeholder="First name" 
                      className="w-full bg-surface-container-low border border-surface-variant p-4 font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" 
                    />
                  </div>
                  <div>
                    <input 
                      required 
                      type="text" 
                      value={shippingAddress.lastName}
                      onChange={(e) => setShippingAddress({...shippingAddress, lastName: e.target.value})}
                      placeholder="Last name" 
                      className="w-full bg-surface-container-low border border-surface-variant p-4 font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" 
                    />
                  </div>
                  <div className="col-span-2">
                    <input 
                      required 
                      type="text" 
                      value={shippingAddress.address}
                      onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
                      placeholder="Address" 
                      className="w-full bg-surface-container-low border border-surface-variant p-4 font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" 
                    />
                  </div>
                  <div className="col-span-2">
                    <input 
                      type="text" 
                      value={shippingAddress.apartment}
                      onChange={(e) => setShippingAddress({...shippingAddress, apartment: e.target.value})}
                      placeholder="Apartment, suite, etc. (optional)" 
                      className="w-full bg-surface-container-low border border-surface-variant p-4 font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" 
                    />
                  </div>
                  <div>
                    <input 
                      required 
                      type="text" 
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                      placeholder="City" 
                      className="w-full bg-surface-container-low border border-surface-variant p-4 font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      required 
                      type="text" 
                      value={shippingAddress.state}
                      onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})}
                      placeholder="State" 
                      className="w-full bg-surface-container-low border border-surface-variant p-4 font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" 
                    />
                    <input 
                      required 
                      type="text" 
                      value={shippingAddress.zip}
                      onChange={(e) => setShippingAddress({...shippingAddress, zip: e.target.value})}
                      placeholder="ZIP code" 
                      className="w-full bg-surface-container-low border border-surface-variant p-4 font-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" 
                    />
                  </div>
                </div>
              </section>

              <button
                type="submit"
                disabled={items.length === 0}
                className="w-full bg-primary text-on-primary font-button-text text-button-text uppercase py-5 hover:bg-primary-container transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
              >
                Proceed to Checkout
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </form>
          ) : (
            <div className="space-y-stack-lg">
              <section className="bg-surface-container-lowest border border-surface-variant p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="font-headline-sm text-headline-sm uppercase">Review Details</h2>
                  <button onClick={() => setStep(1)} className="text-primary underline text-sm uppercase font-label-caps">Edit</button>
                </div>
                <div className="space-y-2 font-body-md text-sm text-on-surface-variant">
                  <p><strong>Contact:</strong> {email} | {phone}</p>
                  <p><strong>Ship to:</strong> {shippingAddress.firstName} {shippingAddress.lastName}</p>
                  <p>{shippingAddress.address} {shippingAddress.apartment}</p>
                  <p>{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zip}, {shippingAddress.country}</p>
                </div>
              </section>

              <section>
                <h2 className="font-headline-sm text-headline-sm uppercase mb-4">Payment Method</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <button
                    onClick={handleCashOnDelivery}
                    disabled={isProcessing}
                    className="flex flex-col items-center justify-center p-6 border-2 border-primary bg-primary/5 hover:bg-primary/10 transition-colors disabled:opacity-50 gap-2"
                  >
                    <span className="material-symbols-outlined text-4xl text-primary">local_shipping</span>
                    <span className="font-button-text text-button-text uppercase text-primary">Cash on Delivery</span>
                    {isProcessing && <span className="text-xs">Processing...</span>}
                  </button>

                  <button
                    onClick={handleOnlinePayment}
                    disabled={isProcessing}
                    className="flex flex-col items-center justify-center p-6 border-2 border-[#0b6fcc] bg-[#0b6fcc]/5 hover:bg-[#0b6fcc]/10 transition-colors disabled:opacity-50 gap-2"
                  >
                    <span className="material-symbols-outlined text-4xl text-[#0b6fcc]">credit_card</span>
                    <span className="font-button-text text-button-text uppercase text-[#0b6fcc]">Pay Online</span>
                    {isProcessing && <span className="text-xs text-[#0b6fcc]">Processing...</span>}
                  </button>

                  <button
                    onClick={handleWhatsAppInquiry}
                    disabled={isProcessing}
                    className="flex flex-col items-center justify-center p-6 border-2 border-[#25D366] bg-[#25D366]/5 hover:bg-[#25D366]/10 transition-colors disabled:opacity-50 gap-2"
                  >
                    <svg className="w-10 h-10 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.031 0C5.385 0 0 5.386 0 12.03c0 2.128.552 4.195 1.6 6.012L.156 23.366l5.46-1.433a11.96 11.96 0 006.415 1.84h.005c6.645 0 12.031-5.387 12.031-12.034C24.067 5.385 18.675 0 12.031 0zm0 21.782h-.005a9.92 9.92 0 01-5.068-1.385l-.364-.216-3.77.99.998-3.682-.236-.375A9.962 9.962 0 012.062 12.03c0-5.508 4.484-9.992 9.97-9.992s9.968 4.484 9.968 9.992-4.485 9.99-9.969 9.99zm5.474-7.483c-.3-.15-1.776-.877-2.052-.977-.275-.1-.475-.15-.675.15-.2.3-.775.977-.95 1.176-.175.2-.35.226-.65.076-.3-.15-1.268-.467-2.417-1.49-.893-.794-1.496-1.776-1.67-2.076-.176-.3-.018-.462.132-.612.135-.135.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.626-.925-2.226-.24-.585-.487-.506-.675-.515-.175-.01-.375-.01-.575-.01s-.525.075-.8.375c-.275.3-1.05 1.026-1.05 2.502s1.075 2.898 1.225 3.098c.15.2 2.115 3.226 5.115 4.526.714.31 1.272.495 1.706.635.717.228 1.368.196 1.884.119.58-.087 1.776-.726 2.026-1.426.25-.7.25-1.302.175-1.426-.075-.125-.275-.2-.575-.35z"/>
                    </svg>
                    <span className="font-button-text text-button-text uppercase text-[#25D366]">Inquire on WhatsApp</span>
                  </button>
                </div>
              </section>
            </div>
          )}
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
                        {step === 1 && (
                          <div className="mt-auto flex justify-between items-center">
                            <div className="flex border border-surface-variant items-center">
                              <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 text-on-surface-variant hover:text-primary">-</button>
                              <span className="px-2 text-xs">{item.quantity}</span>
                              <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 text-on-surface-variant hover:text-primary">+</button>
                            </div>
                            <button type="button" onClick={() => removeFromCart(item.id)} className="text-xs text-tertiary underline">Remove</button>
                          </div>
                        )}
                      </div>
                      <div className="text-sm font-medium">
                        Rs. {(item.price * item.quantity).toLocaleString('en-LK')}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Loyalty Discount Section */}
                {step === 1 && profile?.is_loyalty_member && availableTiers.length > 0 && (
                  <div className="border border-surface-variant p-4 bg-surface-container-lowest">
                    <p className="font-headline-sm text-xs uppercase tracking-wider text-on-surface mb-3 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm text-primary">loyalty</span>
                      Loyalty Rewards
                    </p>
                    {appliedTier ? (
                      <div className="flex items-center justify-between bg-primary/5 border border-primary/30 px-3 py-2">
                        <div>
                          <p className="font-mono text-sm font-bold text-primary tracking-wider">{appliedTier.name} Applied</p>
                          <p className="font-label-caps text-[10px] text-secondary uppercase tracking-wider mt-0.5">
                            {appliedTier.discount_percentage}% OFF (uses {appliedTier.required_points} points)
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setAppliedTier(null)}
                          className="text-on-surface-variant hover:text-error transition-colors"
                        >
                          <span className="material-symbols-outlined text-sm">close</span>
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <p className="text-xs text-on-surface-variant">You have <span className="font-bold text-primary">{profile.loyalty_points || 0}</span> points.</p>
                        {(() => {
                          const eligibleTiers = availableTiers.filter(t => (profile.loyalty_points || 0) >= t.required_points);
                          if (eligibleTiers.length > 0) {
                            const bestTier = eligibleTiers[0];
                            return (
                              <button
                                type="button"
                                onClick={() => setAppliedTier(bestTier)}
                                className="bg-primary text-on-primary font-button-text text-xs uppercase tracking-widest py-2 px-4 hover:opacity-90 transition-opacity flex justify-center w-full"
                              >
                                Claim {bestTier.name} (-{bestTier.discount_percentage}%)
                              </button>
                            );
                          } else {
                            const nextTier = [...availableTiers].reverse().find(t => (profile.loyalty_points || 0) < t.required_points);
                            if (nextTier) {
                              return <p className="text-xs text-on-surface-variant">Earn <span className="font-bold text-primary">{nextTier.required_points - (profile.loyalty_points || 0)}</span> more points to unlock the {nextTier.name} discount.</p>;
                            }
                            return null;
                          }
                        })()}
                      </div>
                    )}
                  </div>
                )}

                {/* Totals */}
                <div className="border-t border-surface-variant pt-6 space-y-4">
                  <div className="flex justify-between font-body-md text-on-surface-variant">
                    <span>Subtotal</span>
                    <span>Rs. {totalPrice.toLocaleString('en-LK')}</span>
                  </div>
                  {appliedTier && discountAmount > 0 && (
                    <div className="flex justify-between font-body-md text-secondary">
                      <span>Loyalty Discount (-{appliedTier.discount_percentage}%)</span>
                      <span>-Rs. {discountAmount.toLocaleString('en-LK')}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-body-md text-on-surface-variant">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? 'Free' : `Rs. ${shippingCost.toLocaleString('en-LK')}`}</span>
                  </div>
                  <div className="flex justify-between font-headline-sm text-headline-sm uppercase pt-4 border-t border-surface-variant">
                    <span>Total</span>
                    <span>Rs. {orderTotal.toLocaleString('en-LK')}</span>
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
