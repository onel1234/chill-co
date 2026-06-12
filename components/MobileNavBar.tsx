"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';

export default function MobileNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-surface-variant flex justify-between items-center px-margin-mobile py-stack-md">
        <div className="flex items-center gap-2">
          <button 
            className="p-2 -ml-2 transition-all active:scale-90" 
            onClick={() => setIsMenuOpen(true)}
          >
            <span className="material-symbols-outlined text-primary text-[28px]">menu</span>
          </button>
          <Link href="/">
            <img alt="Chill Co. Logo" className="h-8 w-auto" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCR2wNMBztwufgW8lGS2JpO70hZORdFxujBhNc39mVggd3KM5Xb_m0iozTj3MImDhr0zzXa3OIpbCjLzCkL6CzmedrhCPm86EPmuAEe9sSBoraXEyT-5wKT3ozZ7sN63-T8PlHiCh0Efxz80uyPX6gHrEo328WXlOxNs1AoA435_bCNKuVfe09q8cH8ObudefTMiJ6CoW4Yy7bk0KhGo8OgyCYny30eAtLbwkwLyY1K24WgrAMBh242JxieUkJB_UucVG4SJMXzFV4" />
          </Link>
        </div>
        <div className="flex items-center gap-stack-md">
          <button className="material-symbols-outlined text-primary">search</button>
          <Link href="/checkout" className="material-symbols-outlined text-primary">shopping_bag</Link>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-background z-[70] transition-transform duration-500 ease-in-out px-margin-mobile py-24 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <button 
          className="absolute top-margin-mobile right-margin-mobile"
          onClick={() => setIsMenuOpen(false)}
        >
          <span className="material-symbols-outlined text-primary text-[32px]">close</span>
        </button>
        <ul className="flex flex-col gap-stack-lg">
          <li><Link className={pathname === '/shop' ? "font-display-xl text-headline-md uppercase text-primary border-b border-primary w-full block pb-2" : "font-display-xl text-headline-md uppercase text-on-surface-variant hover:text-primary transition-colors block pb-2"} href="/shop" onClick={() => setIsMenuOpen(false)}>Shop</Link></li>
          <li><Link className={pathname === '/collections' ? "font-display-xl text-headline-md uppercase text-primary border-b border-primary w-full block pb-2" : "font-display-xl text-headline-md uppercase text-on-surface-variant hover:text-primary transition-colors block pb-2"} href="/collections" onClick={() => setIsMenuOpen(false)}>Collections</Link></li>
          <li><Link className={pathname === '/about' ? "font-display-xl text-headline-md uppercase text-primary border-b border-primary w-full block pb-2" : "font-display-xl text-headline-md uppercase text-on-surface-variant hover:text-primary transition-colors block pb-2"} href="/about" onClick={() => setIsMenuOpen(false)}>About</Link></li>
          <li>
            <Link
              className={pathname === '/account' || pathname === '/account/login' ? "font-display-xl text-headline-md uppercase text-primary border-b border-primary w-full block pb-2" : "font-display-xl text-headline-md uppercase text-on-surface-variant hover:text-primary transition-colors block pb-2"}
              href={user ? "/account" : "/account/login"}
              onClick={() => setIsMenuOpen(false)}
            >
              {user ? "Account" : "Sign In"}
            </Link>
          </li>
        </ul>
        <div className="mt-section-gap">
          <p className="font-label-caps text-label-caps text-on-surface-variant mb-4">SOCIALS</p>
          <div className="flex gap-stack-md">
            <span className="font-label-caps text-label-caps border border-surface-variant px-4 py-2">IG</span>
            <span className="font-label-caps text-label-caps border border-surface-variant px-4 py-2">TW</span>
            <span className="font-label-caps text-label-caps border border-surface-variant px-4 py-2">TK</span>
          </div>
        </div>
      </div>
    </>
  );
}
