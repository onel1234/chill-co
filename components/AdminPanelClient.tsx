"use client";

import React, { useState, useEffect } from "react";
import { Order, UserProfile } from "@/lib/types";

interface LoyaltyTier {
  id: string;
  name: string;
  required_points: number;
  discount_percentage: number;
}

interface AdminPanelClientProps {
  initialOrders: Order[];
}

export default function AdminPanelClient({ initialOrders }: AdminPanelClientProps) {
  const [currentView, setCurrentView] = useState<"dashboard" | "customers" | "discounts" | "settings">("dashboard");
  const [activeTab, setActiveTab] = useState<"pending" | "all">("pending");

  const [customers, setCustomers] = useState<UserProfile[]>([]);
  const [loadingCustomers, setLoadingCustomers] = useState(false);

  const [tiers, setTiers] = useState<LoyaltyTier[]>([]);
  const [loadingTiers, setLoadingTiers] = useState(false);
  const [newTier, setNewTier] = useState({ name: '', required_points: '', discount_percentage: '' });

  const pendingOrders = initialOrders.filter(
    (o) => o.status === "pending" || o.status === "confirmed"
  );

  const displayedOrders = activeTab === "pending" ? pendingOrders : initialOrders;

  // Fetch Customers
  useEffect(() => {
    if (currentView === "customers") {
      setLoadingCustomers(true);
      fetch('/api/admin/customers')
        .then(res => res.json())
        .then(data => {
          if (!data.error) setCustomers(data);
          setLoadingCustomers(false);
        })
        .catch(() => setLoadingCustomers(false));
    }
  }, [currentView]);

  // Fetch Tiers
  useEffect(() => {
    if (currentView === "discounts") {
      setLoadingTiers(true);
      fetch('/api/admin/loyalty-tiers')
        .then(res => res.json())
        .then(data => {
          if (!data.error) setTiers(data);
          setLoadingTiers(false);
        })
        .catch(() => setLoadingTiers(false));
    }
  }, [currentView]);

  const toggleLoyaltyStatus = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch('/api/admin/customers', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, is_loyalty_member: !currentStatus })
      });
      if (res.ok) {
        setCustomers(prev => prev.map(c => c.id === id ? { ...c, is_loyalty_member: !currentStatus } : c));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const createTier = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/loyalty-tiers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newTier.name,
          required_points: parseInt(newTier.required_points),
          discount_percentage: parseInt(newTier.discount_percentage)
        })
      });
      if (res.ok) {
        const data = await res.json();
        setTiers(prev => [...prev, data].sort((a, b) => a.required_points - b.required_points));
        setNewTier({ name: '', required_points: '', discount_percentage: '' });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTier = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/loyalty-tiers?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setTiers(prev => prev.filter(t => t.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

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

  const navItems = [
    { id: 'dashboard', icon: 'dashboard', label: 'Dashboard' },
    { id: 'customers', icon: 'group', label: 'Customers' },
    { id: 'discounts', icon: 'loyalty', label: 'Discounts' },
    { id: 'settings', icon: 'settings', label: 'Settings' }
  ] as const;

  return (
    <main className="pt-[120px] pb-section-gap px-margin-mobile md:px-margin-desktop max-w-full mx-auto min-h-screen relative overflow-hidden">
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

      <div className="flex flex-col md:grid md:grid-cols-[256px_1fr] gap-gutter items-start">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-auto sticky top-24">
          <div className="bg-surface-container-lowest border border-surface-variant p-4 flex flex-col gap-2">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`flex items-center gap-3 px-4 py-3 text-left font-button-text text-button-text uppercase transition-colors ${
                  currentView === item.id
                    ? "bg-primary text-on-primary shadow-sm"
                    : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="w-full flex flex-col gap-stack-md min-w-0">
          {currentView === "dashboard" && (
            <div className="bg-surface-container-lowest border border-surface-variant p-6 min-h-[400px] flex flex-col gap-stack-md w-full">
              <h2 className="font-headline-md text-headline-sm uppercase tracking-tight flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">dashboard</span>
                Dashboard Overview
              </h2>
              {/* Quick Stats Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-gutter mb-stack-sm">
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
              <div className="border border-surface-variant p-6 bg-surface-container/10">
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
                            Customer ID: <span className="font-mono text-xs">{order.user_id ? `${order.user_id.slice(0, 8)}...` : 'Guest'}</span>
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
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {currentView === "customers" && (
            <div className="bg-surface-container-lowest border border-surface-variant p-6 min-h-[400px] w-full">
              <h2 className="font-headline-md text-headline-sm uppercase tracking-tight mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">group</span>
                Customers & Loyalty
              </h2>

              {loadingCustomers ? (
                <div className="py-12 flex justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-surface-variant text-label-caps font-label-caps uppercase text-on-surface-variant">
                        <th className="py-3 px-4">Customer</th>
                        <th className="py-3 px-4">Loyalty Points</th>
                        <th className="py-3 px-4 text-center">Loyalty Member</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map(customer => (
                        <tr key={customer.id} className="border-b border-surface-variant hover:bg-surface-container-low transition-colors">
                          <td className="py-4 px-4">
                            <p className="font-body-md text-sm font-medium">{customer.full_name || 'Anonymous'}</p>
                            <p className="font-body-md text-xs text-on-surface-variant">{customer.email}</p>
                          </td>
                          <td className="py-4 px-4">
                            <span className="font-mono text-primary font-bold">{customer.loyalty_points || 0}</span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <button
                              onClick={() => toggleLoyaltyStatus(customer.id, customer.is_loyalty_member)}
                              className={`w-12 h-6 rounded-full relative transition-colors ${customer.is_loyalty_member ? 'bg-primary' : 'bg-surface-variant'}`}
                            >
                              <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${customer.is_loyalty_member ? 'left-7' : 'left-1'}`} />
                            </button>
                          </td>
                        </tr>
                      ))}
                      {customers.length === 0 && (
                        <tr><td colSpan={3} className="text-center py-8 text-on-surface-variant">No customers found.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {currentView === "discounts" && (
            <div className="bg-surface-container-lowest border border-surface-variant p-6 min-h-[400px] w-full">
              <h2 className="font-headline-md text-headline-sm uppercase tracking-tight mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">loyalty</span>
                Loyalty Discount Tiers
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Create Form */}
                <div className="md:col-span-1 bg-surface-container p-6 border border-surface-variant h-fit">
                  <h3 className="font-headline-sm text-sm uppercase tracking-wider mb-4 border-b border-surface-variant pb-2">Create Tier</h3>
                  <form onSubmit={createTier} className="space-y-4">
                    <div>
                      <label className="block font-label-caps text-xs text-on-surface-variant mb-1 uppercase">Tier Name</label>
                      <input 
                        required 
                        value={newTier.name} 
                        onChange={e => setNewTier({...newTier, name: e.target.value})} 
                        placeholder="e.g. Silver Tier" 
                        className="w-full bg-surface-container-lowest border border-surface-variant p-3 text-sm focus:border-primary outline-none transition-colors" 
                      />
                    </div>
                    <div>
                      <label className="block font-label-caps text-xs text-on-surface-variant mb-1 uppercase">Required Points</label>
                      <input 
                        required 
                        type="number" 
                        min="1"
                        value={newTier.required_points} 
                        onChange={e => setNewTier({...newTier, required_points: e.target.value})} 
                        placeholder="100" 
                        className="w-full bg-surface-container-lowest border border-surface-variant p-3 text-sm focus:border-primary outline-none transition-colors" 
                      />
                    </div>
                    <div>
                      <label className="block font-label-caps text-xs text-on-surface-variant mb-1 uppercase">Discount Percentage (%)</label>
                      <input 
                        required 
                        type="number" 
                        min="1"
                        max="100"
                        value={newTier.discount_percentage} 
                        onChange={e => setNewTier({...newTier, discount_percentage: e.target.value})} 
                        placeholder="10" 
                        className="w-full bg-surface-container-lowest border border-surface-variant p-3 text-sm focus:border-primary outline-none transition-colors" 
                      />
                    </div>
                    <button type="submit" className="w-full bg-primary text-on-primary py-3 font-button-text text-sm uppercase tracking-widest hover:opacity-90 transition-opacity">
                      Save Tier
                    </button>
                  </form>
                </div>

                {/* Tiers List */}
                <div className="md:col-span-2 space-y-4">
                  {loadingTiers ? (
                    <div className="py-12 flex justify-center"><div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>
                  ) : (
                    <>
                      {tiers.map(tier => (
                        <div key={tier.id} className="bg-surface-container-low border border-surface-variant p-4 flex items-center justify-between group hover:border-primary/50 transition-colors">
                          <div>
                            <h4 className="font-headline-sm text-on-surface">{tier.name}</h4>
                            <div className="flex gap-4 mt-2">
                              <span className="font-label-caps text-xs text-on-surface-variant uppercase bg-surface-container px-2 py-1">
                                {tier.required_points} Points
                              </span>
                              <span className="font-label-caps text-xs text-secondary uppercase bg-secondary-container/20 px-2 py-1">
                                {tier.discount_percentage}% OFF
                              </span>
                            </div>
                          </div>
                          <button onClick={() => deleteTier(tier.id)} className="text-on-surface-variant hover:text-error opacity-0 group-hover:opacity-100 transition-all p-2">
                            <span className="material-symbols-outlined">delete</span>
                          </button>
                        </div>
                      ))}
                      {tiers.length === 0 && (
                        <div className="py-12 text-center border border-dashed border-surface-variant bg-surface-container-lowest text-on-surface-variant">
                          No loyalty tiers defined. Create one to the left.
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {currentView === "settings" && (
            <div className="bg-surface-container-lowest border border-surface-variant p-6 h-full min-h-[400px] w-full">
              <h2 className="font-headline-md text-headline-sm uppercase tracking-tight mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">settings</span>
                Account Settings
              </h2>
              
              <div className="space-y-6">
                <div className="border border-dashed border-surface-variant p-6 text-center bg-surface-container/30">
                  <span className="material-symbols-outlined text-4xl text-on-surface-variant/40 block mb-4">
                    construction
                  </span>
                  <h3 className="font-headline-sm text-on-surface mb-2">Settings Placeholder</h3>
                  <p className="font-body-md text-sm text-on-surface-variant">
                    Admin settings and configuration options will be implemented here in a future update.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
