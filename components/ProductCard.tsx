import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
  title: string;
  subtitle: string;
  price: string;
  imageSrc: string;
  badge?: string;
  href?: string;
}

export default function ProductCard({ title, subtitle, price, imageSrc, badge, href = "/shop" }: ProductCardProps) {
  return (
    <Link href={href} className="product-card block h-full" style={{ background: '#0d0a07', textDecoration: 'none' }}>
      <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', background: '#140d08' }}>
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 25vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />

        {badge && (
          <div style={{
            position: 'absolute', top: '0.6rem', left: '0.6rem',
            background: '#7d5b31', color: '#f0e6d3',
            fontSize: '0.52rem', fontWeight: 700, letterSpacing: '0.18em',
            padding: '0.2rem 0.5rem', textTransform: 'uppercase', zIndex: 10,
          }}>
            {badge}
          </div>
        )}

        {/* Hover overlay */}
        <div className="card-overlay" />
        <div className="card-cta">
          <button style={{
            width: '100%', padding: '0.7rem',
            background: 'rgba(13,10,7,0.88)', backdropFilter: 'blur(8px)',
            border: '1px solid rgba(201,169,110,0.5)', color: '#c9a96e',
            fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase',
            fontWeight: 600, cursor: 'pointer', fontFamily: "'Poppins', sans-serif",
          }}>
            Quick View
          </button>
        </div>
      </div>

      <div style={{ padding: '0.85rem 0.65rem 1.1rem' }}>
        <div style={{ fontSize: 'clamp(0.82rem, 3.5vw, 0.92rem)', fontWeight: 500, color: '#f0e6d3', marginBottom: '0.25rem', lineHeight: 1.35 }}>
          {title}
        </div>
        <div style={{ fontSize: '0.68rem', color: 'rgba(240,230,211,0.45)', marginBottom: '0.4rem', fontWeight: 400 }}>
          {subtitle}
        </div>
        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#c9a96e' }}>
          {price}
        </div>
      </div>
    </Link>
  );
}
