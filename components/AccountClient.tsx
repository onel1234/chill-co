"use client";

import React, { useMemo, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import { useCart } from "@/lib/context/CartContext";
import { createClient } from "@/lib/supabase/client";
import { Order, AffiliateCode, AffiliateSettings } from "@/lib/types";
import { products } from "@/lib/data/products";
import ContactModal from "./ContactModal";
import "@/app/account/account.css";

type IconName =
  | "arrow"
  | "bag"
  | "chevron"
  | "copy"
  | "gift"
  | "heart"
  | "logout"
  | "menu"
  | "package"
  | "search"
  | "settings"
  | "spark"
  | "user";

function Icon({
  name,
  size = 20,
  strokeWidth = 1.8,
}: {
  name: IconName;
  size?: number;
  strokeWidth?: number;
}) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    bag: (
      <>
        <path d="M6 8h12l1 12H5L6 8Z" />
        <path d="M9 9V6a3 3 0 0 1 6 0v3" />
      </>
    ),
    chevron: <path d="m9 18 6-6-6-6" />,
    copy: (
      <>
        <rect x="8" y="8" width="11" height="11" rx="2" />
        <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
      </>
    ),
    gift: (
      <>
        <rect x="3" y="8" width="18" height="13" rx="2" />
        <path d="M12 8v13M3 12h18M12 8H7.5a2.5 2.5 0 1 1 0-5C11 3 12 8 12 8Zm0 0h4.5a2.5 2.5 0 1 0 0-5C13 3 12 8 12 8Z" />
      </>
    ),
    heart: (
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
    ),
    logout: (
      <>
        <path d="M10 17l5-5-5-5M15 12H3" />
        <path d="M15 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </>
    ),
    package: (
      <>
        <path d="m21 8-9-5-9 5 9 5 9-5Z" />
        <path d="m3 8 9 5 9-5v10l-9 5-9-5V8Zm9 5v10" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6v-.2h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" />
      </>
    ),
    spark: (
      <>
        <path d="m12 3 1.4 4.1L17.5 9l-4.1 1.5L12 15l-1.5-4.5L6.5 9l4-1.9L12 3Z" />
        <path d="m19 15 .7 2.1L22 18l-2.3.9L19 21l-.9-2.1L16 18l2.1-.9L19 15Z" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

interface LoyaltyTier {
  id: string;
  name: string;
  required_points: number;
  discount_percentage: number;
}

const navItems: { label: string; icon: IconName }[] = [
  { label: "Overview", icon: "user" },
  { label: "Orders", icon: "package" },
  { label: "Rewards", icon: "gift" },
  { label: "Bag", icon: "bag" },
  { label: "Settings", icon: "settings" },
];

const FALLBACK_PRODUCTS = [
  "Archive Print No. 04",
  "Chill Co. Studio Tee",
  "Summer Objects Set",
  "Founders Cap",
];

const ART_COLORS = ["sand", "clay", "blue", "olive"] as const;

const ORDERS_PER_PAGE = 5;

export default function AccountClient() {
  const { user, profile, isLoading, signOut, refreshProfile } = useAuth();
  const { items: bagItems, removeFromCart, totalItems } = useCart();
  const router = useRouter();
  const supabase = createClient();

  const [activeNav, setActiveNav] = useState("Overview");
  const [orderFilter, setOrderFilter] = useState("All orders");
  const [ordersPage, setOrdersPage] = useState(1);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [tiers, setTiers] = useState<LoyaltyTier[]>([]);
  const [affiliateCodes, setAffiliateCodes] = useState<AffiliateCode[]>([]);
  const [affiliateSettings, setAffiliateSettings] =
    useState<AffiliateSettings | null>(null);

  const [settingsSaved, setSettingsSaved] = useState(false);

  const [formProfile, setFormProfile] = useState({
    firstName: "Wathila",
    lastName: "Rox",
    email: "wathilarox@gmail.com",
    phone: "+1 212 555 0148",
  });

  const [notifications, setNotifications] = useState({
    orders: true,
    rewards: true,
    editorial: false,
  });

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/account/login");
    }
  }, [user, isLoading, router]);

  // Populate form profile from authenticated user & profile
  useEffect(() => {
    if (user || profile) {
      const rawName =
        profile?.full_name ||
        (user?.user_metadata?.full_name as string) ||
        (user?.user_metadata?.name as string) ||
        user?.email?.split("@")[0] ||
        "Wathila Rox";
      const parts = rawName.trim().split(/\s+/);
      const first = parts[0] || "Wathila";
      const last = parts.slice(1).join(" ") || "";
      const savedPhone =
        typeof window !== "undefined"
          ? localStorage.getItem("chill_co_account_phone")
          : null;

      setFormProfile({
        firstName: first,
        lastName: last,
        email: profile?.email || user?.email || "",
        phone: savedPhone || "+1 212 555 0148",
      });
    }
  }, [user, profile]);

  // Load saved notification preferences
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedNotifs = localStorage.getItem("chill_co_notifications");
        if (savedNotifs) {
          setNotifications(JSON.parse(savedNotifs));
        }
      } catch {
        // Ignore storage errors
      }
    }
  }, []);

  const fetchOrders = useCallback(async () => {
    setOrdersLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*, order_items(*)")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setOrders(data as Order[]);
    }
    setOrdersLoading(false);
  }, [supabase]);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user, fetchOrders]);

  useEffect(() => {
    if (user) {
      fetch("/api/loyalty/tiers")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) setTiers(data);
        })
        .catch(() => {});
    }
  }, [user]);

  const [claimedTiers, setClaimedTiers] = useState<string[]>([]);

  useEffect(() => {
    if (!user) return;
    const currentPts = Math.min(100, profile?.loyalty_points ?? 0);
    const storageKey = `chill_co_claimed_tiers_${user.id}`;

    let localClaimed: string[] = [];
    if (typeof window !== "undefined") {
      try {
        const raw = localStorage.getItem(storageKey);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed)) localClaimed = parsed;
        }
      } catch {
        // Ignore storage errors
      }
    }

    if (currentPts === 0 && typeof window !== "undefined") {
      localStorage.removeItem(storageKey);
      localClaimed = [];
    }

    supabase
      .from("discount_coupons")
      .select("tier_name")
      .eq("user_id", user.id)
      .eq("is_used", true)
      .is("expires_at", null)
      .then(({ data }) => {
        const dbClaimed = Array.isArray(data)
          ? data.map((row: { tier_name: string }) => row.tier_name)
          : [];
        const combined = Array.from(new Set([...localClaimed, ...dbClaimed]));
        setClaimedTiers(combined);
      });
  }, [user, profile?.loyalty_points, supabase]);

  const fetchAffiliateData = useCallback(async () => {
    try {
      const [codesRes, settingsRes] = await Promise.all([
        fetch("/api/affiliate/my-codes"),
        fetch("/api/affiliate/settings"),
      ]);
      const codesData = await codesRes.json();
      const settingsData = await settingsRes.json();
      if (Array.isArray(codesData)) setAffiliateCodes(codesData);
      if (settingsData && !settingsData.error) setAffiliateSettings(settingsData);
    } catch {
      // Ignore network errors
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchAffiliateData();
    }
  }, [user, fetchAffiliateData]);

  const displayOrders = useMemo(() => {
    const hasExplicitDelivered = orders.some(
      (o) => (o.status || "").toLowerCase() === "delivered"
    );

    return orders.map((order, idx) => {
      const rawStatus = (order.status || "").toLowerCase();
      let mappedStatus: "Processing" | "Delivered" = "Processing";
      if (rawStatus === "delivered" || rawStatus === "completed") {
        mappedStatus = "Delivered";
      } else if (rawStatus === "processing" || rawStatus === "pending") {
        mappedStatus = "Processing";
      } else if (!hasExplicitDelivered && idx > 0) {
        mappedStatus = "Delivered";
      }

      const itemCount =
        order.order_items && order.order_items.length > 0
          ? order.order_items.length
          : 1;

      const firstItem =
        order.order_items && order.order_items.length > 0
          ? order.order_items[0]
          : null;

      const productName =
        firstItem?.name || FALLBACK_PRODUCTS[idx % FALLBACK_PRODUCTS.length];

      const catalogMatch = products.find(
        (p) =>
          (firstItem?.product_id && p.id === firstItem.product_id) ||
          p.name.toLowerCase() === productName.toLowerCase()
      );

      const productImage =
        firstItem?.image || catalogMatch?.images?.[0] || null;

      const formattedDate = new Date(order.created_at).toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "numeric",
          year: "numeric",
        }
      );

      const formattedPrice = `LKR ${Number(order.total || 0).toLocaleString(
        "en-LK"
      )}`;

      const addr = (order as unknown as {
        shipping_address?: { city?: string; country?: string };
      }).shipping_address;
      const shippingLocation =
        addr?.city
          ? `${addr.city}${addr.country ? `, ${addr.country}` : ""}`
          : "Colombo, Sri Lanka";

      return {
        rawId: order.id,
        id: `#${order.id.slice(0, 8).toUpperCase()}`,
        date: formattedDate,
        items: `${itemCount} item${itemCount !== 1 ? "s" : ""}`,
        product: productName,
        image: productImage,
        price: formattedPrice,
        status: mappedStatus,
        color: ART_COLORS[idx % ART_COLORS.length],
        shippingLocation,
      };
    });
  }, [orders]);

  const visibleOrders = useMemo(
    () =>
      orderFilter === "All orders"
        ? displayOrders
        : displayOrders.filter((order) => order.status === orderFilter),
    [orderFilter, displayOrders]
  );

  const totalOrderPages = Math.max(
    1,
    Math.ceil(visibleOrders.length / ORDERS_PER_PAGE)
  );

  const paginatedOrders = useMemo(() => {
    const safePage = Math.min(ordersPage, totalOrderPages);
    const start = (safePage - 1) * ORDERS_PER_PAGE;
    return visibleOrders.slice(start, start + ORDERS_PER_PAGE);
  }, [visibleOrders, ordersPage, totalOrderPages]);

  const defaultReferralCode = useMemo(() => {
    if (affiliateCodes.length > 0) {
      return affiliateCodes[0].code;
    }
    const cleanFirst = (formProfile.firstName || "WATHILA")
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "");
    return `${cleanFirst || "CHILL"}25`;
  }, [affiliateCodes, formProfile.firstName]);

  async function copyReferralCode() {
    navigator.clipboard?.writeText(defaultReferralCode);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);

    // Ensure the referral code exists in the database if the user has none yet
    if (user && affiliateCodes.length === 0) {
      try {
        const res = await fetch("/api/affiliate/create-code", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: defaultReferralCode }),
        });
        if (res.ok) {
          fetchAffiliateData();
        }
      } catch {
        // Ignore if code already exists
      }
    }
  }

  async function saveSettings(event: React.FormEvent) {
    event.preventDefault();
    const combinedName =
      `${formProfile.firstName} ${formProfile.lastName}`.trim();

    if (user) {
      await supabase
        .from("profiles")
        .update({
          full_name: combinedName,
          email: formProfile.email,
        })
        .eq("id", user.id);
      await refreshProfile();
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("chill_co_account_phone", formProfile.phone);
      localStorage.setItem(
        "chill_co_notifications",
        JSON.stringify(notifications)
      );
    }

    setSettingsSaved(true);
    window.setTimeout(() => setSettingsSaved(false), 2200);
  }

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  if (isLoading) {
    return (
      <div className="account-shell" style={{ display: "grid", placeItems: "center" }}>
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            border: "2px solid rgba(231, 211, 166, 0.2)",
            borderTopColor: "#e3bd79",
            animation: "spin 0.8s linear infinite",
          }}
        />
      </div>
    );
  }

  if (!user) return null;

  const fullName =
    `${formProfile.firstName} ${formProfile.lastName}`.trim() ||
    profile?.full_name ||
    user.email?.split("@")[0] ||
    "Wathila Rox";

  const firstName = formProfile.firstName || fullName.split(" ")[0] || "Wathila";

  const initials = fullName
    .split(/\s+/)
    .filter(Boolean)
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const loyaltyPoints = Math.min(100, profile?.loyalty_points ?? 0);

  const sortedTiers =
    tiers.length > 0
      ? [...tiers].sort((a, b) => a.required_points - b.required_points)
      : [
          { id: "1", name: "Explorer", required_points: 30, discount_percentage: 25 },
          { id: "2", name: "Curator", required_points: 60, discount_percentage: 50 },
          { id: "3", name: "Culturalist", required_points: 100, discount_percentage: 100 },
        ];

  const validClaimedTiers = claimedTiers.filter((tierName) => {
    const t = sortedTiers.find(
      (item) => item.name.toLowerCase() === tierName.toLowerCase()
    );
    return t ? loyaltyPoints >= t.required_points : false;
  });

  const unlockedUnclaimedTiers = sortedTiers.filter(
    (t) =>
      loyaltyPoints >= t.required_points &&
      !validClaimedTiers.some(
        (claimed) => claimed.toLowerCase() === t.name.toLowerCase()
      )
  );

  const activeRewardTier =
    unlockedUnclaimedTiers.length > 0
      ? unlockedUnclaimedTiers[unlockedUnclaimedTiers.length - 1]
      : null;

  const nextTier =
    sortedTiers.find((t) => loyaltyPoints < t.required_points) ||
    sortedTiers[sortedTiers.length - 1];

  const tierBadgeMap: Record<string, string> = {
    Explorer: "/images/badge-explorer.jpg",
    Curator: "/images/badge-curator.jpg",
    Culturalist: "/images/badge-culturalist.jpg",
  };

  const achievedTier = [...sortedTiers]
    .reverse()
    .find((t) => loyaltyPoints >= t.required_points);

  const currentTierLabel = achievedTier ? achievedTier.name : "Member";

  const currentTierBadge: string | null = achievedTier
    ? tierBadgeMap[achievedTier.name] || null
    : null;

  const nextTierBadge =
    tierBadgeMap[(activeRewardTier || nextTier)?.name] ||
    "/images/badge-explorer.jpg";

  const targetPoints = 100;
  const pointsRemaining =
    loyaltyPoints < 100
      ? Math.max(0, (nextTier?.required_points || 30) - loyaltyPoints)
      : 0;
  const progressRatio = Math.min(1, Math.max(0, loyaltyPoints / targetPoints));
  const strokeDashoffset = Math.round(371 * (1 - progressRatio));

  const totalSpent = orders.reduce((sum, o) => sum + Number(o.total || 0), 0);
  const totalItemsPurchased = orders.reduce(
    (sum, o) =>
      sum + (o.order_items && o.order_items.length > 0 ? o.order_items.length : 1),
    0
  );

  const memberSinceMonthYear = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "June 2026";

  const pointsPerReferral = affiliateSettings?.points_per_referral ?? 50;

  const currentHour = new Date().getHours();
  const timeGreeting =
    currentHour >= 5 && currentHour < 12
      ? "Good morning"
      : currentHour >= 12 && currentHour < 17
        ? "Good afternoon"
        : "Good evening";

  const pageIntro: Record<string, { title: string; copy: string }> = {
    Overview: {
      title: `${timeGreeting}, ${firstName}.`,
      copy: "Everything you love, ordered and rewarded.",
    },
    Orders: {
      title: "Your orders.",
      copy: "Track current deliveries or revisit something you loved.",
    },
    Rewards: {
      title: "Chill Rewards.",
      copy: "Earn points, unlock perks, and share the good stuff.",
    },
    Bag: {
      title: "Your bag.",
      copy: "Pieces ready for checkout whenever you are.",
    },
    Settings: {
      title: "Account settings.",
      copy: "Keep your profile, preferences, and contact details current.",
    },
  };

  return (
    <div className="account-shell">
      <main className="dashboard">
        <section className="welcome-row">
          <div>
            <p className="eyebrow">My account</p>
            <h1>{pageIntro[activeNav].title}</h1>
            <p className="welcome-copy">{pageIntro[activeNav].copy}</p>
          </div>
          <button
            className="sign-out"
            onClick={handleSignOut}
            aria-label="Sign out"
          >
            <span>Sign out</span>
            <Icon name="logout" size={17} />
          </button>
        </section>

        <div className="dashboard-grid">
          <aside className="account-sidebar">
            <div className="profile-block">
              {currentTierBadge ? (
                <div
                  className="avatar-badge-wrap"
                  title={`${currentTierLabel} Tier Seal`}
                >
                  <img
                    src={currentTierBadge}
                    alt={`${currentTierLabel} tier badge`}
                    className="avatar-badge-img"
                  />
                </div>
              ) : (
                <div className="avatar">{initials}</div>
              )}
              <div>
                <strong>{fullName}</strong>
                <span>{user.email}</span>
                <div className="profile-tier-chip">
                  ✦ {currentTierLabel}
                </div>
              </div>
            </div>

            <nav className="account-nav" aria-label="Account navigation">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  className={activeNav === item.label ? "active" : ""}
                  onClick={() => {
                    setActiveNav(item.label);
                    setOrderFilter("All orders");
                    setOrdersPage(1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  <Icon name={item.icon} size={18} />
                  <span>{item.label}</span>
                  {item.label === "Orders" && <small>{orders.length}</small>}
                  {item.label === "Bag" && totalItems > 0 && (
                    <small>{totalItems}</small>
                  )}
                </button>
              ))}
            </nav>

            <div className="sidebar-support">
              <span>Need a hand?</span>
              <a
                href="#support"
                onClick={(e) => {
                  e.preventDefault();
                  setIsContactOpen(true);
                }}
              >
                Contact support <Icon name="arrow" size={16} />
              </a>
            </div>
          </aside>

          <div className="account-content">
            {activeNav === "Overview" && (
              <>
                <section className="rewards-card">
                  <div className="reward-copy">
                    <span className="reward-kicker">
                      <Icon name="spark" size={16} /> Chill Rewards
                    </span>
                    <h2>
                      {loyaltyPoints} points today.
                      <br />
                      {activeRewardTier
                        ? `${activeRewardTier.name} (${activeRewardTier.discount_percentage}% off) unlocked.`
                        : pointsRemaining > 0
                          ? `${nextTier.name} is close.`
                          : `${nextTier.name} unlocked.`}
                    </h2>
                    <p>
                      {activeRewardTier
                        ? activeRewardTier.required_points >= 100
                          ? `You've reached 100 points and become a Culturalist! Claim your one-time 100% off discount at checkout — points revert to 0 after claiming.`
                          : `You've unlocked a one-time ${activeRewardTier.discount_percentage}% off ${activeRewardTier.name} discount for checkout! Your points stay when claimed (${pointsRemaining} more pts to ${nextTier.name}).`
                        : pointsRemaining > 0
                          ? `Just ${pointsRemaining} more points (${Math.ceil(pointsRemaining / 10)} T-shirt${Math.ceil(pointsRemaining / 10) !== 1 ? "s" : ""}) to unlock your one-time ${nextTier.discount_percentage}% off ${nextTier.name} discount.`
                          : `You've unlocked ${nextTier.discount_percentage}% off your next purchase.`}
                    </p>
                    <Link href="/shop" className="primary-button">
                      Explore new arrivals <Icon name="arrow" size={18} />
                    </Link>
                  </div>

                  <div
                    className="progress-orbit"
                    aria-label={`${loyaltyPoints} of ${targetPoints} points earned`}
                  >
                    <svg viewBox="0 0 140 140" aria-hidden="true">
                      <circle className="orbit-track" cx="70" cy="70" r="59" />
                      <circle
                        className="orbit-value"
                        cx="70"
                        cy="70"
                        r="59"
                        style={{ strokeDashoffset }}
                      />
                    </svg>
                    <div className="orbit-label">
                      <strong>{loyaltyPoints}</strong>
                      <span>of {targetPoints} pts</span>
                    </div>
                  </div>

                  <div className="reward-tier">
                    <div className="reward-tier-badge-preview">
                      <img
                        src={nextTierBadge}
                        alt={`${(activeRewardTier || nextTier).name} reward badge`}
                      />
                    </div>
                    <span>
                      {activeRewardTier ? "Unlocked discount" : "Next reward"}
                    </span>
                    <strong>{(activeRewardTier || nextTier).name}</strong>
                    <small>
                      {(activeRewardTier || nextTier).discount_percentage}% off · One-time
                    </small>
                  </div>
                </section>

                <section className="stats-grid" aria-label="Account statistics">
                  <article>
                    <span>Total spent</span>
                    <strong>
                      LKR {Math.round(totalSpent).toLocaleString("en-LK")}
                    </strong>
                    <small>
                      Across {orders.length} order{orders.length !== 1 ? "s" : ""}
                    </small>
                  </article>
                  <article>
                    <span>Items purchased</span>
                    <strong>{totalItemsPurchased}</strong>
                    <small>Since {memberSinceMonthYear}</small>
                  </article>
                  <article className="referral-stat">
                    <span>Your referral code</span>
                    <button onClick={copyReferralCode}>
                      <strong>{copied ? "Copied!" : defaultReferralCode}</strong>
                      <Icon name="copy" size={17} />
                    </button>
                    <small>Give 15%, earn {pointsPerReferral} points</small>
                  </article>
                </section>
              </>
            )}

            {(activeNav === "Overview" || activeNav === "Orders") && (
              <section className="orders-section">
                <div className="section-heading">
                  <div>
                    <p className="eyebrow">
                      {activeNav === "Overview"
                        ? "Purchase history"
                        : "All purchases"}
                    </p>
                    <h2>
                      {activeNav === "Overview"
                        ? "Recent orders"
                        : "Order history"}
                    </h2>
                  </div>
                  <div
                    className="filter-tabs"
                    role="group"
                    aria-label="Filter orders"
                  >
                    {["All orders", "Processing", "Delivered"].map((filter) => (
                      <button
                        key={filter}
                        className={orderFilter === filter ? "active" : ""}
                        onClick={() => {
                          setOrderFilter(filter);
                          setOrdersPage(1);
                        }}
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </div>

                {ordersLoading ? (
                  <div className="empty-state">Loading your orders...</div>
                ) : (
                  <>
                    <div className="orders-list">
                      {paginatedOrders.map((order) => {
                        const isExpanded = expandedOrder === order.id;
                        return (
                          <article
                            className={`order-card ${isExpanded ? "expanded" : ""}`}
                            key={order.rawId}
                          >
                            <button
                              className="order-summary"
                              onClick={() =>
                                setExpandedOrder(isExpanded ? null : order.id)
                              }
                              aria-expanded={isExpanded}
                            >
                              <div
                                className={`product-art ${order.color} ${
                                  order.image ? "has-image" : ""
                                }`}
                              >
                                {order.image ? (
                                  <img
                                    src={order.image}
                                    alt={order.product}
                                    className="order-product-img"
                                  />
                                ) : (
                                  <>
                                    <span />
                                    <span />
                                    <span />
                                  </>
                                )}
                              </div>
                              <div className="order-product">
                                <span className="order-meta">
                                  {order.id} · {order.date}
                                </span>
                                <strong>{order.product}</strong>
                                <small>{order.items}</small>
                              </div>
                              <span
                                className={`status ${order.status.toLowerCase()}`}
                              >
                                {order.status}
                              </span>
                              <strong className="order-price">
                                {order.price}
                              </strong>
                              <span className="order-chevron">
                                <Icon name="chevron" size={19} />
                              </span>
                            </button>
                            {isExpanded && (
                              <div className="order-details">
                                <div>
                                  <span>Shipping to</span>
                                  <strong>{order.shippingLocation}</strong>
                                </div>
                                <div>
                                  <span>Tracking</span>
                                  <strong>
                                    {order.status === "Processing"
                                      ? "Preparing your order"
                                      : "Delivered"}
                                  </strong>
                                </div>
                                <Link href={`/account/orders/${order.rawId}`}>
                                  View order details{" "}
                                  <Icon name="arrow" size={16} />
                                </Link>
                              </div>
                            )}
                          </article>
                        );
                      })}
                    </div>
                    {visibleOrders.length === 0 && (
                      <div className="empty-state">
                        No orders match this filter.
                      </div>
                    )}
                    {visibleOrders.length > ORDERS_PER_PAGE && (
                      <div
                        className="orders-pagination"
                        aria-label="Orders pagination"
                      >
                        <button
                          type="button"
                          className="pagination-btn"
                          disabled={ordersPage <= 1}
                          onClick={() =>
                            setOrdersPage((p) => Math.max(1, p - 1))
                          }
                        >
                          Previous
                        </button>
                        <div className="pagination-pages">
                          {Array.from(
                            { length: totalOrderPages },
                            (_, idx) => idx + 1
                          ).map((page) => (
                            <button
                              key={page}
                              type="button"
                              className={`pagination-page ${
                                ordersPage === page ? "active" : ""
                              }`}
                              onClick={() => setOrdersPage(page)}
                            >
                              {page}
                            </button>
                          ))}
                        </div>
                        <button
                          type="button"
                          className="pagination-btn"
                          disabled={ordersPage >= totalOrderPages}
                          onClick={() =>
                            setOrdersPage((p) =>
                              Math.min(totalOrderPages, p + 1)
                            )
                          }
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </>
                )}
              </section>
            )}

            {activeNav === "Rewards" && (
              <div className="rewards-page">
                <section className="rewards-card">
                  <div className="reward-copy">
                    <span className="reward-kicker">
                      <Icon name="spark" size={16} /> Current balance
                    </span>
                    <h2>
                      {loyaltyPoints} of 100 points.
                      <br />
                      {activeRewardTier
                        ? `${activeRewardTier.discount_percentage}% one-time discount unlocked.`
                        : "Your next perk awaits."}
                    </h2>
                    <p>
                      Each T-shirt purchase earns 10 points toward 100 total
                      points. Unlock one-time discounts at 30 pts (25%), 60 pts
                      (50%), and 100 pts (100%). Claiming a discount does not
                      reset your points — points revert to 0 only when you reach
                      100 points (Culturalist) and claim the 100% discount.
                    </p>
                  </div>
                  <div
                    className="progress-orbit"
                    aria-label={`${loyaltyPoints} of ${targetPoints} points earned`}
                  >
                    <svg viewBox="0 0 140 140" aria-hidden="true">
                      <circle className="orbit-track" cx="70" cy="70" r="59" />
                      <circle
                        className="orbit-value"
                        cx="70"
                        cy="70"
                        r="59"
                        style={{ strokeDashoffset }}
                      />
                    </svg>
                    <div className="orbit-label">
                      <strong>{loyaltyPoints}</strong>
                      <span>of {targetPoints} pts</span>
                    </div>
                  </div>
                  <div className="reward-tier">
                    {currentTierBadge && (
                      <div className="reward-tier-badge-preview">
                        <img
                          src={currentTierBadge}
                          alt={`${currentTierLabel} tier badge`}
                        />
                      </div>
                    )}
                    <span>Current tier</span>
                    <strong>{currentTierLabel}</strong>
                    <small>
                      {activeRewardTier
                        ? `${activeRewardTier.discount_percentage}% off ready at checkout`
                        : pointsRemaining > 0
                          ? `${pointsRemaining} pts to ${nextTier.name}`
                          : "Max tier reached"}
                    </small>
                  </div>
                </section>

                <section className="tier-section">
                  <div className="section-heading">
                    <div>
                      <p className="eyebrow">Member benefits</p>
                      <h2>Your reward path</h2>
                    </div>
                    <span className="tier-heritage-tag">
                      Royal Ceylon Heritage Seals
                    </span>
                  </div>
                  <div className="tier-grid">
                    {[
                      {
                        rank: "Tier 1 · 3 T-shirts",
                        name: "Explorer",
                        motif: "Sandakada · Sacred Lotus",
                        requiredPoints: 30,
                        benefit: "25% off (One-time)",
                        badgeImg: "/images/badge-explorer.jpg",
                        lore: "Unlocks after your 3rd T-shirt purchase (30 pts). Claim a one-time 25% discount — your points stay intact as you progress toward Curator.",
                      },
                      {
                        rank: "Tier 2 · 6 T-shirts",
                        name: "Curator",
                        motif: "Hansa Puttuwa · Twin Swans",
                        requiredPoints: 60,
                        benefit: "50% off (One-time)",
                        badgeImg: "/images/badge-curator.jpg",
                        lore: "Unlocks after your 6th T-shirt purchase (60 pts). Claim a one-time 50% discount — your points stay intact as you progress toward Culturalist.",
                      },
                      {
                        rank: "Tier 3 · 10 T-shirts",
                        name: "Culturalist",
                        motif: "Makara Thorana · Ira Handa",
                        requiredPoints: 100,
                        benefit: "100% off (One-time)",
                        badgeImg: "/images/badge-culturalist.jpg",
                        lore: "Unlocks after your 10th T-shirt purchase (100 pts). Claim your one-time 100% discount — points revert back to 0 to begin a new cycle.",
                      },
                    ].map((tier) => {
                      const isUnlocked = loyaltyPoints >= tier.requiredPoints;
                      const isClaimed =
                        isUnlocked &&
                        validClaimedTiers.some(
                          (c) => c.toLowerCase() === tier.name.toLowerCase()
                        );
                      const isNextTarget =
                        !isUnlocked && nextTier.name === tier.name;
                      const progressPct = Math.min(
                        100,
                        Math.round((loyaltyPoints / tier.requiredPoints) * 100)
                      );

                      return (
                        <article
                          key={tier.name}
                          className={`heritage-tier-card ${
                            isUnlocked
                              ? "unlocked"
                              : isNextTarget
                                ? "next-target"
                                : ""
                          }`}
                        >
                          <div className="tier-card-top">
                            <span className="tier-rank-label">{tier.rank}</span>
                            <span
                              className={`tier-points-pill ${
                                isUnlocked ? "unlocked" : ""
                              }`}
                            >
                              {isClaimed
                                ? "Claimed"
                                : isUnlocked
                                  ? "Unlocked"
                                  : `${tier.requiredPoints} pts`}
                            </span>
                          </div>

                          <div className="tier-medallion-stage">
                            <div className="tier-medallion-orbit" />
                            <div className="tier-medallion-frame">
                              <img
                                src={tier.badgeImg}
                                alt={`${tier.name} Sri Lankan heritage seal`}
                                className="tier-medallion-img"
                              />
                            </div>
                          </div>

                          <div className="tier-body">
                            <span className="tier-motif-name">
                              {tier.motif}
                            </span>
                            <strong className="tier-title">{tier.name}</strong>
                            <p className="tier-lore">{tier.lore}</p>
                          </div>

                          <div className="tier-perk-footer">
                            <div className="tier-perk-row">
                              <span className="tier-perk-label">Privilege</span>
                              <span className="tier-perk-value">
                                {tier.benefit}
                              </span>
                            </div>
                            <div
                              className="tier-progress-track"
                              aria-label={`${progressPct}% toward ${tier.name}`}
                            >
                              <div
                                className="tier-progress-fill"
                                style={{ width: `${progressPct}%` }}
                              />
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>

                <section className="referral-card">
                  <div>
                    <p className="eyebrow">Share the feeling</p>
                    <h2>Give 15%. Get {pointsPerReferral} points.</h2>
                    <p>
                      Your friend gets 15% off their first order. You receive{" "}
                      {pointsPerReferral} points after their purchase.
                    </p>
                  </div>
                  <button onClick={copyReferralCode}>
                    <span>{copied ? "Code copied" : defaultReferralCode}</span>
                    <Icon name="copy" size={18} />
                  </button>
                </section>
              </div>
            )}

            {activeNav === "Bag" && (
              <section className="wishlist-section">
                <div className="section-heading">
                  <div>
                    <p className="eyebrow">Shopping bag</p>
                    <h2>
                      {totalItems} {totalItems === 1 ? "piece" : "pieces"} in bag
                    </h2>
                  </div>
                  {bagItems.length > 0 && (
                    <Link href="/checkout" className="primary-button">
                      Proceed to checkout <Icon name="arrow" size={18} />
                    </Link>
                  )}
                </div>
                {bagItems.length > 0 ? (
                  <div className="wishlist-grid">
                    {bagItems.map((item, idx) => (
                      <article key={item.id}>
                        <div
                          className={`wishlist-art ${
                            ART_COLORS[(idx + 2) % ART_COLORS.length]
                          }`}
                        >
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="bag-item-image"
                            />
                          ) : (
                            <span>CHILL CO.</span>
                          )}
                        </div>
                        <div className="wishlist-info">
                          <div>
                            <div>
                              <strong>{item.name}</strong>
                              <small className="bag-item-meta">
                                {item.color} · Size {item.size} · Qty{" "}
                                {item.quantity}
                              </small>
                            </div>
                            <span>
                              LKR{" "}
                              {(item.price * item.quantity).toLocaleString(
                                "en-LK"
                              )}
                            </span>
                          </div>
                          <div className="wishlist-actions">
                            <Link href="/checkout">
                              <Icon name="bag" size={16} /> Checkout
                            </Link>
                            <button
                              aria-label={`Remove ${item.name} from bag`}
                              onClick={() => removeFromCart(item.id)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state wishlist-empty">
                    <Icon name="bag" size={26} />
                    <strong>Your bag is empty.</strong>
                    <span>Add pieces while you browse the shop.</span>
                  </div>
                )}
              </section>
            )}

            {activeNav === "Settings" && (
              <form className="settings-form" onSubmit={saveSettings}>
                <section className="settings-card">
                  <div className="settings-heading">
                    <div>
                      <p className="eyebrow">Personal details</p>
                      <h2>Profile information</h2>
                    </div>
                    <span>Member since {memberSinceMonthYear}</span>
                  </div>
                  <div className="form-grid">
                    <label>
                      First name
                      <input
                        value={formProfile.firstName}
                        onChange={(event) =>
                          setFormProfile({
                            ...formProfile,
                            firstName: event.target.value,
                          })
                        }
                      />
                    </label>
                    <label>
                      Last name
                      <input
                        value={formProfile.lastName}
                        onChange={(event) =>
                          setFormProfile({
                            ...formProfile,
                            lastName: event.target.value,
                          })
                        }
                      />
                    </label>
                    <label>
                      Email address
                      <input
                        type="email"
                        value={formProfile.email}
                        onChange={(event) =>
                          setFormProfile({
                            ...formProfile,
                            email: event.target.value,
                          })
                        }
                      />
                    </label>
                    <label>
                      Phone number
                      <input
                        value={formProfile.phone}
                        onChange={(event) =>
                          setFormProfile({
                            ...formProfile,
                            phone: event.target.value,
                          })
                        }
                      />
                    </label>
                  </div>
                </section>

                <section className="settings-card">
                  <div className="settings-heading">
                    <div>
                      <p className="eyebrow">Communication</p>
                      <h2>Notification preferences</h2>
                    </div>
                  </div>
                  <div className="preference-list">
                    {[
                      [
                        "orders",
                        "Order updates",
                        "Shipping, delivery, and return updates.",
                      ],
                      [
                        "rewards",
                        "Rewards activity",
                        "Points earned, tier progress, and new perks.",
                      ],
                      [
                        "editorial",
                        "Chill Co. notes",
                        "Occasional product stories and collection previews.",
                      ],
                    ].map(([key, title, copy]) => (
                      <label className="preference-row" key={key}>
                        <span>
                          <strong>{title}</strong>
                          <small>{copy}</small>
                        </span>
                        <input
                          type="checkbox"
                          checked={
                            notifications[key as keyof typeof notifications]
                          }
                          onChange={() =>
                            setNotifications({
                              ...notifications,
                              [key]:
                                !notifications[
                                  key as keyof typeof notifications
                                ],
                            })
                          }
                        />
                      </label>
                    ))}
                  </div>
                </section>

                <div className="settings-actions">
                  <span role="status">
                    {settingsSaved ? "Changes saved successfully." : ""}
                  </span>
                  <button className="primary-button" type="submit">
                    {settingsSaved ? "Saved" : "Save changes"}
                    <Icon name="arrow" size={18} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
