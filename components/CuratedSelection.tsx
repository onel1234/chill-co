"use client";

import React from 'react';
import Link from 'next/link';
import ProductCard from './ProductCard';
import OrnamentalDivider from './OrnamentalDivider';

const products = [
  {
    name: 'Oversized Signature Tee',
    variant: 'Ceylon Cinnamon',
    price: 'Rs 3,299.00',
    img: 'https://res.cloudinary.com/dfxolekjs/image/upload/v1785310636/shirt_1_g28hja.jpg',
    badge: 'NEW',
  },
  {
    name: 'The "Different" Oversized Tee',
    variant: 'Off-White',
    price: 'Rs 3,299.00',
    img: 'https://res.cloudinary.com/dfxolekjs/image/upload/v1785310752/shirt_2_dg42sf.jpg',
    badge: 'NEW',
  },
  {
    name: 'Kinetic Drop Tee',
    variant: 'Heather Grey',
    price: 'Rs 3,299.00',
    img: 'https://res.cloudinary.com/dfxolekjs/image/upload/v1785310779/shirt_3_ficcf7.jpg',
  },
  {
    name: 'Midnight Drop Tee',
    variant: 'Pure Black',
    price: 'Rs 3,299.00',
    img: 'https://res.cloudinary.com/dfxolekjs/image/upload/v1785310821/shirt_4_hkphui.jpg',
  },
  {
    name: 'Staples Heavyweight Tee',
    variant: 'Stone Grey',
    price: 'Rs 3,299.00',
    img: 'https://res.cloudinary.com/dfxolekjs/image/upload/v1785310856/shirt_5_u6qrf6.jpg',
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
