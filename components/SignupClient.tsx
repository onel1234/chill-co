"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/context/AuthContext";

function SignupForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Affiliate / Referral state variables
  const [affiliateCode, setAffiliateCode] = useState("");
  const [showAffiliateField, setShowAffiliateField] = useState(false);
  const [affiliateValid, setAffiliateValid] = useState<boolean | null>(null);
  const [affiliateChecking, setAffiliateChecking] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isLoading: authLoading } = useAuth();
  const supabase = createClient();

  useEffect(() => {
    if (!authLoading && user) {
      router.push("/account");
    }
  }, [user, authLoading, router]);

  // Read ?ref=CODE on mount or restore from localStorage
  useEffect(() => {
    const refParam = searchParams.get("ref");
    if (refParam) {
      setAffiliateCode(refParam);
      setShowAffiliateField(true);
      if (typeof window !== "undefined") {
        localStorage.setItem("affiliate_ref_code", refParam);
      }
    } else if (typeof window !== "undefined") {
      const savedCode = localStorage.getItem("affiliate_ref_code");
      if (savedCode) {
        setAffiliateCode(savedCode);
        setShowAffiliateField(true);
      }
    }
  }, [searchParams]);

  // Function to validate affiliate code via API
  const validateAffiliateCode = async (code: string) => {
    const trimmed = code.trim();
    if (!trimmed) {
      setAffiliateValid(null);
      setAffiliateChecking(false);
      return;
    }

    setAffiliateChecking(true);
    setAffiliateValid(null);

    try {
      const res = await fetch(`/api/affiliate/validate-code?code=${encodeURIComponent(trimmed)}`);
      const data = await res.json();
      if (res.ok && data.valid) {
        setAffiliateValid(true);
      } else {
        setAffiliateValid(false);
      }
    } catch {
      setAffiliateValid(false);
    } finally {
      setAffiliateChecking(false);
    }
  };

  // Validate affiliate code on change (debounced)
  useEffect(() => {
    if (!affiliateCode.trim()) {
      setAffiliateValid(null);
      setAffiliateChecking(false);
      return;
    }

    const timer = setTimeout(() => {
      validateAffiliateCode(affiliateCode);
    }, 400);

    return () => clearTimeout(timer);
  }, [affiliateCode]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          ...(affiliateCode.trim() ? { affiliate_code: affiliateCode.trim() } : {}),
        },
      },
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      router.push("/account");
      router.refresh();
    }
  };

  const handleGoogleSignup = async () => {
    setIsGoogleLoading(true);
    setError(null);

    const codeToSave = affiliateCode.trim() || (typeof window !== "undefined" ? localStorage.getItem("affiliate_ref_code") || "" : "");
    if (codeToSave && typeof window !== "undefined") {
      localStorage.setItem("affiliate_ref_code", codeToSave);
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
    let redirectTo = `${siteUrl}/auth/callback`;
    if (codeToSave) {
      redirectTo += `?affiliate_ref=${encodeURIComponent(codeToSave)}`;
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
      },
    });
    if (error) {
      setError(error.message);
      setIsGoogleLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-margin-mobile py-24 bg-texture kinetic-bg">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-block mb-8">
            <img
              alt="Chill Co. Logo"
              className="h-16 w-auto mx-auto object-contain"
              src="/images/WhatsApp_Image_2026-07-26_at_23.42.00-removebg-preview.png"
            />
          </Link>
          <h1 className="font-headline-lg text-headline-lg-mobile uppercase tracking-tighter text-on-surface">
            Join Chill Co.
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">
            Create your account and stay effortlessly comfortable
          </p>
        </div>

        {/* Card */}
        <div className="bg-surface-container-lowest border border-surface-variant p-8 shadow-sm">
          {error && (
            <div className="mb-6 p-4 bg-error-container border border-error/20 flex items-start gap-3">
              <span className="material-symbols-outlined text-on-error-container text-sm mt-0.5">error</span>
              <p className="font-body-md text-sm text-on-error-container">{error}</p>
            </div>
          )}

          {/* Google Sign Up */}
          <button
            onClick={handleGoogleSignup}
            disabled={isGoogleLoading}
            className="w-full border border-surface-variant bg-surface-container-low py-3.5 px-4 flex items-center justify-center gap-3 font-button-text text-button-text uppercase hover:border-primary hover:bg-primary/5 active:scale-[0.98] transition-all duration-200 mb-6 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isGoogleLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-on-surface/20 border-t-on-surface rounded-full animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </>
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-surface-variant" />
            <span className="font-label-caps text-label-caps text-on-surface-variant">or</span>
            <div className="flex-1 h-px bg-surface-variant" />
          </div>

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="font-label-caps text-label-caps text-on-surface-variant mb-1.5 block">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder="Your name"
                className="w-full bg-surface-container-low border border-surface-variant p-4 font-body-md text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/50"
              />
            </div>

            <div>
              <label className="font-label-caps text-label-caps text-on-surface-variant mb-1.5 block">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full bg-surface-container-low border border-surface-variant p-4 font-body-md text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/50"
              />
            </div>

            <div>
              <label className="font-label-caps text-label-caps text-on-surface-variant mb-1.5 block">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Min. 6 characters"
                  className="w-full bg-surface-container-low border border-surface-variant p-4 pr-12 font-body-md text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            <div>
              <label className="font-label-caps text-label-caps text-on-surface-variant mb-1.5 block">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-surface-container-low border border-surface-variant p-4 font-body-md text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/50"
              />
            </div>

            {/* Affiliate / Referral Code Field */}
            {!showAffiliateField ? (
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setShowAffiliateField(true)}
                  className="inline-flex items-center gap-1.5 font-body-md text-xs text-on-surface-variant/60 hover:text-primary transition-colors cursor-pointer border-none bg-transparent p-0"
                >
                  <span className="material-symbols-outlined text-[16px]">card_giftcard</span>
                  Have a referral code?
                </button>
              </div>
            ) : (
              <div className="space-y-1.5 pt-1 animate-fadeIn transition-all duration-300">
                <label className="font-label-caps text-label-caps text-on-surface-variant mb-1.5 block">
                  Referral Code
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={affiliateCode}
                    onChange={(e) => setAffiliateCode(e.target.value.toUpperCase())}
                    placeholder="Enter referral code"
                    className="w-full bg-surface-container-low border border-surface-variant p-4 pr-12 font-body-md text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/50 uppercase"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
                    {affiliateChecking && (
                      <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    )}
                    {!affiliateChecking && affiliateValid === true && (
                      <span className="material-symbols-outlined text-[20px] text-green-500">
                        check_circle
                      </span>
                    )}
                    {!affiliateChecking && affiliateValid === false && affiliateCode.trim() !== "" && (
                      <span className="material-symbols-outlined text-[20px] text-red-500">
                        cancel
                      </span>
                    )}
                  </div>
                </div>
                {!affiliateChecking && affiliateValid === true && (
                  <p className="font-body-md text-xs text-green-600 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">check</span>
                    Valid referral code!
                  </p>
                )}
                {!affiliateChecking && affiliateValid === false && affiliateCode.trim() !== "" && (
                  <p className="font-body-md text-xs text-red-500 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">error</span>
                    Invalid referral code
                  </p>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-on-primary font-button-text text-button-text uppercase py-4 hover:bg-primary-container active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center font-body-md text-sm text-on-surface-variant mt-6">
          Already have an account?{" "}
          <Link
            href="/account/login"
            className="text-primary font-semibold hover:text-primary-container transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}

export default function SignupClient() {
  return (
    <Suspense fallback={null}>
      <SignupForm />
    </Suspense>
  );
}
