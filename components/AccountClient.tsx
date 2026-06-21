"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { Order } from "@/lib/types";

interface LoyaltyTier {
  id: string;
  name: string;
  required_points: number;
  discount_percentage: number;
}

export default function AccountClient() {
  const { user, profile, isAdmin, isLoading, signOut } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [tiers, setTiers] = useState<LoyaltyTier[]>([]);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/account/login");
    }
  }, [user, isLoading, router]);

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
            <h2 className="font-headline-md text-headline-sm uppercase tracking-tight">Available Rewards</h2>
            <p className="text-sm text-on-surface-variant max-w-md">
              Earn points with every purchase. Redeem points at checkout for discounts. Your points reset to zero after redemption.
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
                      <p className="font-label-caps text-xs text-on-surface-variant uppercase tracking-wider mb-1">Cost</p>
                      <p className={`font-mono text-lg font-bold ${canAfford ? 'text-primary' : 'text-on-surface-variant'}`}>{tier.required_points} pts</p>
                    </div>
                    <div className="text-right">
                      <p className="font-label-caps text-xs text-on-surface-variant uppercase tracking-wider mb-1">Discount</p>
                      <p className="font-headline-sm text-secondary">{tier.discount_percentage}% OFF</p>
                    </div>
                  </div>
                  {canAfford && (
                    <div className="mt-4 pt-4 border-t border-primary/20">
                      <p className="text-xs text-primary font-bold uppercase tracking-wider text-center">Unlocked for next checkout</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-gutter mb-stack-lg">
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
        <div className="bg-surface-container-low border border-surface-variant p-5 text-center col-span-2 md:col-span-1">
          <p className="font-display-xl text-headline-lg text-primary">
            {orders.reduce((sum, o) => sum + (o.order_items?.length ?? 0), 0)}
          </p>
          <p className="font-label-caps text-label-caps text-on-surface-variant mt-1">Items Purchased</p>
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
