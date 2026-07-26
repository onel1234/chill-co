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
    <section style={{ padding: '6rem 3rem', background: '#0d0a07' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
          <div>
            <span style={{ fontSize: '0.58rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#7d5b31', fontWeight: 600 }}>
              Curated Selection
            </span>
            <h2 style={{ margin: '0.5rem 0 0', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 700, letterSpacing: '-0.02em', color: '#f0e6d3' }}>
              The Latest Drops
            </h2>
          </div>
          <Link href="/shop" style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#c9a96e', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            View All <span>→</span>
          </Link>
        </div>

        {/* Ornament */}
        <div style={{ marginBottom: '2.5rem' }}>
          <OrnamentalDivider />
        </div>

        {/* Products Grid — 5 columns */}
        <div className="product-5-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1px', background: 'rgba(125,91,49,0.12)' }}>
          {products.map((p) => (
            <ProductCard
              key={p.name}
              title={p.name}
              subtitle={p.variant}
              price={p.price}
              imageSrc={p.img}
              badge={p.badge}
              href="/shop"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
