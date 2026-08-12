"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { Order, AffiliateCode, AffiliateSettings } from "@/lib/types";

interface LoyaltyTier {
  id: string;
  name: string;
  required_points: number;
  discount_percentage: number;
}

interface ClaimedCoupon {
  code: string;
  tier_name: string;
  discount_percentage: number;
}

export default function AccountClient() {
  const { user, profile, isAdmin, isLoading, signOut, refreshProfile } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [tiers, setTiers] = useState<LoyaltyTier[]>([]);
  const [showTierChart, setShowTierChart] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  // Affiliate state
  const [affiliateCodes, setAffiliateCodes] = useState<AffiliateCode[]>([]);
  const [affiliateSettings, setAffiliateSettings] = useState<AffiliateSettings | null>(null);
  const [affiliateStats, setAffiliateStats] = useState<{ total_referrals: number; total_points_earned: number } | null>(null);
  const [newCode, setNewCode] = useState("");
  const [codeError, setCodeError] = useState<string | null>(null);
  const [codeSuccess, setCodeSuccess] = useState<string | null>(null);
  const [isCreatingCode, setIsCreatingCode] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/account/login");
    }
  }, [user, isLoading, router]);

  const fetchOrders = async () => {
    setOrdersLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*, order_items(*)")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setOrders(data as Order[]);
    }
    setOrdersLoading(false);
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (profile?.is_loyalty_member) {
      fetch('/api/loyalty/tiers')
        .then(res => res.json())
        .then(data => {
          if (!data.error) setTiers(data);
        });
    }
  }, [profile?.is_loyalty_member]);

  // Fetch affiliate data
  const fetchAffiliateData = useCallback(async () => {
    const [codesRes, statsRes, settingsRes] = await Promise.all([
      fetch('/api/affiliate/my-codes'),
      fetch('/api/affiliate/stats'),
      fetch('/api/affiliate/settings'),
    ]);
    const codesData = await codesRes.json();
    const statsData = await statsRes.json();
    const settingsData = await settingsRes.json();
    if (!codesData.error) setAffiliateCodes(codesData);
    if (!statsData.error) setAffiliateStats(statsData);
    if (!settingsData.error) setAffiliateSettings(settingsData);
  }, []);

  useEffect(() => {
    if (user) {
      fetchAffiliateData();
    }
  }, [user, fetchAffiliateData]);

  const handleCreateCode = async () => {
    setCodeError(null);
    setCodeSuccess(null);
    const trimmed = newCode.trim();
    if (!trimmed) {
      setCodeError("Please enter a code.");
      return;
    }
    if (!/^[A-Za-z0-9]{4,20}$/.test(trimmed)) {
      setCodeError("Code must be 4–20 alphanumeric characters.");
      return;
    }
    setIsCreatingCode(true);
    try {
      const res = await fetch('/api/affiliate/create-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: trimmed }),
      });
      const data = await res.json();
      if (!res.ok) {
        setCodeError(data.error || 'Failed to create code.');
      } else {
        setCodeSuccess(`Code "${data.code}" created!`);
        setNewCode("");
        fetchAffiliateData();
      }
    } catch {
      setCodeError('Something went wrong.');
    }
    setIsCreatingCode(false);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getShareableLink = (code: string) => {
    const base = typeof window !== 'undefined' ? window.location.origin : 'https://chillco.store';
    return `${base}/account/signup?ref=${code}`;
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "text-secondary bg-secondary-container/30 border border-secondary/20";
      case "shipped": return "text-primary bg-primary/10 border border-primary/20";
      case "delivered": return "text-primary bg-primary/20 border border-primary/30";
      default: return "text-on-surface-variant bg-surface-container";
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-surface-variant border-t-primary rounded-full animate-spin" />
      </main>
    );
  }

  if (!user) return null;

  const displayName = profile?.full_name || user.email?.split("@")[0] || "Chiller";
  const initials = displayName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <main className="pt-[120px] pb-section-gap px-margin-mobile md:px-margin-desktop max-w-5xl mx-auto min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-stack-lg border-b border-surface-variant pb-stack-md">
        <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary uppercase tracking-tighter">
          My Account
        </h1>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 font-button-text text-button-text uppercase text-on-surface-variant hover:text-primary transition-colors border border-surface-variant px-4 py-2 hover:border-primary self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-[18px]">logout</span>
          Sign Out
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter mb-stack-lg">
        {/* Profile Card */}
        <div className={`col-span-1 ${profile?.is_loyalty_member ? 'md:col-span-8' : 'md:col-span-12'} bg-surface-container-low border border-surface-variant p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5 h-full`}>
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            {profile?.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={displayName}
                className="w-16 h-16 rounded-full object-cover border-2 border-surface-variant"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-orange flex items-center justify-center text-white font-headline-md text-headline-md">
                {initials}
              </div>
            )}
            {isAdmin && (
              <span className="absolute -bottom-1 -right-1 bg-primary text-on-primary text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                ADMIN
              </span>
            )}
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-headline-md text-headline-sm uppercase tracking-tight">
                {displayName}
              </h2>
              {isAdmin && (
                <span className="font-label-caps text-label-caps bg-primary/10 text-primary border border-primary/20 px-2 py-0.5">
                  Admin
                </span>
              )}
            </div>
            <p className="font-body-md text-sm text-on-surface-variant mt-1">{user.email}</p>
            <p className="font-label-caps text-label-caps text-on-surface-variant/60 mt-1">
              Member since {profile?.created_at ? formatDate(profile.created_at) : "—"}
            </p>
          </div>
        </div>

        {/* Loyalty Points Summary (if member) */}
        {profile?.is_loyalty_member && (
          <div className="col-span-1 md:col-span-4 bg-primary/5 border border-primary/20 p-6 flex flex-col justify-center text-center relative overflow-hidden group">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
            <span className="material-symbols-outlined text-primary mb-2 relative z-10">loyalty</span>
            <p className="font-display-xl text-headline-lg text-primary relative z-10">{profile.loyalty_points || 0}</p>
            <p className="font-label-caps text-label-caps text-primary/80 mt-1 relative z-10 uppercase tracking-widest">Loyalty Points</p>
          </div>
        )}
      </div>

      {/* Loyalty Tiers (if member) */}
      {profile?.is_loyalty_member && tiers.length > 0 && (
        <div className="mb-stack-lg border-t border-surface-variant pt-stack-lg">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2">
              <h2 className="font-headline-md text-headline-sm uppercase tracking-tight">Available Rewards</h2>
              <button
                onClick={() => setShowTierChart(true)}
                title="View loyalty program details"
                className="w-6 h-6 rounded-full border border-surface-variant text-on-surface-variant hover:border-primary hover:text-primary transition-colors flex items-center justify-center text-xs font-bold"
              >
                i
              </button>
            </div>
            <p className="text-sm text-on-surface-variant max-w-md">
              As a loyalty member, you earn points on every purchase. Reach higher tiers to unlock exclusive discounts available directly at checkout.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-gutter">
            {tiers.map((tier) => {
              const canAfford = (profile.loyalty_points || 0) >= tier.required_points;
              return (
                <div key={tier.id} className={`border p-5 transition-colors ${canAfford ? 'border-primary bg-primary/5' : 'border-surface-variant bg-surface-container-lowest opacity-70'}`}>
                  <h3 className="font-headline-sm text-on-surface mb-2">{tier.name}</h3>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="font-label-caps text-xs text-on-surface-variant uppercase tracking-wider mb-1">Required</p>
                      <p className={`font-mono text-lg font-bold ${canAfford ? 'text-primary' : 'text-on-surface-variant'}`}>{tier.required_points} pts</p>
                    </div>
                    <div className="text-right">
                      <p className="font-label-caps text-xs text-on-surface-variant uppercase tracking-wider mb-1">Discount</p>
                      <p className="font-headline-sm text-secondary">{tier.discount_percentage}% OFF</p>
                    </div>
                  </div>
                  {canAfford && (
                    <div className="mt-4 pt-4 border-t border-primary/20 text-center">
                      <p className="text-xs text-primary font-bold uppercase tracking-wider">Available at Checkout</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tier Chart Modal */}
      {showTierChart && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => setShowTierChart(false)}
        >
          <div
            className="bg-surface-container-lowest border border-surface-variant max-w-lg w-full p-6 relative"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">loyalty</span>
                <h2 className="font-headline-md text-headline-sm uppercase tracking-tight">Loyalty Program</h2>
              </div>
              <button onClick={() => setShowTierChart(false)} className="text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <p className="text-sm text-on-surface-variant mb-5">
              As a loyalty member, you earn points on every purchase. Reach higher tiers to unlock exclusive discounts available directly at checkout.
            </p>

            {/* Current Points */}
            <div className="bg-primary/5 border border-primary/20 p-4 flex items-center justify-between mb-5">
              <span className="font-label-caps text-xs uppercase text-on-surface-variant tracking-wider">Your Current Points</span>
              <span className="font-mono text-2xl font-bold text-primary">{profile?.loyalty_points || 0}</span>
            </div>

            {/* Tier Progression */}
            <div className="space-y-3">
              {tiers.map((tier, idx) => {
                const achieved = (profile?.loyalty_points || 0) >= tier.required_points;
                return (
                  <div key={tier.id} className={`relative flex items-center gap-4 p-3 border transition-colors ${
                    achieved ? 'border-primary bg-primary/5' : 'border-surface-variant'
                  }`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      achieved ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant'
                    }`}>
                      {achieved
                        ? <span className="material-symbols-outlined text-sm">check</span>
                        : <span className="font-mono text-xs">{idx + 1}</span>
                      }
                    </div>
                    <div className="flex-1">
                      <p className={`font-headline-sm text-sm ${achieved ? 'text-primary' : 'text-on-surface-variant'}`}>{tier.name}</p>
                      <p className="font-label-caps text-xs text-on-surface-variant uppercase">{tier.required_points} points required</p>
                    </div>
                    <span className={`font-headline-sm text-sm ${achieved ? 'text-secondary' : 'text-on-surface-variant/50'}`}>
                      {tier.discount_percentage}% OFF
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Affiliate Program Section */}
      {user && (
        <div className="mb-stack-lg border-t border-surface-variant pt-stack-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">handshake</span>
              <h2 className="font-headline-md text-headline-sm uppercase tracking-tight">Affiliate Program</h2>
            </div>
            {affiliateSettings && (
              <p className="text-sm text-on-surface-variant">
                Earn <span className="text-primary font-bold">{affiliateSettings.points_per_referral} points</span> for every friend who signs up with your code
              </p>
            )}
          </div>

          {/* Affiliate Stats */}
          {affiliateStats && (affiliateStats.total_referrals > 0) && (
            <div className="grid grid-cols-2 gap-gutter mb-6">
              <div className="bg-primary/5 border border-primary/20 p-5 text-center">
                <p className="font-display-xl text-headline-lg text-primary">{affiliateStats.total_referrals}</p>
                <p className="font-label-caps text-label-caps text-primary/80 mt-1">Referrals</p>
              </div>
              <div className="bg-primary/5 border border-primary/20 p-5 text-center">
                <p className="font-display-xl text-headline-lg text-primary">{affiliateStats.total_points_earned}</p>
                <p className="font-label-caps text-label-caps text-primary/80 mt-1">Points Earned</p>
              </div>
            </div>
          )}

          {/* Create Code */}
          <div className="bg-surface-container-lowest border border-surface-variant p-5 mb-4">
            <p className="font-label-caps text-label-caps text-on-surface-variant mb-3">Create Your Referral Code</p>
            <div className="flex gap-3">
              <input
                type="text"
                value={newCode}
                onChange={(e) => { setNewCode(e.target.value.toUpperCase()); setCodeError(null); setCodeSuccess(null); }}
                placeholder="e.g. JOHN2024"
                maxLength={20}
                className="flex-1 bg-surface-container-low border border-surface-variant p-3 font-mono text-sm uppercase focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/50"
              />
              <button
                onClick={handleCreateCode}
                disabled={isCreatingCode || !newCode.trim()}
                className="bg-primary text-on-primary font-button-text text-button-text uppercase px-5 py-3 hover:bg-primary-container active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isCreatingCode ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <span className="material-symbols-outlined text-[18px]">add</span>
                )}
                Create
              </button>
            </div>
            {codeError && (
              <p className="text-sm text-error mt-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">error</span>
                {codeError}
              </p>
            )}
            {codeSuccess && (
              <p className="text-sm text-secondary mt-2 flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                {codeSuccess}
              </p>
            )}
            {affiliateSettings && (
              <p className="text-xs text-on-surface-variant/60 mt-2">
                {affiliateCodes.length} / {affiliateSettings.max_codes_per_user} codes used · 4–20 alphanumeric characters
              </p>
            )}
          </div>

          {/* My Codes */}
          {affiliateCodes.length > 0 && (
            <div className="space-y-3">
              {affiliateCodes.map((ac) => (
                <div
                  key={ac.id}
                  className={`border p-4 transition-colors ${
                    ac.is_active ? 'border-surface-variant bg-surface-container-lowest' : 'border-surface-variant/50 bg-surface-container-lowest/50 opacity-60'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-lg font-bold text-primary tracking-wider">{ac.code}</span>
                      {!ac.is_active && (
                        <span className="font-label-caps text-[10px] text-on-surface-variant bg-surface-container px-1.5 py-0.5">INACTIVE</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-label-caps text-label-caps text-on-surface-variant">
                        {ac.total_referrals} referral{ac.total_referrals !== 1 ? 's' : ''}
                      </span>
                      <button
                        onClick={() => copyToClipboard(ac.code, `code-${ac.id}`)}
                        className="flex items-center gap-1 text-xs text-on-surface-variant hover:text-primary transition-colors border border-surface-variant px-2 py-1"
                        title="Copy code"
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          {copiedCode === `code-${ac.id}` ? 'check' : 'content_copy'}
                        </span>
                        {copiedCode === `code-${ac.id}` ? 'Copied!' : 'Code'}
                      </button>
                      <button
                        onClick={() => copyToClipboard(getShareableLink(ac.code), `link-${ac.id}`)}
                        className="flex items-center gap-1 text-xs text-on-surface-variant hover:text-primary transition-colors border border-surface-variant px-2 py-1"
                        title="Copy shareable link"
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          {copiedCode === `link-${ac.id}` ? 'check' : 'link'}
                        </span>
                        {copiedCode === `link-${ac.id}` ? 'Copied!' : 'Link'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter mb-stack-lg">
        <div className="bg-surface-container-low border border-surface-variant p-5 text-center">
          <p className="font-display-xl text-headline-lg text-primary">{orders.length}</p>
          <p className="font-label-caps text-label-caps text-on-surface-variant mt-1">Orders</p>
        </div>
        <div className="bg-surface-container-low border border-surface-variant p-5 text-center">
          <p className="font-display-xl text-headline-lg text-primary">
            ${orders.reduce((sum, o) => sum + o.total, 0).toFixed(0)}
          </p>
          <p className="font-label-caps text-label-caps text-on-surface-variant mt-1">Total Spent</p>
        </div>
        <div className="bg-surface-container-low border border-surface-variant p-5 text-center">
          <p className="font-display-xl text-headline-lg text-primary">
            {orders.reduce((sum, o) => sum + (o.order_items?.length ?? 0), 0)}
          </p>
          <p className="font-label-caps text-label-caps text-on-surface-variant mt-1">Items Purchased</p>
        </div>
        <div className="bg-surface-container-low border border-surface-variant p-5 text-center">
          <p className="font-display-xl text-headline-lg text-primary">
            {profile?.loyalty_points || 0}
          </p>
          <p className="font-label-caps text-label-caps text-on-surface-variant mt-1">Loyalty Points</p>
        </div>
      </div>

      {/* Order History */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-headline-md text-headline-sm uppercase tracking-tight">Order History</h2>
          {orders.length > 0 && (
            <span className="font-label-caps text-label-caps text-on-surface-variant">
              {orders.length} order{orders.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {ordersLoading ? (
          <div className="py-16 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-surface-variant border-t-primary rounded-full animate-spin" />
          </div>
        ) : orders.length === 0 ? (
          <div className="py-16 text-center border border-dashed border-surface-variant">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant/40 block mb-4">
              shopping_bag
            </span>
            <p className="font-body-md text-on-surface-variant mb-6">No orders yet. Time to get chill.</p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-primary text-on-primary font-button-text text-button-text uppercase py-3 px-6 hover:bg-primary-container transition-colors"
            >
              Shop Now
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Link
                key={order.id}
                href={`/account/orders/${order.id}`}
                className="block bg-surface-container-lowest border border-surface-variant hover:border-primary transition-all duration-200 p-5 group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  {/* Order Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap mb-2">
                      <span className="font-label-caps text-label-caps text-on-surface-variant">
                        #{order.id.slice(0, 8).toUpperCase()}
                      </span>
                      <span className={`font-label-caps text-label-caps px-2 py-0.5 uppercase ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="font-body-md text-sm text-on-surface-variant">
                      {formatDate(order.created_at)} · {order.order_items?.length ?? 0} item{(order.order_items?.length ?? 0) !== 1 ? "s" : ""}
                    </p>
                    {/* Item thumbnails */}
                    {order.order_items && order.order_items.length > 0 && (
                      <div className="flex gap-2 mt-3">
                        {order.order_items.slice(0, 4).map((item) => (
                          <div
                            key={item.id}
                            className="w-10 h-12 bg-surface-container overflow-hidden flex-shrink-0"
                          >
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                        ))}
                        {(order.order_items?.length ?? 0) > 4 && (
                          <div className="w-10 h-12 bg-surface-container-high flex items-center justify-center flex-shrink-0">
                            <span className="font-label-caps text-[10px] text-on-surface-variant">
                              +{(order.order_items?.length ?? 0) - 4}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Total + Arrow */}
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-headline-sm font-semibold text-on-surface">
                        ${order.total.toFixed(2)}
                      </p>
                      {order.shipping === 0 && (
                        <p className="font-label-caps text-label-caps text-secondary mt-0.5">Free shipping</p>
                      )}
                    </div>
                    <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">
                      chevron_right
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
