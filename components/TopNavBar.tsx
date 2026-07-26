"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/lib/context/CartContext';
import { useAuth } from '@/lib/context/AuthContext';
import SearchOverlay from './SearchOverlay';
import OrnamentalDivider from './OrnamentalDivider';

export default function TopNavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { totalItems } = useCart();
  const { user, profile, isAdmin, isLoading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const avatarUrl = profile?.avatar_url;
  const displayInitial = (profile?.full_name?.[0] || user?.email?.[0] || '?').toUpperCase();

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          padding: '0 2rem',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: isMobileMenuOpen
            ? 'rgba(13,10,7,0.98)'
            : isScrolled
              ? 'rgba(13,10,7,0.96)'
              : 'linear-gradient(to bottom, rgba(13,10,7,0.85), transparent)',
          backdropFilter: (isScrolled || isMobileMenuOpen) ? 'blur(14px)' : 'none',
          borderBottom: (isScrolled || isMobileMenuOpen) ? '1px solid rgba(125,91,49,0.18)' : 'none',
          transition: 'background 0.4s ease, border-color 0.4s ease',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            zIndex: 201,
          }}
        >
          <img
            src="/images/WhatsApp_Image_2026-07-26_at_23.42.00-removebg-preview.png"
            alt="Chill Co."
            style={{
              height: '115px',
              maxWidth: '260px',
              width: 'auto',
              objectFit: 'contain',
              filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.8))',
              transition: 'transform 0.3s ease',
            }}
          />
        </Link>

        {/* Desktop Links */}
        <div className="nav-desktop-links" style={{ display: 'flex', gap: '2.5rem' }}>
          {[
            { label: 'Shop', path: '/shop' },
            { label: 'Collections', path: '/collections' },
            { label: 'About', path: '/about' },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.path}
              className="nav-link"
              style={{
                color: pathname === item.path ? '#c9a96e' : '#e8d5b0',
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop Right Icons */}
        <div className="nav-desktop-icons" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          {/* Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#c9a96e', padding: '0.25rem', display: 'flex', alignItems: 'center' }}
            title="Search"
            aria-label="Search"
          >
            <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="7" />
              <path d="M16.5 16.5L21 21" strokeLinecap="round" />
            </svg>
          </button>

          {/* Admin Icon */}
          {isAdmin && !isLoading && (
            <Link
              href="/admin"
              style={{ color: '#c9a96e', display: 'flex', alignItems: 'center' }}
              title="Admin Panel"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>admin_panel_settings</span>
            </Link>
          )}

          {/* Account Icon / Avatar */}
          {!isLoading && (
            <Link
              href={user ? "/account" : "/account/login"}
              style={{ color: '#c9a96e', display: 'flex', alignItems: 'center' }}
              title={user ? "My Account" : "Sign In"}
            >
              {user && avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="Account"
                  style={{ width: '22px', height: '22px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #7d5b31' }}
                />
              ) : user ? (
                <div style={{
                  width: '22px', height: '22px', borderRadius: '50%', background: '#7d5b31', color: '#f0e6d3',
                  fontSize: '9px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {displayInitial}
                </div>
              ) : (
                <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              )}
            </Link>
          )}

          {/* Shopping Bag Icon */}
          <Link href="/checkout" style={{ position: 'relative', color: '#c9a96e', display: 'flex', alignItems: 'center' }}>
            <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <path d="M3 6h18M16 10a4 4 0 01-8 0" />
            </svg>
            <span
              style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                width: '13px',
                height: '13px',
                borderRadius: '50%',
                background: '#7d5b31',
                color: '#f0e6d3',
                fontSize: '7px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {totalItems}
            </span>
          </Link>
        </div>

        {/* Mobile Controls */}
        <div className="nav-mobile-controls" style={{ display: 'none', alignItems: 'center', gap: '1rem', zIndex: 201 }}>
          <button
            onClick={() => setIsSearchOpen(true)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#c9a96e', padding: '0.25rem' }}
            aria-label="Search"
          >
            <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="7" />
              <path d="M16.5 16.5L21 21" strokeLinecap="round" />
            </svg>
          </button>

          <Link href="/checkout" style={{ position: 'relative', color: '#c9a96e', display: 'flex', alignItems: 'center' }}>
            <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <path d="M3 6h18M16 10a4 4 0 01-8 0" />
            </svg>
            <span
              style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                width: '13px',
                height: '13px',
                borderRadius: '50%',
                background: '#7d5b31',
                color: '#f0e6d3',
                fontSize: '7px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {totalItems}
            </span>
          </Link>

          {/* Hamburger toggle button */}
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
            }}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <span
              style={{
                display: 'block',
                width: '22px',
                height: '1.5px',
                background: '#c9a96e',
                transform: isMobileMenuOpen ? 'translateY(6.5px) rotate(45deg)' : 'none',
                transition: 'transform 0.35s ease',
              }}
            />
            <span
              style={{
                display: 'block',
                width: '22px',
                height: '1.5px',
                background: '#c9a96e',
                opacity: isMobileMenuOpen ? 0 : 1,
                transition: 'opacity 0.25s ease',
              }}
            />
            <span
              style={{
                display: 'block',
                width: '22px',
                height: '1.5px',
                background: '#c9a96e',
                transform: isMobileMenuOpen ? 'translateY(-6.5px) rotate(-45deg)' : 'none',
                transition: 'transform 0.35s ease',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 190,
          background: 'rgba(7,5,3,0.97)',
          backdropFilter: 'blur(16px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0',
          opacity: isMobileMenuOpen ? 1 : 0,
          pointerEvents: isMobileMenuOpen ? 'all' : 'none',
          transition: 'opacity 0.4s ease',
        }}
      >
        <div style={{ marginBottom: '2.5rem', width: '160px' }}>
          <OrnamentalDivider color="#6e4b26" />
        </div>

        {[
          { label: 'Shop', path: '/shop' },
          { label: 'Collections', path: '/collections' },
          { label: 'About', path: '/about' },
          { label: user ? 'Account' : 'Sign In', path: user ? '/account' : '/account/login' },
          ...(isAdmin ? [{ label: 'Admin', path: '/admin' }] : []),
        ].map((item, i) => (
          <Link
            key={item.label}
            href={item.path}
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              display: 'block',
              fontSize: 'clamp(1.8rem, 8vw, 2.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.01em',
              color: '#f0e6d3',
              textDecoration: 'none',
              padding: '0.5rem 0',
              textAlign: 'center',
              opacity: isMobileMenuOpen ? 1 : 0,
              transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity 0.4s ease ${0.1 + i * 0.07}s, transform 0.4s ease ${0.1 + i * 0.07}s, color 0.2s ease`,
            }}
          >
            {item.label}
          </Link>
        ))}

        <div style={{ marginTop: '2.5rem', width: '160px' }}>
          <OrnamentalDivider color="#6e4b26" />
        </div>

        {/* Social Links */}
        <div
          style={{
            display: 'flex',
            gap: '2rem',
            marginTop: '2rem',
            opacity: isMobileMenuOpen ? 1 : 0,
            transition: 'opacity 0.4s ease 0.35s',
          }}
        >
          {['IG', 'TT', 'FB'].map((s) => (
            <a
              key={s}
              href="#"
              style={{
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(201,169,110,0.5)',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              {s}
            </a>
          ))}
        </div>
      </div>

      {/* Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
