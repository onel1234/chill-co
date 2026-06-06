"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function TopNavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 dark:bg-background/90 backdrop-blur-md border-b border-surface-variant dark:border-on-surface-variant/20 transition-all">
      <div className="flex justify-between items-center px-margin-mobile py-stack-md max-w-full mx-auto md:px-margin-desktop">
        
        {/* Mobile Hamburger Button */}
        <button 
          className="md:hidden scale-100 active:scale-95 transition-all duration-200 hover:text-primary-container"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="material-symbols-outlined">{isMobileMenuOpen ? 'close' : 'menu'}</span>
        </button>

        <Link href="#" className="font-display-xl text-headline-md uppercase tracking-tighter text-primary dark:text-primary-fixed-dim">
          <img 
            alt="Chill Co. Logo" 
            className="h-12 md:h-20 w-auto object-contain" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqB65R-CNaUPWxe_JwjGRHxiS3EUkEaXgG_Ykp-m9DV7dZVVB2qnF0O1xUNp6ioaAH7YSjRh1PAkQrEacFEWd3ju5pOJ4rXlPTBID9lpaGpjs_02jZwIsNjKKKPA5WYRj0rclafY-H2LtxCzFRxb7nyftQ-rr0G6RYnF-CnkK305lo-IqnWrNri_UUhYERexGtllSN_-WafAqC7s1ZWKuvcHAWDKK4NqZyTA-qs7UtMfISab21PmlHbupj6bYL8Rxyrmbo3LtTvSs" 
          />
        </Link>
        
        <ul className="hidden md:flex items-center gap-gutter">
          <li className="">
            <Link 
              className="text-primary dark:text-primary-fixed-dim font-bold border-b-2 border-primary pb-1 font-label-caps text-label-caps" 
              href="/shop"
            >
              Shop
            </Link>
          </li>
          <li>
            <Link href="#" className="text-on-surface hover:text-primary-container transition-colors font-label-caps text-label-caps hover:opacity-80 duration-300">
              Collections
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-on-surface hover:text-primary-container transition-colors font-label-caps text-label-caps hover:opacity-80 duration-300">
              About
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-stack-md text-on-background">
          <button className="scale-100 active:scale-95 transition-all duration-200 hover:text-primary-container hidden sm:block">
            <span className="material-symbols-outlined">search</span>
          </button>
          <button className="scale-100 active:scale-95 transition-all duration-200 hover:text-primary-container hidden md:block">
            <span className="material-symbols-outlined">person</span>
          </button>
          <button className="scale-100 active:scale-95 transition-all duration-200 hover:text-primary-container">
            <span className="material-symbols-outlined">shopping_bag</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-surface-variant bg-white/95 dark:bg-background/95 backdrop-blur-lg px-margin-mobile py-4 space-y-4 shadow-lg absolute w-full">
          <Link href="/shop" className="block text-on-surface hover:text-primary-container transition-colors font-label-caps text-label-caps uppercase tracking-widest py-2">
            Shop
          </Link>
          <Link href="#" className="block text-on-surface hover:text-primary-container transition-colors font-label-caps text-label-caps uppercase tracking-widest py-2">
            Collections
          </Link>
          <Link href="/about" className="block text-on-surface hover:text-primary-container transition-colors font-label-caps text-label-caps uppercase tracking-widest py-2">
            About
          </Link>
          <div className="pt-4 border-t border-surface-variant/50 flex gap-4">
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
