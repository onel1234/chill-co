"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { Order } from "@/lib/types";

interface OrderDetailClientProps {
  orderId: string;
}

export default function OrderDetailClient({ orderId }: OrderDetailClientProps) {
  const { user, isLoading } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [orderLoading, setOrderLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/account/login");
    }
  }, [user, isLoading, router]);

  const fetchOrder = useCallback(async () => {
    setOrderLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*, order_items(*)")
      .eq("id", orderId)
      .single();

    if (error || !data) {
      setNotFound(true);
    } else {
      setOrder(data as Order);
    }
    setOrderLoading(false);
  }, [supabase, orderId]);

  useEffect(() => {
    if (user && orderId) {
      fetchOrder();
    }
  }, [user, orderId, fetchOrder]);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "text-secondary bg-secondary-container/30";
      case "shipped": return "text-primary bg-primary/10";
      case "delivered": return "text-primary bg-primary/20";
      default: return "text-on-surface-variant bg-surface-container";
    }
  };

  if (isLoading || orderLoading) {
    return (
      <main className="pt-[120px] min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-surface-variant border-t-primary rounded-full animate-spin" />
      </main>
    );
  }

  if (notFound || !order) {
    return (
      <main className="pt-[120px] pb-section-gap px-margin-mobile md:px-margin-desktop min-h-screen flex flex-col items-center justify-center text-center">
        <span className="material-symbols-outlined text-5xl text-on-surface-variant/30 mb-6">
          search_off
        </span>
        <h1 className="font-headline-lg text-headline-lg-mobile uppercase tracking-tighter text-on-surface mb-4">
          Order Not Found
        </h1>
        <p className="font-body-md text-on-surface-variant mb-8">
          This order doesn&apos;t exist or you don&apos;t have access to it.
        </p>
        <Link
          href="/account"
          className="inline-flex items-center gap-2 bg-primary text-on-primary font-button-text text-button-text uppercase py-3 px-6 hover:bg-primary-container transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Back to Account
        </Link>
      </main>
    );
  }

  return (
    <main className="pt-[120px] pb-section-gap px-margin-mobile md:px-margin-desktop max-w-3xl mx-auto min-h-screen">
      {/* Back link */}
      <Link
        href="/account"
        className="inline-flex items-center gap-1 font-label-caps text-label-caps text-on-surface-variant hover:text-primary transition-colors mb-8"
      >
        <span className="material-symbols-outlined text-[16px]">arrow_back</span>
        Back to Account
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-stack-lg border-b border-surface-variant pb-stack-md">
        <div>
          <h1 className="font-headline-lg text-headline-lg-mobile uppercase tracking-tighter text-primary">
            Order Details
          </h1>
          <p className="font-label-caps text-label-caps text-on-surface-variant mt-1">
            #{order.id.slice(0, 8).toUpperCase()}
          </p>
        </div>
        <span className={`font-label-caps text-label-caps px-3 py-1.5 uppercase self-start ${getStatusColor(order.status)}`}>
          {order.status}
        </span>
      </div>

      {/* Order Meta */}
      <div className="bg-surface-container-low border border-surface-variant p-5 mb-stack-lg">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-label-caps text-label-caps text-on-surface-variant mb-1">Order Date</p>
            <p className="font-body-md text-sm">{formatDate(order.created_at)}</p>
          </div>
          <div>
            <p className="font-label-caps text-label-caps text-on-surface-variant mb-1">Order ID</p>
            <p className="font-body-md text-sm font-mono">{order.id}</p>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="mb-stack-lg">
        <h2 className="font-headline-sm font-semibold uppercase tracking-tight mb-4">
          Items ({order.order_items?.length ?? 0})
        </h2>
        <div className="space-y-4">
          {order.order_items?.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 bg-surface-container-lowest border border-surface-variant p-4"
            >
              <div className="w-16 h-20 flex-shrink-0 bg-surface-container overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 flex flex-col">
                <h3 className="font-body-md font-medium uppercase text-sm leading-tight">{item.name}</h3>
                <p className="font-label-caps text-label-caps text-on-surface-variant mt-1">
                  {item.color} / {item.size}
                </p>
                <div className="mt-auto flex justify-between items-end">
                  <span className="font-label-caps text-label-caps text-on-surface-variant">
                    Qty: {item.quantity}
                  </span>
                  <span className="font-body-md font-medium">
                    Rs. {(item.price * item.quantity).toLocaleString('en-LK')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Totals */}
      <div className="bg-surface-container-low border border-surface-variant p-5">
        <h2 className="font-headline-sm font-semibold uppercase tracking-tight mb-4 border-b border-surface-variant pb-4">
          Summary
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between font-body-md text-on-surface-variant">
            <span>Subtotal</span>
            <span>${order.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-body-md text-on-surface-variant">
            <span>Shipping</span>
            <span>{order.shipping === 0 ? "Free" : `$${order.shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between font-headline-sm font-semibold uppercase pt-3 border-t border-surface-variant">
            <span>Total</span>
            <span className="text-primary">${order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8 text-center">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 border border-on-surface text-on-surface font-button-text text-button-text uppercase py-3 px-8 hover:bg-primary hover:border-primary hover:text-on-primary transition-all"
        >
          Continue Shopping
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </Link>
      </div>
    </main>
  );
}
