"use client";

import React, { useMemo, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import { createClient } from "@/lib/supabase/client";
import { Order, AffiliateCode, AffiliateSettings } from "@/lib/types";
import { products } from "@/lib/data/products";
import ContactModal from "./ContactModal";
import "@/app/account/account.css";

type IconName =
  | "arrow"
  | "bag"
  | "check"
  | "chevron"
  | "copy"
  | "gift"
  | "heart"
  | "link"
  | "logout"
  | "menu"
  | "package"
  | "search"
  | "settings"
  | "shield"
  | "spark"
  | "user"
  | "users";

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
    check: <path d="M20 6 9 17l-5-5" />,
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
    link: (
      <>
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </>
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
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
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
    users: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
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
  { label: "Referrals", icon: "users" },
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
  const [affiliateStats, setAffiliateStats] = useState<{
    total_referrals: number;
    total_points_earned: number;
    recent_referrals: Array<{ id: string; code_used: string; points_awarded: number; created_at: string }>;
  } | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const [settingsSaved, setSettingsSaved] = useState(false);
  const [wheelStageIndex, setWheelStageIndex] = useState<number | null>(null);

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

  const navContainerRef = React.useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const tabParam = new URLSearchParams(window.location.search).get("tab");
      if (tabParam) {
        const matched = navItems.find(
          (item) => item.label.toLowerCase() === tabParam.toLowerCase()
        );
        if (matched) {
          setActiveNav(matched.label);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (navContainerRef.current) {
      const activeBtn = navContainerRef.current.querySelector<HTMLButtonElement>("button.active");
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
      }
    }
  }, [activeNav]);

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
      const [codesRes, settingsRes, statsRes] = await Promise.all([
        fetch("/api/affiliate/my-codes"),
        fetch("/api/affiliate/settings"),
        fetch("/api/affiliate/stats"),
      ]);
      const codesData = await codesRes.json();
      const settingsData = await settingsRes.json();
      const statsData = await statsRes.json();
      if (Array.isArray(codesData)) setAffiliateCodes(codesData);
      if (settingsData && !settingsData.error) setAffiliateSettings(settingsData);
      if (statsData && !statsData.error) setAffiliateStats(statsData);
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

  const referralLink = useMemo(() => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/account/signup?ref=${defaultReferralCode}`;
    }
    return `https://chillco.store/account/signup?ref=${defaultReferralCode}`;
  }, [defaultReferralCode]);

  async function copyReferralLink() {
    navigator.clipboard?.writeText(referralLink);
    setCopiedLink(true);
    window.setTimeout(() => setCopiedLink(false), 1800);

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

  const pointsPerReferral = affiliateSettings?.points_per_referral ?? 5;

  const defaultWheelIdx = Math.max(
    0,
    sortedTiers.findIndex(
      (t) => t.name === (activeRewardTier || nextTier)?.name
    )
  );
  const currentWheelIdx =
    wheelStageIndex !== null
      ? ((wheelStageIndex % sortedTiers.length) + sortedTiers.length) %
        sortedTiers.length
      : defaultWheelIdx;

  const renderRewardFocusWheel = () => {
    const totalStages = sortedTiers.length;
    const prevIdx = (currentWheelIdx - 1 + totalStages) % totalStages;
    const nextIdx = (currentWheelIdx + 1) % totalStages;

    const focusedStage = sortedTiers[currentWheelIdx];
    const nextStage = sortedTiers[nextIdx];

    const isFocusedUnlocked = loyaltyPoints >= focusedStage.required_points;
    const isFocusedClaimed =
      isFocusedUnlocked &&
      validClaimedTiers.some(
        (c) => c.toLowerCase() === focusedStage.name.toLowerCase()
      );
    const isDefaultNextTarget =
      !isFocusedUnlocked && focusedStage.name === nextTier?.name;

    const statusLabel = isFocusedClaimed
      ? "Claimed reward"
      : isFocusedUnlocked
        ? "Unlocked reward"
        : isDefaultNextTarget
          ? "Next reward"
          : `Stage 0${currentWheelIdx + 1}`;

    const romanNumerals = ["I", "II", "III"];

    return (
      <div
        className="reward-tier reward-focus-wheel"
        aria-label="Reward stage focus wheel"
        onWheel={(e) => {
          if (Math.abs(e.deltaY) > 8) {
            e.preventDefault();
            setWheelStageIndex(e.deltaY > 0 ? nextIdx : prevIdx);
          }
        }}
      >
        <div className="focus-wheel-dial" aria-hidden="false">
          <svg
            className="focus-wheel-svg"
            viewBox="0 0 84 196"
            aria-hidden="true"
          >
            <path
              d="M 56 14 Q 14 98 56 182"
              fill="none"
              stroke="rgba(227, 189, 121, 0.22)"
              strokeWidth="1"
            />
            <path
              d="M 60 22 Q 22 98 60 174"
              fill="none"
              stroke="rgba(227, 189, 121, 0.14)"
              strokeWidth="1"
              strokeDasharray="2 4"
            />
            <circle
              cx="36"
              cy="98"
              r="34"
              fill="none"
              stroke="rgba(227, 189, 121, 0.34)"
              strokeWidth="1"
              strokeDasharray="1.5 4.5"
            />
            <polygon
              points="1,98 6,94.5 6,101.5"
              fill="rgba(227, 189, 121, 0.78)"
            />
          </svg>

          {sortedTiers.map((tier, idx) => {
            let rel = (idx - currentWheelIdx) % totalStages;
            if (rel < 0) rel += totalStages;
            const slot = rel === 2 ? -1 : rel; // -1 = top, 0 = center focal, 1 = bottom
            const badgeSrc =
              tierBadgeMap[tier.name] || "/images/badge-explorer.jpg";
            const isTierUnlocked = loyaltyPoints >= tier.required_points;

            return (
              <button
                key={tier.name}
                type="button"
                data-slot={slot}
                className={`focus-wheel-medallion ${isTierUnlocked ? "is-unlocked" : ""}`}
                onClick={() => setWheelStageIndex(idx)}
                aria-label={`${tier.name} stage (${tier.discount_percentage}% off at ${tier.required_points} points)`}
                title={`${tier.name} · ${tier.discount_percentage}% off (${tier.required_points} pts)`}
              >
                <img src={badgeSrc} alt={tier.name} />
              </button>
            );
          })}
        </div>

        <div className="focus-wheel-readout">
          <div className="focus-wheel-eyebrow">
            <span className={isFocusedUnlocked ? "is-unlocked" : ""}>
              {statusLabel}
            </span>
            <em>
              {romanNumerals[currentWheelIdx] || currentWheelIdx + 1} /{" "}
              {romanNumerals[totalStages - 1] || totalStages}
            </em>
          </div>

          <strong>{focusedStage.name}</strong>

          <small className="focus-wheel-perk">
            {focusedStage.discount_percentage}% off ·{" "}
            {focusedStage.required_points} pts
          </small>

          <div className="focus-wheel-stepper">
            <div
              className="focus-wheel-numerals"
              role="tablist"
              aria-label="Reward stages"
            >
              {sortedTiers.map((tier, idx) => (
                <button
                  key={tier.name}
                  type="button"
                  role="tab"
                  aria-selected={idx === currentWheelIdx}
                  className={`focus-numeral-btn ${idx === currentWheelIdx ? "active" : ""}`}
                  onClick={() => setWheelStageIndex(idx)}
                  title={`${tier.name} (${tier.discount_percentage}% off)`}
                >
                  {romanNumerals[idx] || idx + 1}
                </button>
              ))}
            </div>

            <button
              type="button"
              className="focus-wheel-next-btn"
              onClick={() => setWheelStageIndex(nextIdx)}
              aria-label={`Rotate to ${nextStage.name}`}
            >
              <span>
                <em className="focus-wheel-next-highlight">Next:</em>{" "}
                {nextStage.name}
              </span>
              <Icon name="arrow" size={12} />
            </button>
          </div>

          {activeNav !== "Rewards" && (
            <button
              type="button"
              className="focus-wheel-more-info"
              onClick={() => {
                setActiveNav("Rewards");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              More info →
            </button>
          )}
        </div>
      </div>
    );
  };

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
      copy: "Earn 10 points per purchase, unlock perks, and climb the ladder.",
    },
    Referrals: {
      title: "Affiliate & Referrals.",
      copy: "Share Chill Co. with friends and earn 5 loyalty points on their first purchase.",
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

            <nav ref={navContainerRef} className="account-nav" aria-label="Account navigation">
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
                          ? `You've reached 100 points and become a Culturalist! Claim your 100% off discount at checkout — points revert to 0 after claiming.`
                          : `You've unlocked your ${activeRewardTier.discount_percentage}% off ${activeRewardTier.name} discount for checkout (${pointsRemaining} more pts to ${nextTier.name}).`
                        : pointsRemaining > 0
                          ? `Just ${pointsRemaining} more points to unlock your ${nextTier.discount_percentage}% off ${nextTier.name} discount.`
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

                  {renderRewardFocusWheel()}
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
                    <small>Earn {pointsPerReferral} points on first purchase</small>
                  </article>
                </section>
              </>
            )}

            {activeNav === "Orders" && (
              <section className="orders-section">
                <div className="section-heading">
                  <div>
                    <p className="eyebrow">All purchases</p>
                    <h2>Order history</h2>
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
                    {activeNav === "Orders" &&
                      visibleOrders.length > ORDERS_PER_PAGE && (
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
                        ? `${activeRewardTier.discount_percentage}% discount unlocked.`
                        : "Your next perk awaits."}
                    </h2>
                    <ul className="reward-points-list">
                      <li>
                        <span className="reward-bullet">✦</span>
                        <span>
                          <strong>Earn</strong> — Each purchase carries 10 points.
                        </span>
                      </li>
                      <li>
                        <span className="reward-bullet">✦</span>
                        <span>
                          <strong>Unlock</strong> — 25% off (30 pts) · 50% off (60 pts) · 100% off (100 pts).
                        </span>
                      </li>
                      <li>
                        <span className="reward-bullet">✦</span>
                        <span>
                          <strong>Keep climbing</strong> — Points only reset after claiming 100% off at 100 pts.
                        </span>
                      </li>
                    </ul>
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
                  {renderRewardFocusWheel()}
                </section>

                <section
                  className="ascension-ladder-section"
                  aria-label="100-point ascension ladder to complimentary shirt"
                >
                  <div className="section-heading ladder-section-heading">
                    <div>
                      <p className="eyebrow">Ascension ladder · 0 to 100 pts</p>
                      <h2>Path to the complimentary shirt</h2>
                    </div>
                  </div>

                  <div className="ladder-container">
                    {/* Vertical Dual-Rail Ladder */}
                    <div className="ladder-vertical-body">
                      {[
                        {
                          pts: 10,
                          rungNum: "01",
                          type: "minor" as const,
                        },
                        {
                          pts: 20,
                          rungNum: "02",
                          type: "minor" as const,
                        },
                        {
                          pts: 30,
                          rungNum: "03",
                          type: "major" as const,
                          stageIdx: 0,
                          roman: "I",
                          name: "Explorer",
                          subtitle: "First Milestone Privilege",
                          perk: "25% Off",
                          perkNote: "Points stay intact",
                          badgeImg: "/images/badge-explorer.jpg",
                          prevMilestonePts: 0,
                          copy: "Unlock your 25% discount at 30 points. Claiming this reward at checkout does not reset your points — you keep all 30 points as you continue climbing.",
                        },
                        {
                          pts: 40,
                          rungNum: "04",
                          type: "minor" as const,
                        },
                        {
                          pts: 50,
                          rungNum: "05",
                          type: "minor" as const,
                        },
                        {
                          pts: 60,
                          rungNum: "06",
                          type: "major" as const,
                          stageIdx: 1,
                          roman: "II",
                          name: "Curator",
                          subtitle: "Mid-Ascent Privilege",
                          perk: "50% Off",
                          perkNote: "Points stay intact",
                          badgeImg: "/images/badge-curator.jpg",
                          prevMilestonePts: 30,
                          copy: "Reach the halfway mark of the upper climb to unlock 50% off. Your points remain untouched after claiming so you stay on course for 100.",
                        },
                        {
                          pts: 70,
                          rungNum: "07",
                          type: "minor" as const,
                        },
                        {
                          pts: 80,
                          rungNum: "08",
                          type: "minor" as const,
                        },
                        {
                          pts: 90,
                          rungNum: "09",
                          type: "minor" as const,
                        },
                        {
                          pts: 100,
                          rungNum: "10",
                          type: "major" as const,
                          stageIdx: 2,
                          roman: "III",
                          name: "Culturalist",
                          subtitle: "The Summit · Complimentary Piece",
                          perk: "100% Off · Free Shirt",
                          perkNote: "Resets to 0 after claim",
                          badgeImg: "/images/badge-culturalist.jpg",
                          prevMilestonePts: 60,
                          isSummit: true,
                          copy: "Complete the 100-point ladder to unlock a complimentary T-shirt (100% off) at checkout. Once claimed, your points reset to 0 to begin a new cycle.",
                        },
                      ].map((step) => {
                        const isReached = loyaltyPoints >= step.pts;
                        const isNextStep =
                          loyaltyPoints < step.pts &&
                          loyaltyPoints >= step.pts - 10;

                        if (step.type === "minor") {
                          return (
                            <div
                              key={step.pts}
                              className={`ladder-row ladder-minor-row ${
                                isReached
                                  ? "is-reached"
                                  : isNextStep
                                    ? "is-current"
                                    : ""
                              }`}
                            >
                              <div className="ladder-rail-cell">
                                <span className="ladder-rung-crossbar" />
                                <span className="ladder-rung-node" />
                              </div>
                              <div className="ladder-minor-content">
                                <span className="ladder-minor-pts">
                                  Rung {step.rungNum} · {step.pts} pts
                                </span>
                                <span className="ladder-minor-line" />
                                <span className="ladder-minor-state">
                                  {isReached
                                    ? "Reached"
                                    : isNextStep
                                      ? `${step.pts - loyaltyPoints} pts to rung`
                                      : `${step.pts} pts`}
                                </span>
                              </div>
                            </div>
                          );
                        }

                        const isClaimed =
                          isReached &&
                          validClaimedTiers.some(
                            (c) =>
                              c.toLowerCase() === step.name.toLowerCase()
                          );
                        const isFocusedOnWheel =
                          currentWheelIdx === step.stageIdx;
                        const segmentSpan = step.pts - step.prevMilestonePts;
                        const segmentEarned = Math.max(
                          0,
                          Math.min(
                            segmentSpan,
                            loyaltyPoints - step.prevMilestonePts
                          )
                        );
                        const segmentPct = Math.round(
                          (segmentEarned / segmentSpan) * 100
                        );
                        const ptsRemainingToMajor = Math.max(
                          0,
                          step.pts - loyaltyPoints
                        );

                        return (
                          <div
                            key={step.pts}
                            className={`ladder-row ladder-major-row ${
                              isReached
                                ? "is-reached"
                                : isNextStep || nextTier.name === step.name
                                  ? "is-next-milestone"
                                  : ""
                            } ${step.isSummit ? "is-summit" : ""} ${
                              isFocusedOnWheel ? "is-wheel-focused" : ""
                            }`}
                            onClick={() => setWheelStageIndex(step.stageIdx)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                setWheelStageIndex(step.stageIdx);
                              }
                            }}
                          >
                            <div className="ladder-rail-cell">
                              <span className="ladder-rung-crossbar major" />
                              <div className="ladder-major-seal">
                                <span>{step.roman}</span>
                              </div>
                              <span className="ladder-bridge-line" />
                            </div>

                            <article className="ladder-landing-card">
                              <div className="ladder-landing-medallion">
                                <div className="ladder-medallion-orbit" />
                                <div className="ladder-medallion-img-wrap">
                                  <img
                                    src={step.badgeImg}
                                    alt={`${step.name} heritage seal`}
                                  />
                                </div>
                              </div>

                              <div className="ladder-landing-info">
                                <div className="ladder-landing-eyebrow">
                                  <span>
                                    Rung {step.rungNum} · {step.pts} Points
                                  </span>
                                  <span className="ladder-eyebrow-dot">·</span>
                                  <span>{step.subtitle}</span>
                                </div>
                                <strong className="ladder-landing-title">
                                  {step.name}
                                  {step.isSummit && (
                                    <em className="ladder-summit-tag">
                                      ✦ Free Shirt Summit
                                    </em>
                                  )}
                                </strong>
                                <p className="ladder-landing-copy">
                                  {step.copy}
                                </p>
                              </div>

                              <div className="ladder-landing-aside">
                                <div className="ladder-perk-box">
                                  <span className="ladder-perk-eyebrow">
                                    Reward
                                  </span>
                                  <strong className="ladder-perk-highlight">
                                    {step.perk}
                                  </strong>
                                  <small className="ladder-perk-rule">
                                    {step.perkNote}
                                  </small>
                                </div>

                                <div className="ladder-stage-progress">
                                  <div className="ladder-stage-progress-labels">
                                    <span>
                                      {isClaimed
                                        ? "Reward claimed"
                                        : isReached
                                          ? "Unlocked · Ready at checkout"
                                          : `${ptsRemainingToMajor} pts to unlock`}
                                    </span>
                                    <strong>{segmentPct}%</strong>
                                  </div>
                                  <div className="ladder-stage-track">
                                    <div
                                      className="ladder-stage-fill"
                                      style={{ width: `${segmentPct}%` }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </article>
                          </div>
                        );
                      })}
                    </div>
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
                        rank: "Tier 1 · 30 Points",
                        name: "Explorer",
                        motif: "Sandakada · Sacred Lotus",
                        requiredPoints: 30,
                        benefit: "25% off",
                        badgeImg: "/images/badge-explorer.jpg",
                        lore: "Unlocks at 30 points with a 25% discount — your points stay intact as you progress toward Curator.",
                      },
                      {
                        rank: "Tier 2 · 60 Points",
                        name: "Curator",
                        motif: "Hansa Puttuwa · Twin Swans",
                        requiredPoints: 60,
                        benefit: "50% off",
                        badgeImg: "/images/badge-curator.jpg",
                        lore: "Unlocks at 60 points with a 50% discount — your points stay intact as you progress toward Culturalist.",
                      },
                      {
                        rank: "Tier 3 · 100 Points",
                        name: "Culturalist",
                        motif: "Makara Thorana · Ira Handa",
                        requiredPoints: 100,
                        benefit: "100% off",
                        badgeImg: "/images/badge-culturalist.jpg",
                        lore: "Unlocks at 100 points with a 100% discount — points revert back to 0 after claiming to begin a new cycle.",
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

              </div>
            )}

            {activeNav === "Referrals" && (
              <div className="referrals-page">
                {/* Hero / Code Card */}
                <section className="referrals-hero-card">
                  <div className="referrals-hero-content">
                    <span className="referrals-kicker">
                      <Icon name="spark" size={16} /> Official Affiliate Program
                    </span>
                    <h2>
                      Invite friends.
                      <br />
                      Earn 5 loyalty points.
                    </h2>
                    <p className="referrals-hero-desc">
                      Invite friends and creators to Chill Co. When they create an account and complete their first purchase with your referral code, you earn 5 loyalty points credited directly toward your next tier privilege.
                    </p>

                    <div className="referrals-code-box">
                      <div className="referrals-code-chip">
                        <span className="referrals-code-label">Your Referral Code</span>
                        <strong className="referrals-code-val">{defaultReferralCode}</strong>
                      </div>
                      <div className="referrals-code-actions">
                        <button
                          type="button"
                          className="referrals-action-btn primary"
                          onClick={copyReferralCode}
                        >
                          <Icon name={copied ? "check" : "copy"} size={16} />
                          <span>{copied ? "Code copied!" : "Copy code"}</span>
                        </button>
                        <button
                          type="button"
                          className="referrals-action-btn secondary"
                          onClick={copyReferralLink}
                        >
                          <Icon name={copiedLink ? "check" : "link"} size={16} />
                          <span>{copiedLink ? "Link copied!" : "Copy invite link"}</span>
                        </button>
                      </div>
                    </div>

                    <div className="referrals-link-preview">
                      <span className="referrals-link-label">Direct invite link:</span>
                      <div className="referrals-link-box">
                        <code>{referralLink}</code>
                        <button
                          type="button"
                          className="referrals-link-copy-icon-btn"
                          onClick={copyReferralLink}
                          aria-label="Copy direct invite link"
                          title="Copy link"
                        >
                          <Icon name={copiedLink ? "check" : "copy"} size={14} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="referrals-hero-badge-wrap">
                    <div className="referrals-hero-seal">
                      <div className="referrals-seal-frame">
                        <div className="referrals-seal-orbit" />
                        <img
                          src="/images/badge-affiliate.jpg"
                          alt="Chill Co. Peer-to-Peer Network Affiliate Seal"
                          className="referrals-seal-img"
                        />
                      </div>
                      <div className="referrals-seal-text">
                        <strong>Chill Co. Affiliate</strong>
                        <small>Peer-to-Peer Network</small>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Metrics / Stats Row */}
                <section className="referrals-stats-grid" aria-label="Referral Program Statistics">
                  <article className="referrals-stat-card">
                    <span className="stat-label">Total Referrals</span>
                    <strong className="stat-num">{affiliateStats?.total_referrals ?? 0}</strong>
                    <small className="stat-sub">Successful first purchases</small>
                  </article>

                  <article className="referrals-stat-card">
                    <span className="stat-label">Points Earned</span>
                    <strong className="stat-num">
                      {affiliateStats?.total_points_earned ??
                        (affiliateStats?.total_referrals ? affiliateStats.total_referrals * pointsPerReferral : 0)}{" "}
                      <em className="stat-unit">pts</em>
                    </strong>
                    <small className="stat-sub">Added to your loyalty balance</small>
                  </article>

                  <article className="referrals-stat-card">
                    <span className="stat-label">Qualifying Action</span>
                    <strong className="stat-num">
                      1st <em className="stat-unit">ORDER</em>
                    </strong>
                    <small className="stat-sub">Friend&apos;s first purchase</small>
                  </article>

                  <article className="referrals-stat-card">
                    <span className="stat-label">Your Reward</span>
                    <strong className="stat-num">
                      +5 <em className="stat-unit">PTS</em>
                    </strong>
                    <small className="stat-sub">Per unique qualified friend</small>
                  </article>
                </section>

                {/* How It Works */}
                <section className="referrals-steps-card">
                  <div className="section-heading">
                    <div>
                      <p className="eyebrow">Program Workflow</p>
                      <h2>How the affiliate program works</h2>
                    </div>
                  </div>

                  <div className="referrals-steps-grid">
                    <div className="referrals-step-item">
                      <div className="step-num">01</div>
                      <strong>Share Your Code</strong>
                      <p>
                        Share your unique code ({defaultReferralCode}) or direct invite link with friends via messaging or social channels.
                      </p>
                    </div>

                    <div className="referrals-step-item">
                      <div className="step-num">02</div>
                      <strong>Friend Signs Up</strong>
                      <p>
                        Your friend joins Chill Co. and enters your referral code during account registration.
                      </p>
                    </div>

                    <div className="referrals-step-item">
                      <div className="step-num">03</div>
                      <strong>First Purchase Completed</strong>
                      <p>
                        When they complete payment for their first order, our system securely validates the referral.
                      </p>
                    </div>

                    <div className="referrals-step-item">
                      <div className="step-num">04</div>
                      <strong>Points Deposited</strong>
                      <p>
                        You instantly receive 5 loyalty points to accelerate your climb toward 25%, 50%, or 100% off perks.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Terms & Conditions Section */}
                <section className="referrals-terms-card">
                  <div className="section-heading">
                    <div>
                      <p className="eyebrow">Terms & Conditions</p>
                      <h2>Affiliate & Referral Program Terms</h2>
                    </div>
                    <span className="terms-update-tag">Official Terms · October 2026</span>
                  </div>

                  <div className="referrals-terms-grid">
                    <article className="referrals-term-item">
                      <div className="term-header">
                        <span className="term-num">01</span>
                        <strong>Eligibility & Account Standing</strong>
                      </div>
                      <p>
                        All registered Chill Co. account holders in good standing are eligible to participate and generate an affiliate code. Chill Co. reserves the right to decline or suspend access for any account violating our general terms of service.
                      </p>
                    </article>

                    <article className="referrals-term-item">
                      <div className="term-header">
                        <span className="term-num">02</span>
                        <strong>Qualified Referral Criteria</strong>
                      </div>
                      <p>
                        A referral qualifies for rewards only when a new customer who has never previously registered or placed an order on Chill Co. creates an account using your referral code/link and successfully completes their first purchase.
                      </p>
                    </article>

                    <article className="referrals-term-item">
                      <div className="term-header">
                        <span className="term-num">03</span>
                        <strong>Reward Allocation & Loyalty Points</strong>
                      </div>
                      <p>
                        For each verified first purchase made by a qualified referral, the referrer will receive 5 loyalty points. Points are automatically credited to your loyalty balance upon verified order settlement.
                      </p>
                    </article>

                    <article className="referrals-term-item">
                      <div className="term-header">
                        <span className="term-num">04</span>
                        <strong>Referee First Purchase Requirement</strong>
                      </div>
                      <p>
                        Referral rewards are awarded upon the referred friend&apos;s first completed purchase. Referral codes connect the friend to your account without applying an order discount.
                      </p>
                    </article>

                    <article className="referrals-term-item">
                      <div className="term-header">
                        <span className="term-num">05</span>
                        <strong>Single Reward per Referee</strong>
                      </div>
                      <p>
                        Referral rewards are strictly one-time per unique referred person. Subsequent purchases by the same customer will not generate additional affiliate points for the referrer.
                      </p>
                    </article>

                    <article className="referrals-term-item">
                      <div className="term-header">
                        <span className="term-num">06</span>
                        <strong>Prohibition of Self-Referral & Abuse</strong>
                      </div>
                      <p>
                        Self-referrals (including creating duplicate accounts, using alias email addresses, or placing orders on behalf of oneself using one&apos;s own code) are strictly prohibited. Detected abuse will result in instant point cancellation and referral ban.
                      </p>
                    </article>

                    <article className="referrals-term-item">
                      <div className="term-header">
                        <span className="term-num">07</span>
                        <strong>Marketing & Distribution Guidelines</strong>
                      </div>
                      <p>
                        Referral codes and links must only be distributed via direct peer-to-peer communication, personal social profiles, and organic channels. Paid search advertising (e.g. Google Ads bidding on &quot;Chill Co.&quot; keywords) or spam is strictly prohibited.
                      </p>
                    </article>

                    <article className="referrals-term-item">
                      <div className="term-header">
                        <span className="term-num">08</span>
                        <strong>Loyalty Tier Integration</strong>
                      </div>
                      <p>
                        Points earned through the affiliate program carry full parity with purchase points (where each purchase earns 10 points) and directly count toward unlocking Explorer (30 pts · 25% off), Curator (60 pts · 50% off), and Culturalist (100 pts · 100% off).
                      </p>
                    </article>

                    <article className="referrals-term-item">
                      <div className="term-header">
                        <span className="term-num">09</span>
                        <strong>Modifications & Right of Termination</strong>
                      </div>
                      <p>
                        Chill Co. Apparel Enterprises reserves the right to amend, update, or discontinue the affiliate referral program, reward rates, or these terms and conditions at any time upon notice on this page.
                      </p>
                    </article>
                  </div>
                </section>
              </div>
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

                <section className="settings-card">
                  <div className="settings-heading">
                    <div>
                      <p className="eyebrow">Affiliate & Referrals</p>
                      <h2>Affiliate program</h2>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <p style={{ color: "var(--muted)", fontSize: "13px", lineHeight: 1.6, margin: 0 }}>
                      Share your code <strong style={{ color: "var(--gold-bright)", letterSpacing: "0.05em" }}>{defaultReferralCode}</strong> with friends. When they complete their first purchase, you receive 5 loyalty points.
                    </p>
                    <div>
                      <button
                        type="button"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "10px 18px",
                          borderRadius: "8px",
                          border: "1px solid rgba(227, 189, 121, 0.3)",
                          background: "rgba(198, 155, 84, 0.08)",
                          color: "var(--gold-bright)",
                          cursor: "pointer",
                          fontSize: "12px",
                          fontWeight: 500,
                        }}
                        onClick={() => {
                          setActiveNav("Referrals");
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                      >
                        <span>Open Referrals & Terms</span>
                        <Icon name="arrow" size={14} />
                      </button>
                    </div>
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
