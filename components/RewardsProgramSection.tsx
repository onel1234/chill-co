"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/context/AuthContext";
import { Gift, ArrowRight } from "lucide-react";

export default function RewardsProgramSection() {
  const { user } = useAuth();

  const ctaDestination = user
    ? "/account?tab=rewards"
    : "/account/signup?redirect=%2Faccount%3Ftab%3Drewards";

  const loginDestination = "/account/login?redirect=%2Faccount%3Ftab%3Drewards";

  return (
    <section
      aria-label="Chill Co. Inner Circle Privileges"
      className="relative overflow-hidden bg-[#0a0704] text-[#f0e6d3] py-14 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-12"
    >
      {/* Background architectural grid texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #c9a96e 1px, transparent 1px),
            linear-gradient(to bottom, #c9a96e 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Ambient background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 65% 50% at 50% 50%, rgba(125, 91, 49, 0.12) 0%, transparent 70%), radial-gradient(ellipse 45% 45% at 80% 50%, rgba(201, 169, 110, 0.08) 0%, transparent 65%)",
        }}
      />

      <div className="max-w-[1240px] mx-auto relative">
        {/* Subtle grid crosshair top-center marker */}
        <div
          aria-hidden="true"
          className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[rgba(201,169,110,0.45)] text-xs font-mono select-none pointer-events-none hidden sm:block"
        >
          +
        </div>

        {/* Master Showcase Card */}
        <div className="relative rounded-[24px] sm:rounded-[32px] md:rounded-[36px] border border-[rgba(201,169,110,0.18)] bg-gradient-to-br from-[#140d08]/95 via-[#0d0905]/95 to-[#120c08]/95 backdrop-blur-xl shadow-[0_24px_80px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(201,169,110,0.2)] p-6 sm:p-10 md:p-12 lg:p-14 overflow-hidden">
          
          {/* Subtle vertical center divider on desktop */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-8 bottom-16 left-1/2 w-[1px] bg-[rgba(201,169,110,0.12)] pointer-events-none"
          />

          {/* Top-right corner index */}
          <div
            aria-hidden="true"
            className="absolute top-6 right-6 sm:top-8 sm:right-10 text-[rgba(201,169,110,0.4)] font-serif italic text-sm sm:text-base tracking-widest select-none"
          >
            01
          </div>

          {/* Main 2-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center mb-8 lg:mb-10">
            
            {/* Left Column: Privileges, Headline, Copy & CTA */}
            <div className="flex flex-col justify-center text-left max-w-[540px]">
              {/* Kicker / Eyebrow */}
              <span className="text-[0.62rem] sm:text-[0.66rem] font-semibold tracking-[0.34em] uppercase text-[#c9a96e] block mb-4 sm:mb-5">
                Inner Circle Privileges
              </span>

              {/* Headline */}
              <h2 className="text-[clamp(2.3rem,5vw,4.2rem)] font-light leading-[1.06] tracking-[-0.025em] text-[#f0e6d3] mb-5">
                Unlock <br />
                <span className="font-serif italic font-normal text-[#f5ede0]">exciting </span>
                <span className="font-serif italic font-normal gold-text">rewards.</span>
              </h2>

              {/* Narrative subtext */}
              <p className="text-[0.88rem] sm:text-[0.98rem] text-[rgba(240,230,211,0.68)] font-light leading-[1.8] max-w-[480px] mb-8">
                Every purchase brings something exceptional closer. Visit your account to discover your progress and the rewards waiting for you.
              </p>

              {/* Dual-state Gold Action Button */}
              <Link
                href={ctaDestination}
                className="group relative inline-flex items-center gap-3.5 sm:gap-4 bg-gradient-to-r from-[#d2ae6d] via-[#c49e58] to-[#b38b44] text-[#2c1b0d] rounded-2xl p-2.5 sm:p-3 pr-6 sm:pr-8 shadow-[0_8px_25px_rgba(201,169,110,0.2)] hover:shadow-[0_12px_35px_rgba(201,169,110,0.32)] hover:brightness-105 active:scale-[0.99] transition-all duration-300 max-w-full sm:max-w-md w-full"
                style={{ textDecoration: "none" }}
              >
                {/* Gift icon tile */}
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[rgba(44,27,13,0.12)] border border-[rgba(44,27,13,0.14)] flex items-center justify-center shrink-0 text-[#2c1b0d] group-hover:scale-105 transition-transform duration-300">
                  <Gift className="w-5 h-5 stroke-[1.8]" />
                </div>

                {/* Button text stack */}
                <div className="flex-1 text-left min-w-0">
                  <span className="block text-[0.58rem] sm:text-[0.62rem] font-semibold tracking-[0.16em] uppercase text-[#4d3319] truncate">
                    {user ? "Go to your account" : "Join the inner circle"}
                  </span>
                  <span className="block text-[0.92rem] sm:text-[0.98rem] font-semibold text-[#2c1b0d] tracking-tight truncate">
                    {user ? "View your rewards" : "Unlock your rewards"}
                  </span>
                </div>

                {/* Arrow */}
                <div className="shrink-0 text-[#2c1b0d] transition-transform duration-300 group-hover:translate-x-1.5">
                  <ArrowRight className="w-5 h-5 stroke-[1.8]" />
                </div>
              </Link>

              {/* Discrete sign-in link stacked for returning guests */}
              {!user && (
                <div className="mt-5 flex flex-col gap-1 text-[0.78rem]">
                  <span className="text-[rgba(240,230,211,0.5)] font-light">
                    Already a member?
                  </span>
                  <Link
                    href={loginDestination}
                    className="text-[#c9a96e] hover:text-[#f0e6d3] underline underline-offset-4 transition-colors font-medium w-fit"
                  >
                    Sign in to your vault →
                  </Link>
                </div>
              )}
            </div>

            {/* Right Column: Concentric Astronomical Orbit & Medallion */}
            <div className="relative flex items-center justify-center py-6 sm:py-8 select-none">
              
              {/* Outer Orbit Ring */}
              <div
                aria-hidden="true"
                className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[390px] md:h-[390px] rounded-full border border-[rgba(201,169,110,0.14)] flex items-center justify-center"
              >
                {/* Orbit sparkle 1 (top-left ~10 o'clock) */}
                <span className="absolute top-[18%] left-[12%] text-[#c9a96e]/70 text-xs sm:text-sm select-none">
                  ✦
                </span>

                {/* Orbit sparkle 2 (bottom-right ~4 o'clock) */}
                <span className="absolute bottom-[20%] right-[14%] text-[#c9a96e]/50 text-[10px] sm:text-xs select-none">
                  ✦
                </span>

                {/* Top Orbit Pip & "Rewards · Reserved" label */}
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#c9a96e] shadow-[0_0_10px_rgba(201,169,110,0.8)] block" />
                  <span className="absolute top-2 left-6 whitespace-nowrap font-serif italic text-[0.68rem] sm:text-xs text-[rgba(201,169,110,0.55)] tracking-wide pointer-events-none">
                    Rewards · Reserved
                  </span>
                </div>

                {/* Middle Orbit Ring (dashed) */}
                <div className="relative w-[220px] h-[220px] sm:w-[270px] sm:h-[270px] md:w-[300px] md:h-[300px] rounded-full border border-[rgba(201,169,110,0.22)] border-dashed flex items-center justify-center">
                  
                  {/* Bottom Orbit Pip & "The Inner Circle" label */}
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#c9a96e]/85 shadow-[0_0_8px_rgba(201,169,110,0.6)] block" />
                    <span className="absolute bottom-2 -left-28 whitespace-nowrap font-serif italic text-[0.68rem] sm:text-xs text-[rgba(201,169,110,0.48)] tracking-wide pointer-events-none">
                      The Inner Circle
                    </span>
                  </div>

                  {/* Centered Gold Medallion */}
                  <Link
                    href={ctaDestination}
                    className="relative group/coin block transition-transform duration-500 hover:scale-105 active:scale-95"
                    style={{ textDecoration: "none" }}
                    title="View Inner Circle Rewards"
                  >
                    {/* Ambient halo glow */}
                    <div
                      aria-hidden="true"
                      className="absolute -inset-4 rounded-full opacity-40 blur-xl group-hover/coin:opacity-70 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(circle, rgba(201,169,110,0.45) 0%, rgba(125,91,49,0.2) 50%, transparent 75%)",
                      }}
                    />

                    {/* Outer beveled metallic gold rim */}
                    <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full p-[6px] sm:p-2 bg-gradient-to-br from-[#d4b070] via-[#5a3a16] to-[#d4b070] shadow-[0_16px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(201,169,110,0.22)]">
                      {/* Secondary concentric inner stepped rim */}
                      <div className="relative w-full h-full rounded-full p-1 bg-gradient-to-tr from-[#1b1007] via-[#2d1b0d] to-[#120a04] border border-[rgba(201,169,110,0.5)] overflow-hidden flex items-center justify-center">
                        
                        {/* Micro-engraved arc text border */}
                        <svg
                          viewBox="0 0 200 200"
                          className="absolute inset-0 w-full h-full pointer-events-none z-10"
                        >
                          <path
                            id="rewardsCoinTextTop"
                            d="M 30,100 A 70,70 0 0,1 170,100"
                            fill="none"
                          />
                          <path
                            id="rewardsCoinTextBottom"
                            d="M 170,100 A 70,70 0 0,1 30,100"
                            fill="none"
                          />
                          <text className="text-[7.5px] font-semibold uppercase tracking-[0.32em] fill-[rgba(232,213,176,0.65)]">
                            <textPath href="#rewardsCoinTextTop" startOffset="50%" textAnchor="middle">
                              CULTURE • COLLECTED
                            </textPath>
                          </text>
                          <text className="text-[7px] font-semibold uppercase tracking-[0.34em] fill-[rgba(201,169,110,0.55)]">
                            <textPath href="#rewardsCoinTextBottom" startOffset="50%" textAnchor="middle">
                              MEMBER PRIVILEGE
                            </textPath>
                          </text>
                        </svg>

                        {/* Center Medallion Image (The Ceylon Summit Medallion) */}
                        <div className="relative w-[78%] h-[78%] rounded-full overflow-hidden border border-[rgba(201,169,110,0.4)] shadow-[inset_0_2px_10px_rgba(0,0,0,0.8)]">
                          <Image
                            src="/images/badge-culturalist.jpg"
                            alt="Chill Co. Inner Circle Royal Medallion"
                            fill
                            sizes="(max-width: 640px) 130px, (max-width: 768px) 160px, 180px"
                            className="object-cover transition-transform duration-700 group-hover/coin:scale-110"
                          />

                          {/* Dynamic metallic sheen reflection on hover */}
                          <div
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 opacity-20 group-hover/coin:opacity-40 transition-opacity duration-500"
                            style={{
                              background:
                                "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(201,169,110,0.1) 40%, transparent 60%)",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Track Indicator */}
          <div className="border-t border-[rgba(201,169,110,0.12)] pt-5 pb-1 flex items-center justify-center gap-4 sm:gap-8 text-[0.58rem] sm:text-[0.62rem] tracking-[0.28em] uppercase text-[rgba(201,169,110,0.5)] font-semibold">
            <span>COLLECT</span>
            <span className="w-6 sm:w-12 h-[1px] bg-[rgba(201,169,110,0.22)]" />
            <span>UNLOCK</span>
            <span className="w-6 sm:w-12 h-[1px] bg-[rgba(201,169,110,0.22)]" />
            <span>ENJOY</span>
          </div>
        </div>
      </div>
    </section>
  );
}
