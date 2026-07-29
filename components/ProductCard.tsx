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
    <Link href={href} className="product-card block h-full transition-all duration-300 hover:-translate-y-1" style={{ background: 'rgba(18, 13, 8, 0.82)', backdropFilter: 'blur(12px)', border: '1px solid rgba(125, 91, 49, 0.25)', textDecoration: 'none' }}>
      <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden', background: '#140d08' }}>
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />

        {badge && (
          <div style={{
            position: 'absolute', top: '0.6rem', left: '0.6rem',
            background: 'linear-gradient(135deg, #7d5b31, #6e4b26)', color: '#f0e6d3',
            fontSize: '0.52rem', fontWeight: 700, letterSpacing: '0.18em',
            padding: '0.25rem 0.6rem', textTransform: 'uppercase', zIndex: 10,
            border: '1px solid rgba(201, 169, 110, 0.4)'
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

      <div style={{ padding: '1rem 0.85rem 1.2rem' }}>
        <div style={{ fontSize: 'clamp(0.85rem, 3.5vw, 0.95rem)', fontWeight: 500, color: '#f0e6d3', marginBottom: '0.25rem', lineHeight: 1.35 }}>
          {title}
        </div>
        <div style={{ fontSize: '0.7rem', color: 'rgba(240,230,211,0.5)', marginBottom: '0.5rem', fontWeight: 400 }}>
          {subtitle}
        </div>
        <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#c9a96e' }}>
          {price}
        </div>
      </div>
    </Link>
  );
}
