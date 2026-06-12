"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/lib/context/CartContext';
import { useAuth } from '@/lib/context/AuthContext';
import SearchOverlay from './SearchOverlay';

export default function TopNavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { totalItems } = useCart();
  const { user, profile, isLoading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // initialize
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = pathname === '/';
  const isTransparent = isHome && !isScrolled;

  const avatarUrl = profile?.avatar_url;
  const displayInitial = (profile?.full_name?.[0] || user?.email?.[0] || '?').toUpperCase();

  return (
    <>
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
      !isTransparent 
        ? "bg-white/95 dark:bg-background/95 backdrop-blur-md border-b border-surface-variant dark:border-on-surface-variant/20 shadow-sm py-2" 
        : "bg-transparent border-b border-white/20 py-4"
    }`}>
      <div className="relative flex justify-between items-center px-margin-mobile py-stack-md max-w-full mx-auto md:px-margin-desktop">
        
        {/* Left Side: Navigation & Hamburger */}
        <div className="flex-1 flex items-center justify-start">
          {/* Mobile Hamburger Button */}
          <button 
            className={`md:hidden scale-100 active:scale-95 transition-all duration-300 ${
              !isTransparent ? "text-on-surface hover:text-primary-container" : "text-white hover:text-white/80"
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span className="material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
          </button>

          <ul className="hidden md:flex items-center gap-gutter">
            <li>
              <Link 
                className={`font-label-caps text-label-caps transition-colors duration-300 ${
                  pathname === '/shop' 
                    ? (!isTransparent ? "text-primary dark:text-primary-fixed-dim font-bold border-b-2 border-primary pb-1" : "text-white font-bold border-b-2 border-white pb-1") 
                    : (!isTransparent ? "text-on-surface hover:text-primary-container" : "text-white/80 hover:text-white")
                }`}
                href="/shop"
              >
                Shop
              </Link>
            </li>
            <li>
              <Link 
                href="/collections" 
                className={`font-label-caps text-label-caps transition-colors duration-300 ${
                  pathname === '/collections' 
                    ? (!isTransparent ? "text-primary dark:text-primary-fixed-dim font-bold border-b-2 border-primary pb-1" : "text-white font-bold border-b-2 border-white pb-1") 
                    : (!isTransparent ? "text-on-surface hover:text-primary-container" : "text-white/80 hover:text-white")
                }`}
              >
                Collections
              </Link>
            </li>
            <li>
              <Link 
                href="/about" 
                className={`font-label-caps text-label-caps transition-colors duration-300 ${
                  pathname === '/about' 
                    ? (!isTransparent ? "text-primary dark:text-primary-fixed-dim font-bold border-b-2 border-primary pb-1" : "text-white font-bold border-b-2 border-white pb-1") 
                    : (!isTransparent ? "text-on-surface hover:text-primary-container" : "text-white/80 hover:text-white")
                }`}
              >
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* Center Side: Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
          <Link href="/" className="font-display-xl text-headline-md uppercase tracking-tighter">
            <img 
              alt="Chill Co. Logo" 
              className={`w-auto object-contain transition-all duration-500 ${
                !isTransparent ? "h-[46px] md:h-[64px]" : "h-[55px] md:h-[74px] invert brightness-0"
              }`} 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqB65R-CNaUPWxe_JwjGRHxiS3EUkEaXgG_Ykp-m9DV7dZVVB2qnF0O1xUNp6ioaAH7YSjRh1PAkQrEacFEWd3ju5pOJ4rXlPTBID9lpaGpjs_02jZwIsNjKKKPA5WYRj0rclafY-H2LtxCzFRxb7nyftQ-rr0G6RYnF-CnkK305lo-IqnWrNri_UUhYERexGtllSN_-WafAqC7s1ZWKuvcHAWDKK4NqZyTA-qs7UtMfISab21PmlHbupj6bYL8Rxyrmbo3LtTvSs" 
            />
          </Link>
        </div>

        {/* Right Side: Icons */}
        <div className={`flex-1 flex items-center justify-end gap-stack-md transition-colors duration-300 ${
          !isTransparent ? "text-on-background" : "text-white"
        }`}>
          <button onClick={() => setIsSearchOpen(true)} className="scale-100 active:scale-95 transition-all duration-200 hover:opacity-80 hidden sm:block">
            <span className="material-symbols-outlined">search</span>
          </button>

          {/* Account Icon / Avatar */}
          {!isLoading && (
            <Link
              href={user ? "/account" : "/account/login"}
              className="scale-100 active:scale-95 transition-all duration-200 hover:opacity-80 hidden md:flex items-center"
              title={user ? "My Account" : "Sign In"}
            >
              {user && avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="Account"
                  className="w-7 h-7 rounded-full object-cover border-2 border-primary/30"
                />
              ) : user ? (
                <div className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center text-[11px] font-bold">
                  {displayInitial}
                </div>
              ) : (
                <span className="material-symbols-outlined">person</span>
              )}
            </Link>
          )}

          <Link href="/checkout" className="relative scale-100 active:scale-95 transition-all duration-200 hover:opacity-80 flex items-center">
            <span className="material-symbols-outlined">shopping_bag</span>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-2 bg-primary text-on-primary text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-surface-variant bg-white/95 dark:bg-background/95 backdrop-blur-lg px-margin-mobile py-4 space-y-4 shadow-lg absolute w-full text-on-surface">
          <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-primary-container transition-colors font-label-caps text-label-caps uppercase tracking-widest py-2">
            Shop
          </Link>
          <Link href="/collections" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-primary-container transition-colors font-label-caps text-label-caps uppercase tracking-widest py-2">
            Collections
          </Link>
          <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="block hover:text-primary-container transition-colors font-label-caps text-label-caps uppercase tracking-widest py-2">
            About
          </Link>
          <div className="pt-4 border-t border-surface-variant/50 flex gap-4 text-on-surface">
             <button onClick={() => { setIsMobileMenuOpen(false); setIsSearchOpen(true); }} className="flex items-center gap-2 hover:text-primary-container font-label-caps text-label-caps uppercase tracking-widest">
               <span className="material-symbols-outlined text-sm">search</span> Search
             </button>
             <Link
               href={user ? "/account" : "/account/login"}
               onClick={() => setIsMobileMenuOpen(false)}
               className="flex items-center gap-2 hover:text-primary-container font-label-caps text-label-caps uppercase tracking-widest"
             >
               <span className="material-symbols-outlined text-sm">person</span>
               {user ? "Account" : "Sign In"}
             </Link>
          </div>
        </div>
      )}
    </nav>

      {/* Full Screen Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
