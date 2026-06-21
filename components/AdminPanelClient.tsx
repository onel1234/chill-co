"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Order } from "@/lib/types";

interface AdminPanelClientProps {
  initialOrders: Order[];
}

export default function AdminPanelClient({ initialOrders }: AdminPanelClientProps) {
  const [activeTab, setActiveTab] = useState<"pending" | "all">("pending");

  const pendingOrders = initialOrders.filter(
    (o) => o.status === "pending" || o.status === "confirmed"
  );

  const displayedOrders = activeTab === "pending" ? pendingOrders : initialOrders;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
      case "confirmed":
        return "text-secondary bg-secondary-container/30 border-secondary/20";
      case "shipped":
        return "text-primary bg-primary/10 border-primary/20";
      case "delivered":
        return "text-primary bg-primary/20 border-primary/30";
      default:
        return "text-on-surface-variant bg-surface-container border-surface-variant";
    }
  };

  return (
    <main className="pt-[120px] pb-section-gap px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto min-h-screen relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-[-1]">
        <div className="kinetic-bg w-full h-full absolute opacity-50"></div>
        <div className="grain-texture w-full h-full absolute"></div>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-stack-lg border-b border-surface-variant pb-stack-md">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-4xl text-primary">admin_panel_settings</span>
          <h1 className="font-display-xl text-headline-lg-mobile md:text-headline-lg text-primary uppercase tracking-tighter">
            Admin Dashboard
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
        {/* Left Column: Orders */}
        <div className="lg:col-span-2 flex flex-col gap-stack-md">
          {/* Quick Stats Row */}
          <div className="grid grid-cols-2 gap-gutter mb-stack-sm">
            <div className="bg-surface-container-lowest border border-surface-variant p-6 relative overflow-hidden group hover:border-primary transition-colors">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
              <p className="font-display-xl text-headline-lg text-primary relative z-10">{pendingOrders.length}</p>
              <p className="font-label-caps text-label-caps text-on-surface-variant mt-1 relative z-10">Pending Orders</p>
            </div>
            <div className="bg-surface-container-lowest border border-surface-variant p-6 relative overflow-hidden group hover:border-primary transition-colors">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-secondary/5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
              <p className="font-display-xl text-headline-lg text-on-surface relative z-10">{initialOrders.length}</p>
              <p className="font-label-caps text-label-caps text-on-surface-variant mt-1 relative z-10">Total Orders</p>
            </div>
          </div>

          {/* Orders Section */}
          <div className="bg-surface-container-lowest border border-surface-variant p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-headline-md text-headline-sm uppercase tracking-tight">Orders</h2>
              
              {/* Tabs */}
              <div className="flex bg-surface-container p-1 rounded-sm">
                <button
                  onClick={() => setActiveTab("pending")}
                  className={`px-4 py-1.5 font-label-caps text-label-caps uppercase transition-colors ${
                    activeTab === "pending"
                      ? "bg-white dark:bg-surface-container-lowest shadow-sm text-primary font-bold"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setActiveTab("all")}
                  className={`px-4 py-1.5 font-label-caps text-label-caps uppercase transition-colors ${
                    activeTab === "all"
                      ? "bg-white dark:bg-surface-container-lowest shadow-sm text-primary font-bold"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  All Orders
                </button>
              </div>
            </div>

            {/* Orders List */}
            {displayedOrders.length === 0 ? (
              <div className="py-12 text-center border border-dashed border-surface-variant">
                <span className="material-symbols-outlined text-4xl text-on-surface-variant/40 block mb-4">
                  inbox
                </span>
                <p className="font-body-md text-on-surface-variant">
                  No {activeTab === "pending" ? "pending " : ""}orders found.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {displayedOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-surface-variant hover:border-primary/50 transition-colors bg-surface-container-lowest gap-4"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="font-label-caps text-label-caps font-bold text-on-surface">
                          #{order.id.slice(0, 8).toUpperCase()}
                        </span>
                        <span
                          className={`font-label-caps text-[10px] px-2 py-0.5 uppercase border ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <p className="font-body-md text-sm text-on-surface-variant flex items-center gap-2">
                        <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                        {formatDate(order.created_at)}
                      </p>
                      <p className="font-body-md text-sm text-on-surface-variant mt-1">
                        Customer ID: <span className="font-mono text-xs">{order.user_id.slice(0, 8)}...</span>
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <div className="text-right">
                        <p className="font-headline-sm font-semibold text-on-surface">
                          ${order.total.toFixed(2)}
                        </p>
                        <p className="font-label-caps text-[10px] text-on-surface-variant uppercase">
                          {order.order_items?.length ?? 0} Item{(order.order_items?.length ?? 0) !== 1 ? "s" : ""}
                        </p>
                      </div>
                      {/* We could add an Action button here to mark as shipped, etc. */}
                      <button className="text-primary hover:text-primary-container font-button-text text-xs uppercase tracking-wider flex items-center gap-1 transition-colors">
                        View Details <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Settings */}
        <div className="lg:col-span-1">
          <div className="bg-surface-container-lowest border border-surface-variant p-6 sticky top-32">
            <h2 className="font-headline-md text-headline-sm uppercase tracking-tight mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">settings</span>
              Account Settings
            </h2>
            
            <div className="space-y-6">
              {/* Placeholder Content */}
              <div className="border border-dashed border-surface-variant p-6 text-center bg-surface-container/30">
                <span className="material-symbols-outlined text-4xl text-on-surface-variant/40 block mb-4">
                  construction
                </span>
                <h3 className="font-headline-sm text-on-surface mb-2">Settings Placeholder</h3>
                <p className="font-body-md text-sm text-on-surface-variant">
                  Admin settings and configuration options will be implemented here in a future update.
                </p>
              </div>

              {/* Readonly Info Example */}
              <div className="pt-4 border-t border-surface-variant">
                <h4 className="font-label-caps text-label-caps text-on-surface-variant uppercase mb-3">System Info</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-on-surface-variant">Environment</span>
                    <span className="font-mono text-on-surface">Production</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-on-surface-variant">Version</span>
                    <span className="font-mono text-on-surface">v1.2.0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
