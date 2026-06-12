"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TopNavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // initialize
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
      isScrolled 
        ? "bg-white/95 dark:bg-background/95 backdrop-blur-md border-b border-surface-variant dark:border-on-surface-variant/20 shadow-sm py-2" 
        : "bg-transparent border-b border-white/20 py-4"
    }`}>
      <div className="flex justify-between items-center px-margin-mobile py-stack-md max-w-full mx-auto md:px-margin-desktop">
        
        {/* Mobile Hamburger Button */}
        <button 
          className={`md:hidden scale-100 active:scale-95 transition-all duration-300 ${
            isScrolled ? "text-on-surface hover:text-primary-container" : "text-white hover:text-white/80"
          }`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
        </button>

        <Link href="/" className="font-display-xl text-headline-md uppercase tracking-tighter">
          <img 
            alt="Chill Co. Logo" 
            className={`w-auto object-contain transition-all duration-500 ${
              isScrolled ? "h-10 md:h-14" : "h-12 md:h-16 invert brightness-0"
            }`} 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqB65R-CNaUPWxe_JwjGRHxiS3EUkEaXgG_Ykp-m9DV7dZVVB2qnF0O1xUNp6ioaAH7YSjRh1PAkQrEacFEWd3ju5pOJ4rXlPTBID9lpaGpjs_02jZwIsNjKKKPA5WYRj0rclafY-H2LtxCzFRxb7nyftQ-rr0G6RYnF-CnkK305lo-IqnWrNri_UUhYERexGtllSN_-WafAqC7s1ZWKuvcHAWDKK4NqZyTA-qs7UtMfISab21PmlHbupj6bYL8Rxyrmbo3LtTvSs" 
          />
        </Link>
        
        <ul className="hidden md:flex items-center gap-gutter">
          <li>
            <Link 
              className={`font-label-caps text-label-caps transition-colors duration-300 ${
                pathname === '/shop' 
                  ? (isScrolled ? "text-primary dark:text-primary-fixed-dim font-bold border-b-2 border-primary pb-1" : "text-white font-bold border-b-2 border-white pb-1") 
                  : (isScrolled ? "text-on-surface hover:text-primary-container" : "text-white/80 hover:text-white")
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
                  ? (isScrolled ? "text-primary dark:text-primary-fixed-dim font-bold border-b-2 border-primary pb-1" : "text-white font-bold border-b-2 border-white pb-1") 
                  : (isScrolled ? "text-on-surface hover:text-primary-container" : "text-white/80 hover:text-white")
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
                  ? (isScrolled ? "text-primary dark:text-primary-fixed-dim font-bold border-b-2 border-primary pb-1" : "text-white font-bold border-b-2 border-white pb-1") 
                  : (isScrolled ? "text-on-surface hover:text-primary-container" : "text-white/80 hover:text-white")
              }`}
            >
              About
            </Link>
          </li>
        </ul>

        <div className={`flex items-center gap-stack-md transition-colors duration-300 ${
          isScrolled ? "text-on-background" : "text-white"
        }`}>
          <button className="scale-100 active:scale-95 transition-all duration-200 hover:opacity-80 hidden sm:block">
            <span className="material-symbols-outlined">search</span>
          </button>
          <button className="scale-100 active:scale-95 transition-all duration-200 hover:opacity-80 hidden md:block">
            <span className="material-symbols-outlined">person</span>
          </button>
          <button className="scale-100 active:scale-95 transition-all duration-200 hover:opacity-80">
            <span className="material-symbols-outlined">shopping_bag</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-surface-variant bg-white/95 dark:bg-background/95 backdrop-blur-lg px-margin-mobile py-4 space-y-4 shadow-lg absolute w-full text-on-surface">
          <Link href="/shop" className="block hover:text-primary-container transition-colors font-label-caps text-label-caps uppercase tracking-widest py-2">
            Shop
          </Link>
          <Link href="/collections" className="block hover:text-primary-container transition-colors font-label-caps text-label-caps uppercase tracking-widest py-2">
            Collections
          </Link>
          <Link href="/about" className="block hover:text-primary-container transition-colors font-label-caps text-label-caps uppercase tracking-widest py-2">
            About
          </Link>
          <div className="pt-4 border-t border-surface-variant/50 flex gap-4 text-on-surface">
             <button className="flex items-center gap-2 hover:text-primary-container font-label-caps text-label-caps uppercase tracking-widest">
               <span className="material-symbols-outlined text-sm">search</span> Search
             </button>
             <button className="flex items-center gap-2 hover:text-primary-container font-label-caps text-label-caps uppercase tracking-widest">
               <span className="material-symbols-outlined text-sm">person</span> Account
             </button>
          </div>
        </div>
      )}
    </nav>
  );
}
