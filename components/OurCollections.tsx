"use client";

import React from 'react';
import Link from 'next/link';
import OrnamentalDivider from './OrnamentalDivider';

const collections = [
  { label: 'Latest Drops', img: '/images/ChatGPT_Image_Jul_23__2026__10_00_30_PM.png', alt: 'Latest drops — cultural hero image' },
  { label: 'Exclusive', img: '/images/WhatsApp_Image_2026-07-10_at_09.12.29.jpeg', alt: 'Exclusive — traditional parrot art' },
  { label: 'Heritage', img: '/images/WhatsApp_Image_2026-07-10_at_09.12.30.jpeg', alt: 'Heritage — peacock motif art' },
];

export default function OurCollections() {
  return (
    <section style={{ padding: '6rem 3rem', background: '#0d0a07' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
          <div>
            <span style={{ fontSize: '0.58rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#7d5b31', fontWeight: 600 }}>
              Shop By Category
            </span>
            <h2 style={{ margin: '0.5rem 0 0', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, letterSpacing: '-0.02em', color: '#f0e6d3' }}>
              Our Collections
            </h2>
          </div>
          <Link href="/collections" style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#c9a96e', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            View All <span>→</span>
          </Link>
        </div>

        <div style={{ marginBottom: '2.5rem' }}>
          <OrnamentalDivider />
        </div>

        {/* 3 collection tiles */}
        <div className="collections-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(125,91,49,0.12)' }}>
          {collections.map((col) => (
            <Link
              key={col.label}
              href="/collections"
              className="product-card"
              style={{
                background: '#0d0a07', textDecoration: 'none', display: 'block',
              }}
            >
              <div style={{ position: 'relative', aspectRatio: '4/5', overflow: 'hidden', background: '#140d08' }}>
                <img
                  src={col.img}
                  alt={col.alt}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to bottom, transparent 40%, rgba(13,10,7,0.85) 100%)',
                }} />
                <div style={{ position: 'absolute', bottom: '1.75rem', left: '1.5rem', right: '1.5rem' }}>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f0e6d3', letterSpacing: '0.02em', marginBottom: '0.4rem' }}>
                    {col.label}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '1.5rem', height: '1px', background: '#c9a96e' }} />
                    <span style={{ fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a96e', fontWeight: 500 }}>
                      Explore
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
