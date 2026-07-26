"use client";

import React from 'react';
import Link from 'next/link';
import ProductCard from './ProductCard';
import OrnamentalDivider from './OrnamentalDivider';

const products = [
  {
    name: 'Essential Tote Bag',
    variant: 'Natural Canvas',
    price: 'Rs 3,000.00',
    img: '/images/WhatsApp_Image_2026-07-10_at_09.12.29.jpeg',
    badge: 'NEW',
  },
  {
    name: 'Contrast Piped Cami Top',
    variant: 'Black / White',
    price: 'Rs 2,700.00',
    img: '/images/WhatsApp_Image_2026-07-10_at_09.12.31__3_.jpeg',
  },
  {
    name: 'Chalk Corset Top',
    variant: 'White / Black',
    price: 'Rs 2,900.00',
    img: '/images/WhatsApp_Image_2026-07-10_at_09.12.31__1_.jpeg',
  },
  {
    name: 'Loose Flared Jeans',
    variant: 'Washed Black',
    price: 'Rs 7,500.00',
    img: '/images/WhatsApp_Image_2026-07-10_at_09.12.31.jpeg',
  },
  {
    name: 'Oversized Signature Tee',
    variant: 'Harvest Orange',
    price: 'Rs 4,500.00',
    img: '/images/WhatsApp_Image_2026-07-10_at_09.12.31__2_.jpeg',
  },
];

export default function CuratedSelection() {
  return (
    <section className="px-4 py-12 md:px-12 md:py-24 bg-[#0d0a07]">
      <div className="max-w-[1300px] mx-auto">
        {/* Header */}
        <div className="flex justify-between items-end mb-6 md:mb-12">
          <div>
            <span style={{ fontSize: '0.58rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#7d5b31', fontWeight: 600, display: 'block' }}>
              Curated Selection
            </span>
            <h2 style={{ margin: '0.3rem 0 0', fontSize: 'clamp(1.6rem, 5vw, 2.8rem)', fontWeight: 700, letterSpacing: '-0.02em', color: '#f0e6d3', lineHeight: 1.1 }}>
              The Latest Drops
            </h2>
          </div>
          <Link
            href="/shop"
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

        {/* Mobile Swipe / Desktop Grid Container */}
        <div className="flex md:grid md:grid-cols-5 overflow-x-auto md:overflow-visible gap-3 md:gap-[1px] snap-x snap-mandatory scrollbar-hide pb-4 md:pb-0 bg-transparent md:bg-[rgba(125,91,49,0.12)]">
          {products.map((p) => (
            <div key={p.name} className="w-[72vw] max-w-[260px] sm:w-[45vw] md:w-auto shrink-0 md:shrink snap-start">
              <ProductCard
                title={p.name}
                subtitle={p.variant}
                price={p.price}
                imageSrc={p.img}
                badge={p.badge}
                href="/shop"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
