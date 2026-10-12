"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/context/AuthContext";
import OrnamentalDivider from "./OrnamentalDivider";

interface Milestone {
  roman: string;
  name: string;
  pts: number;
  orders: number;
  perk: string;
  badgeImg: string;
  badgeAlt: string;
  tag: string;
  desc: string;
  isSummit?: boolean;
}

const MILESTONES: Milestone[] = [
  {
    roman: "I",
    name: "Explorer",
    pts: 30,
    orders: 3,
    perk: "25% Off Entire Order",
    badgeImg: "/images/badge-explorer.jpg",
    badgeAlt: "Explorer Ceylon Heritage Medallion",
    tag: "First Privilege",
    desc: "Reach 3 purchases to unlock 25% off. Your earned points remain 100% intact so your journey upwards continues without pause.",
  },
  {
    roman: "II",
    name: "Curator",
    pts: 60,
    orders: 6,
    perk: "50% Off Entire Order",
    badgeImg: "/images/badge-curator.jpg",
    badgeAlt: "Curator Ceylon Heritage Medallion",
    tag: "Mid-Ascent Privilege",
    desc: "Unlock half-price luxury on any collection piece. Your points are never consumed so you stay squarely on track for the summit.",
  },
  {
    roman: "III",
    name: "Culturalist",
    pts: 100,
    orders: 10,
    perk: "100% Off · Free Signature Tee",
    badgeImg: "/images/badge-culturalist.jpg",
    badgeAlt: "Culturalist Ceylon Heritage Medallion",
    tag: "The Ultimate Summit",
    desc: "Complete the 100-point ascension ladder to claim a complimentary handcrafted shirt at checkout. Points reset to 0 to begin a new cycle.",
    isSummit: true,
  },
];

const MEMBER_PERKS = [
  {
    title: "10 Points Per Purchase",
    desc: "Every order credits 10 points directly to your ascension ladder balance.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    title: "Points Stay Preserved",
    desc: "Claiming your 25% and 50% discount vouchers never deducts your points.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Complimentary Summit Piece",
    desc: "Reach 100 points to receive a 100% off voucher for any signature t-shirt.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    title: "Affiliate Ambassador",
    desc: "Share your dedicated invite code to earn 10% commission on orders.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
];

export default function RewardsProgramSection() {
  const { user } = useAuth();

  const ctaDestination = user
    ? "/account?tab=rewards"
    : "/account/signup?redirect=%2Faccount%3Ftab%3Drewards";

  const loginDestination = "/account/login?redirect=%2Faccount%3Ftab%3Drewards";

  return (
    <section
      aria-label="Chill Co. Rewards Program"
      className="relative overflow-hidden bg-[#0a0704] text-[#f0e6d3] py-16 md:py-28 px-4 sm:px-6 md:px-12"
    >
      {/* Ambient background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 65% 50% at 50% 15%, rgba(125, 91, 49, 0.14) 0%, transparent 70%), radial-gradient(ellipse 45% 40% at 85% 85%, rgba(201, 169, 110, 0.06) 0%, transparent 65%)",
        }}
      />

      {/* Subtle background ghosted texture watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-1/4 w-[480px] h-[480px] rounded-full opacity-[0.035] -z-10"
        style={{
          background:
            "radial-gradient(circle, #c9a96e 0%, #7d5b31 40%, transparent 70%)",
        }}
      />

      <div className="max-w-[1300px] mx-auto">
        {/* Top ornamental accent */}
        <div className="mb-6 md:mb-10 opacity-75">
          <OrnamentalDivider color="#7d5b31" />
        </div>

        {/* Section Header */}
        <div className="text-center max-w-[820px] mx-auto mb-12 md:mb-20">
          <div className="inline-flex items-center gap-3 mb-3 md:mb-4">
            <span className="w-6 md:w-10 h-[1px] bg-[rgba(201,169,110,0.5)]" />
            <span className="text-[0.58rem] md:text-[0.62rem] font-semibold tracking-[0.36em] uppercase text-[#c9a96e]">
              Inner Circle Privilege
            </span>
            <span className="w-6 md:w-10 h-[1px] bg-[rgba(201,169,110,0.5)]" />
          </div>

          <h2 className="text-[clamp(2rem,5.5vw,3.6rem)] font-extrabold tracking-[-0.025em] leading-[1.08] text-[#f0e6d3] mb-4 md:mb-5">
            To Unlock Exciting <span className="gold-text">Rewards.</span>
          </h2>

          <p className="text-[0.88rem] md:text-[1rem] leading-[1.8] text-[rgba(240,230,211,0.65)] font-light max-w-[660px] mx-auto">
            Become a member to ascend through our three-tier privilege ladder.
            Every purchase grants <strong className="text-[#e8d5b0] font-semibold">10 loyalty points</strong>.
            Unlock up to <strong className="text-[#e8d5b0] font-semibold">50% off</strong> with zero points deducted,
            and summit at 100 points for a <strong className="text-[#e8d5b0] font-semibold">complimentary piece</strong>.
          </p>
        </div>

        {/* Visual Ladder Stepper Bar (Responsive) */}
        <div className="mb-12 md:mb-16 bg-[#130d08]/70 border border-[rgba(125,91,49,0.22)] rounded-2xl p-5 md:p-8 backdrop-blur-md">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 relative">
            {/* Step 0: Start */}
            <div className="flex items-center gap-3.5 w-full md:w-auto">
              <div className="w-10 h-10 rounded-full border border-[rgba(201,169,110,0.4)] bg-[#1c120a] flex items-center justify-center text-[#c9a96e] text-xs font-bold shrink-0 shadow-[0_0_12px_rgba(125,91,49,0.2)]">
                0
              </div>
              <div>
                <span className="block text-[0.6rem] uppercase tracking-[0.2em] text-[#7d5b31] font-semibold">
                  Enrollment
                </span>
                <span className="text-sm font-medium text-[#f0e6d3]">
                  Create Account
                </span>
              </div>
            </div>

            {/* Connecting Line 1 */}
            <div className="hidden md:flex flex-1 items-center px-2">
              <div className="h-[2px] w-full bg-gradient-to-r from-[rgba(125,91,49,0.3)] via-[rgba(201,169,110,0.5)] to-[rgba(125,91,49,0.3)]" />
              <span className="text-[0.55rem] text-[#c9a96e] tracking-wider uppercase font-semibold px-2 whitespace-nowrap">
                +10 pts / drop
              </span>
              <div className="h-[2px] w-full bg-gradient-to-r from-[rgba(125,91,49,0.3)] via-[rgba(201,169,110,0.5)] to-[rgba(125,91,49,0.3)]" />
            </div>

            {/* Step 1: 30 pts */}
            <div className="flex items-center gap-3.5 w-full md:w-auto">
              <div className="w-10 h-10 rounded-full border border-[#c9a96e] bg-[#22150c] flex items-center justify-center text-[#e8d5b0] text-xs font-bold shrink-0 shadow-[0_0_14px_rgba(201,169,110,0.25)]">
                30
              </div>
              <div>
                <span className="block text-[0.6rem] uppercase tracking-[0.2em] text-[#c9a96e] font-semibold">
                  Tier I · Explorer
                </span>
                <span className="text-sm font-medium text-[#f0e6d3]">
                  25% Off Voucher
                </span>
              </div>
            </div>

            {/* Connecting Line 2 */}
            <div className="hidden md:flex flex-1 items-center px-2">
              <div className="h-[2px] w-full bg-gradient-to-r from-[rgba(125,91,49,0.3)] via-[rgba(201,169,110,0.5)] to-[rgba(125,91,49,0.3)]" />
              <span className="text-[0.55rem] text-[#c9a96e] tracking-wider uppercase font-semibold px-2 whitespace-nowrap">
                Keep All Pts
              </span>
              <div className="h-[2px] w-full bg-gradient-to-r from-[rgba(125,91,49,0.3)] via-[rgba(201,169,110,0.5)] to-[rgba(125,91,49,0.3)]" />
            </div>

            {/* Step 2: 60 pts */}
            <div className="flex items-center gap-3.5 w-full md:w-auto">
              <div className="w-10 h-10 rounded-full border border-[#c9a96e] bg-[#22150c] flex items-center justify-center text-[#e8d5b0] text-xs font-bold shrink-0 shadow-[0_0_14px_rgba(201,169,110,0.25)]">
                60
              </div>
              <div>
                <span className="block text-[0.6rem] uppercase tracking-[0.2em] text-[#c9a96e] font-semibold">
                  Tier II · Curator
                </span>
                <span className="text-sm font-medium text-[#f0e6d3]">
                  50% Off Voucher
                </span>
              </div>
            </div>

            {/* Connecting Line 3 */}
            <div className="hidden md:flex flex-1 items-center px-2">
              <div className="h-[2px] w-full bg-gradient-to-r from-[rgba(125,91,49,0.3)] via-[#c9a96e] to-[rgba(125,91,49,0.3)]" />
              <span className="text-[0.55rem] text-[#e8d5b0] tracking-wider uppercase font-semibold px-2 whitespace-nowrap">
                The Summit
              </span>
              <div className="h-[2px] w-full bg-gradient-to-r from-[rgba(125,91,49,0.3)] via-[#c9a96e] to-[rgba(125,91,49,0.3)]" />
            </div>

            {/* Step 3: 100 pts */}
            <div className="flex items-center gap-3.5 w-full md:w-auto">
              <div className="w-11 h-11 rounded-full border-2 border-[#e8d5b0] bg-gradient-to-br from-[#7d5b31] to-[#2a1708] flex items-center justify-center text-[#fff] text-xs font-extrabold shrink-0 shadow-[0_0_20px_rgba(201,169,110,0.45)]">
                100
              </div>
              <div>
                <span className="block text-[0.6rem] uppercase tracking-[0.2em] text-[#e8d5b0] font-semibold">
                  Tier III · Culturalist
                </span>
                <span className="text-sm font-bold text-[#e8d5b0]">
                  100% Free Piece
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Milestone Privilege Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6 mb-12 md:mb-16">
          {MILESTONES.map((milestone) => (
            <Link
              key={milestone.roman}
              href={ctaDestination}
              className={`group block relative rounded-2xl p-7 md:p-8 transition-all duration-500 overflow-hidden text-left text-decoration-none ${
                milestone.isSummit
                  ? "bg-gradient-to-b from-[#180f09] via-[#140c07] to-[#0e0905] border-2 border-[rgba(201,169,110,0.48)] shadow-[0_12px_40px_rgba(125,91,49,0.18)] hover:border-[#c9a96e]"
                  : "bg-[#120c08]/85 border border-[rgba(125,91,49,0.25)] hover:border-[rgba(201,169,110,0.45)] hover:bg-[#160e0a]"
              } hover:-translate-y-1.5`}
              style={{ textDecoration: "none" }}
            >
              {/* Summit crown glow aura */}
              {milestone.isSummit && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-44 rounded-full opacity-20 blur-2xl"
                  style={{
                    background:
                      "radial-gradient(ellipse, #c9a96e 0%, #7d5b31 60%, transparent 100%)",
                  }}
                />
              )}

              {/* Card top row: Tag + Roman Numeral */}
              <div className="flex items-center justify-between mb-6 relative z-10">
                <span
                  className={`inline-block text-[0.56rem] font-bold uppercase tracking-[0.24em] px-3 py-1 rounded-full ${
                    milestone.isSummit
                      ? "bg-[rgba(201,169,110,0.16)] text-[#e8d5b0] border border-[rgba(201,169,110,0.35)]"
                      : "bg-[rgba(125,91,49,0.14)] text-[#c9a96e] border border-[rgba(125,91,49,0.22)]"
                  }`}
                >
                  {milestone.tag}
                </span>
                <span className="text-[0.72rem] font-bold tracking-[0.2em] text-[rgba(240,230,211,0.35)] group-hover:text-[#c9a96e] transition-colors">
                  ROMAN {milestone.roman}
                </span>
              </div>

              {/* Medallion Showcase with subtle orbit ring */}
              <div className="flex justify-center mb-6 relative z-10">
                <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full p-1 border border-[rgba(201,169,110,0.3)] bg-[#0d0703] group-hover:border-[#c9a96e] transition-colors duration-500 shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
                  {/* Rotating dashed gold orbit */}
                  <div
                    aria-hidden="true"
                    className="absolute -inset-1 rounded-full border border-dashed border-[rgba(201,169,110,0.35)] group-hover:border-[rgba(201,169,110,0.7)] group-hover:rotate-45 transition-all duration-700 pointer-events-none"
                  />
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image
                      src={milestone.badgeImg}
                      alt={milestone.badgeAlt}
                      fill
                      sizes="(max-width: 768px) 96px, 112px"
                      className="object-cover transition-transform duration-700 group-hover:scale-108"
                    />
                  </div>
                </div>
              </div>

              {/* Title & Points threshold */}
              <div className="text-center mb-4 relative z-10">
                <h3 className="text-xl md:text-2xl font-bold text-[#f0e6d3] tracking-[-0.01em] mb-1">
                  {milestone.name}
                </h3>
                <span className="inline-block text-[0.62rem] uppercase tracking-[0.22em] text-[#c9a96e] font-semibold">
                  {milestone.pts} Points · {milestone.orders} Orders
                </span>
              </div>

              {/* Privilege banner */}
              <div
                className={`py-2.5 px-4 rounded-xl text-center mb-4 relative z-10 border ${
                  milestone.isSummit
                    ? "bg-[#25160d] border-[rgba(201,169,110,0.4)] text-[#f5efe6]"
                    : "bg-[#180f0a] border-[rgba(125,91,49,0.25)] text-[#e8d5b0]"
                }`}
              >
                <span className="block text-sm md:text-[0.95rem] font-bold tracking-tight">
                  {milestone.perk}
                </span>
              </div>

              {/* Description */}
              <p className="text-[0.8rem] leading-[1.7] text-[rgba(240,230,211,0.58)] font-light text-center mb-6 relative z-10">
                {milestone.desc}
              </p>

              {/* Bottom interactive link hint */}
              <div className="pt-4 border-t border-[rgba(125,91,49,0.18)] flex items-center justify-center gap-2 relative z-10">
                <span className="text-[0.62rem] uppercase tracking-[0.2em] font-semibold text-[#c9a96e] group-hover:text-[#f0e6d3] transition-colors">
                  {user ? "View In Account" : "Sign Up To Unlock"}
                </span>
                <span className="text-[#c9a96e] text-xs transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* 4 Pillars of Inner Circle Membership */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-14 md:mb-18">
          {MEMBER_PERKS.map((perk) => (
            <div
              key={perk.title}
              className="bg-[#120c08]/60 border border-[rgba(125,91,49,0.2)] rounded-xl p-5 md:p-6 transition-all duration-300 hover:border-[rgba(201,169,110,0.35)]"
            >
              <div className="w-9 h-9 rounded-lg bg-[#1e130b] border border-[rgba(201,169,110,0.25)] flex items-center justify-center text-[#c9a96e] mb-3.5">
                {perk.icon}
              </div>
              <h4 className="text-sm font-semibold text-[#f0e6d3] mb-1.5 tracking-tight">
                {perk.title}
              </h4>
              <p className="text-xs leading-[1.65] text-[rgba(240,230,211,0.55)] font-light">
                {perk.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Final CTA Container — Takes user to account after signing up */}
        <div className="relative rounded-2xl border border-[rgba(201,169,110,0.35)] bg-gradient-to-r from-[#170e08] via-[#1c110a] to-[#170e08] p-8 md:p-14 text-center overflow-hidden shadow-[0_16px_50px_rgba(0,0,0,0.45)]">
          {/* Subtle gold flare overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-15"
            style={{
              background:
                "radial-gradient(circle at 50% -20%, #c9a96e 0%, transparent 60%)",
            }}
          />

          <div className="max-w-[620px] mx-auto relative z-10">
            <span className="inline-block text-[0.58rem] font-bold uppercase tracking-[0.32em] text-[#c9a96e] mb-2.5">
              ✦ Seamless Automatic Enrollment ✦
            </span>

            <h3 className="text-2xl md:text-3xl font-extrabold text-[#f0e6d3] tracking-tight mb-3.5">
              Ready to begin your ascension?
            </h3>

            <p className="text-[0.84rem] md:text-[0.92rem] text-[rgba(240,230,211,0.65)] font-light leading-[1.75] mb-8">
              Sign up today to activate your loyalty vault. You will be directed
              straight into your account to monitor earned points, tier milestones,
              and redeemable vouchers.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={ctaDestination}
                className="btn-gold w-full sm:w-auto text-center justify-center px-8 py-3.5"
                style={{ textDecoration: "none" }}
              >
                <span>
                  {user
                    ? "View Your Rewards In Account →"
                    : "Create Account & Unlock Rewards →"}
                </span>
              </Link>
            </div>

            {/* Secondary login prompt for returning visitors */}
            {!user && (
              <p className="mt-5 text-xs text-[rgba(240,230,211,0.45)]">
                Already registered?{" "}
                <Link
                  href={loginDestination}
                  className="text-[#c9a96e] hover:text-[#f0e6d3] underline underline-offset-4 transition-colors"
                >
                  Sign In directly to your vault →
                </Link>
              </p>
            )}

            <div className="mt-6 flex items-center justify-center gap-2 text-[0.62rem] text-[rgba(240,230,211,0.4)] tracking-wider uppercase">
              <span>✦ Instant Activation</span>
              <span>·</span>
              <span>Points Never Expire</span>
              <span>·</span>
              <span>Direct Vault Access</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
