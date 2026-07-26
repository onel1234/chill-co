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
    <section className="px-4 py-12 md:px-12 md:py-24 bg-[#0d0a07]">
      <div className="max-w-[1300px] mx-auto">
        {/* Header */}
        <div className="flex justify-between items-end mb-6 md:mb-12">
          <div>
            <span style={{ fontSize: '0.58rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#7d5b31', fontWeight: 600, display: 'block' }}>
              Shop By Category
            </span>
            <h2 style={{ margin: '0.3rem 0 0', fontSize: 'clamp(1.6rem, 5vw, 2.8rem)', fontWeight: 700, letterSpacing: '-0.02em', color: '#f0e6d3', lineHeight: 1.1 }}>
              Our Collections
            </h2>
          </div>
          <Link
            href="/collections"
            style={{
              fontSize: '0.68rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#c9a96e',
              fontWeight: 600,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              whiteSpace: 'nowrap',
            }}
          >
            View All <span>→</span>
          </Link>
        </div>

        {/* Ornament */}
        <div className="mb-6 md:mb-10">
          <OrnamentalDivider />
        </div>

        {/* 3 Collection Tiles (Responsive Stack on Mobile, 3 Columns on Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-[1px] md:bg-[rgba(125,91,49,0.12)]">
          {collections.map((col) => (
            <Link
              key={col.label}
              href="/collections"
              className="product-card group block relative overflow-hidden bg-[#0d0a07]"
              style={{ textDecoration: 'none' }}
            >
              <div className="relative aspect-[16/9] md:aspect-[4/5] w-full overflow-hidden bg-[#140d08]">
                <img
                  src={col.img}
                  alt={col.alt}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, transparent 30%, rgba(13,10,7,0.85) 100%)',
                  }}
                />
                <div className="absolute bottom-5 left-5 right-5 md:bottom-7 md:left-6 md:right-6">
                  <div style={{ fontSize: 'clamp(1.1rem, 4vw, 1.35rem)', fontWeight: 700, color: '#f0e6d3', letterSpacing: '0.02em', marginBottom: '0.35rem' }}>
                    {col.label}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '1.5rem', height: '1px', background: '#c9a96e' }} />
                    <span style={{ fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a96e', fontWeight: 500 }}>
                      Explore →
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
