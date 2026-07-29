"use client";

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="px-6 py-12 md:px-12 md:py-16 bg-[#070503] border-t border-[rgba(125,91,49,0.18)]">
      <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.25rem' }}>
              <img
                src="/images/WhatsApp_Image_2026-07-26_at_23.42.00-removebg-preview.png"
                alt="Chill Co."
                style={{
                  height: '110px',
                  maxWidth: '260px',
                  width: 'auto',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.8))',
                }}
              />
            </div>
            <p style={{ fontSize: '0.78rem', lineHeight: 1.8, color: 'rgba(240,230,211,0.35)', fontWeight: 300, maxWidth: '240px', marginBottom: '1.5rem' }}>
              Designed for comfort. Built for everyday.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {['IG', 'TT', 'FB'].map((s) => (
                <a key={s} href="#" style={{
                  width: '1.8rem', height: '1.8rem',
                  border: '1px solid rgba(125,91,49,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.5rem', letterSpacing: '0.05em', color: '#c9a96e',
                  fontWeight: 600, textDecoration: 'none',
                }}>
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <div style={{ fontSize: '0.58rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#7d5b31', fontWeight: 600, marginBottom: '1.25rem' }}>
              Shop
            </div>
            {[
              { label: 'New Drops', path: '/shop' },
              { label: 'Essentials', path: '/shop' },
              { label: 'Accessories', path: '/shop' },
            ].map((link) => (
              <Link key={link.label} href={link.path} className="nav-link" style={{ display: 'block', marginBottom: '0.7rem', fontSize: '0.78rem', fontWeight: 300, letterSpacing: '0.04em' }}>
                {link.label}
              </Link>
            ))}
          </div>

          {/* Support */}
          <div>
            <div style={{ fontSize: '0.58rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: '#7d5b31', fontWeight: 600, marginBottom: '1.25rem' }}>
              Support
            </div>
            {[
              { label: 'Privacy Policy', path: '#' },
              { label: 'Terms of Service', path: '#' },
              { label: 'Shipping', path: '#' },
              { label: 'Returns', path: '#' },
              { label: 'Contact', path: '#' },
            ].map((link) => (
              <Link key={link.label} href={link.path} className="nav-link" style={{ display: 'block', marginBottom: '0.7rem', fontSize: '0.78rem', fontWeight: 300, letterSpacing: '0.04em' }}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid rgba(125,91,49,0.12)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.62rem', color: 'rgba(240,230,211,0.2)', letterSpacing: '0.06em' }}>
            © 2026 Chill Co.
          </span>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ width: '1.5rem', height: '1px', background: '#7d5b31' }} />
            <span style={{ fontSize: '0.55rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(201,169,110,0.35)', fontWeight: 500 }}>
              Designed & Developed by <a href="https://www.swiftstack.digital/" target="_blank" rel="noopener noreferrer" style={{ color: '#c9a96e', textDecoration: 'none' }} className="hover:text-white transition-colors duration-300">swift stack digital</a>
            </span>
            <div style={{ width: '1.5rem', height: '1px', background: '#7d5b31' }} />
          </div>
        </div>
      </div>
    </footer>
  );
}
