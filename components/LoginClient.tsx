"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/lib/context/AuthContext";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isLoading: authLoading } = useAuth();
  const supabase = createClient();


  useEffect(() => {
    // Only redirect once auth state is fully resolved
    if (!authLoading && user) {
      router.push("/account");
    }
  }, [user, authLoading, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      router.push("/account");
      router.refresh();
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    setError(null);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${siteUrl}/auth/callback`,
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
            Welcome Back
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">
            Sign in to your Chill Co. account
          </p>
        </div>

        {/* Card */}
        <div className="bg-surface-container-lowest border border-surface-variant p-8 shadow-sm">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-error-container border border-error/20 flex items-start gap-3">
              <span className="material-symbols-outlined text-on-error-container text-sm mt-0.5">error</span>
              <p className="font-body-md text-sm text-on-error-container">{error}</p>
            </div>
          )}

          {/* Google Sign In */}
          <button
            onClick={handleGoogleLogin}
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
                {/* Google G Icon */}
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

          {/* Email/Password Form */}
          <form onSubmit={handleLogin} className="space-y-4">
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
                  placeholder="••••••••"
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

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-on-primary font-button-text text-button-text uppercase py-4 hover:bg-primary-container active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center font-body-md text-sm text-on-surface-variant mt-6">
          New to Chill Co.?{" "}
          <Link
            href="/account/signup"
            className="text-primary font-semibold hover:text-primary-container transition-colors"
          >
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}

export default function LoginClient() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
