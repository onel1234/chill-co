"use client";

import React from 'react';
import Link from 'next/link';
import CrownBorder from './CrownBorder';

export default function Manifesto() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', padding: '0' }}>
      {/* Crown border top */}
      <CrownBorder />

      <div
        className="px-6 py-16 md:px-12 md:py-28 relative"
        style={{
          background: 'linear-gradient(135deg, #0a0705 0%, #160e08 50%, #0a0705 100%)',
        }}
      >
        {/* Background ghosted image */}
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '45%',
          opacity: 0.06, pointerEvents: 'none', overflow: 'hidden',
        }}>
          <img
            src="/images/WhatsApp_Image_2026-07-10_at_09.12.31.jpeg"
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'left center', filter: 'sepia(80%)' }}
          />
        </div>

        <div style={{ maxWidth: '1300px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '680px' }}>
            <span style={{ fontSize: '0.58rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#7d5b31', fontWeight: 600 }}>
              The Manifesto
            </span>
            <h2 style={{
              margin: '1rem 0 1.5rem',
              fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)',
              fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.025em',
              color: '#f0e6d3',
            }}>
              &quot;Comfort is the<br />
              ultimate <span className="gold-text">Rebellion.</span>&quot;
            </h2>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.85, color: 'rgba(240,230,211,0.55)', fontWeight: 300, marginBottom: '2.5rem', maxWidth: '500px' }}>
              Streetwear meant to be felt — not just seen. Sustainably sourced fabrics
              from the island&apos;s finest mills, paired with silhouettes built for the
              streets of Colombo and the pace of modern life. Softness is not weakness.
              It is our greatest statement.
            </p>
            <Link href="/about" className="btn-gold w-full max-w-[240px] sm:w-auto text-center justify-center">
              <span>Read the Story →</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Crown border bottom (flipped) */}
      <div style={{ transform: 'scaleY(-1)' }}>
        <CrownBorder />
      </div>
    </section>
  );
}
