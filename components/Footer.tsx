"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import ContactModal from './ContactModal';

export default function Footer() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <style>{`
        .footer-bottom-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid rgba(125,91,49,0.12);
          padding-top: 1.5rem;
          gap: 1rem;
        }
        .footer-credit-link {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          text-decoration: none;
          font-size: 0.58rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(201,169,110,0.6);
          white-space: nowrap;
        }
        @media (max-width: 768px) {
          .footer-bottom-bar {
            flex-direction: column-reverse !important;
            align-items: center !important;
            text-align: center !important;
            gap: 1rem !important;
            padding-top: 1.25rem !important;
          }
          .footer-credit-wrapper {
            width: 100% !important;
            justify-content: center !important;
          }
          .footer-credit-link {
            flex-direction: column !important;
            gap: 0.4rem !important;
            white-space: normal !important;
            letter-spacing: 0.1em !important;
            font-size: 0.62rem !important;
            line-height: 1.5 !important;
          }
          .footer-side-line {
            display: none !important;
          }
          .footer-cta-pill {
            margin-top: 0.2rem;
            padding: 0.3rem 0.85rem;
            border: 1px solid rgba(201,169,110,0.3);
            border-radius: 20px;
            background: rgba(20,13,8,0.6);
          }
        }
      `}</style>

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
              <Link href="/privacy-policy" className="nav-link" style={{ display: 'block', marginBottom: '0.7rem', fontSize: '0.78rem', fontWeight: 300, letterSpacing: '0.04em' }}>
                Privacy Policy
              </Link>
              <Link href="/terms-and-conditions" className="nav-link" style={{ display: 'block', marginBottom: '0.7rem', fontSize: '0.78rem', fontWeight: 300, letterSpacing: '0.04em' }}>
                Terms of Service
              </Link>
              <button
                onClick={() => setIsContactOpen(true)}
                className="nav-link"
                style={{
                  display: 'block',
                  marginBottom: '0.7rem',
                  fontSize: '0.78rem',
                  fontWeight: 300,
                  letterSpacing: '0.04em',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                Contact Us
              </button>
            </div>
          </div>

          {/* Bottom bar - Mobile Optimized & Desktop Sleek */}
          <div className="footer-bottom-bar">
            <span style={{ fontSize: '0.62rem', color: 'rgba(240,230,211,0.25)', letterSpacing: '0.06em' }}>
              © 2026 Chill Co. All rights reserved.
            </span>

            <div className="footer-credit-wrapper" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <div className="footer-side-line" style={{ width: '1.5rem', height: '1px', background: '#7d5b31' }} />
              
              <a
                href="https://www.swiftstack.digital/"
                target="_blank"
                rel="noopener noreferrer"
                className="group footer-credit-link"
              >
                <span>Designed & Developed by</span>
                <span
                  style={{
                    color: '#c9a96e',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #ffe8b5 0%, #c9a96e 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    borderBottom: '1px solid rgba(201,169,110,0.3)',
                    paddingBottom: '1px',
                  }}
                >
                  Swift Stack Digital
                </span>
              </a>

              <div className="footer-side-line" style={{ width: '1.5rem', height: '1px', background: '#7d5b31' }} />
            </div>
          </div>
        </div>
      </footer>

      {/* Interactive Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </>
  );
}
