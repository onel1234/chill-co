import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section style={{ position: 'relative', height: '100svh', minHeight: '600px', overflow: 'hidden' }}>
      {/* Desktop image — LCP element, load with priority */}
      <Image
        src="/images/ChatGPT_Image_Jul_23__2026__10_00_30_PM.png"
        alt="Kandyan dancer with Sigiriya rock fortress — ancient Sri Lanka"
        fill
        priority
        sizes="100vw"
        style={{ objectFit: 'cover', objectPosition: 'center center' }}
        className="hero-img-desktop"
      />

      {/* Mobile image */}
      <Image
        src="/images/ChatGPT_Image_Jul_24__2026__01_13_05_PM.png"
        alt="Kandyan dancer with Sigiriya — portrait view"
        fill
        priority={false}
        sizes="100vw"
        style={{ objectFit: 'cover', objectPosition: 'center 35%' }}
        className="hero-img-mobile"
      />

      {/* Depth overlays */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(13,10,7,0.18) 0%, rgba(13,10,7,0.05) 30%, rgba(13,10,7,0.55) 65%, rgba(13,10,7,0.97) 100%)',
      }} />
      <div className="hero-side-grad" style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, rgba(13,10,7,0.52) 0%, transparent 55%)',
      }} />

      {/* Label — top right */}
      <div className="hero-label" style={{
        position: 'absolute', top: '5.5rem', right: '2.5rem',
        display: 'flex', alignItems: 'center', gap: '0.75rem',
      }}>
        <span style={{ fontSize: '0.58rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#c9a96e', fontWeight: 600 }}>
          Latest Drops
        </span>
        <div style={{ width: '2rem', height: '1px', background: '#7d5b31' }} />
      </div>

      {/* Main text — bottom */}
      <div className="hero-content" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 2rem 3.5rem' }}>

        {/* Eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <div style={{ width: '1.5rem', height: '1px', background: '#7d5b31' }} />
          <span className="hero-eyebrow" style={{ fontSize: '0.52rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(201,169,110,0.7)', fontWeight: 500 }}>
            Ancient Craft · Modern Spirit
          </span>
        </div>

        {/* Headline */}
        <h1 style={{ margin: '0 0 1rem', lineHeight: 0.88 }}>
          <span className="hero-h1" style={{
            display: 'block',
            fontWeight: 800, letterSpacing: '-0.02em', color: '#f0e6d3',
          }}>
            Wear the
          </span>
          <span className="hero-h1" style={{
            display: 'block',
            fontWeight: 800, letterSpacing: '-0.02em',
            color: 'transparent',
            WebkitTextStroke: '1.5px #c9a96e',
          }}>
            Story.
          </span>
        </h1>

        {/* Sub-row */}
        <div className="hero-subrow" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.25rem' }}>
          <p className="hero-sub" style={{ margin: 0, fontWeight: 300, color: 'rgba(240,230,211,0.6)', letterSpacing: '0.02em', lineHeight: 1.7 }}>
            Premium fabrics. Oversized fit.<br className="hero-br" /> Everyday wear.
          </p>
          <Link href="/shop" className="btn-gold hero-cta">
            <span>Shop Now</span>
          </Link>
        </div>
      </div>

      {/* Mobile scroll hint */}
      <div className="hero-scroll-hint" style={{
        position: 'absolute', bottom: '1rem', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem',
        zIndex: 3,
      }}>
        <div style={{ width: '1px', height: '2rem', background: 'linear-gradient(to bottom, #7d5b31, transparent)', animation: 'float 2s ease-in-out infinite' }} />
      </div>
    </section>
  );
}

