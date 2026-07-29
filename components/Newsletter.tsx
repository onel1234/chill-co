"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import OrnamentalDivider from './OrnamentalDivider';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="px-4 py-16 md:px-12 md:py-28 bg-[#0d0a07] text-center relative overflow-hidden">
      {/* Premium Background Image */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Image
          src="/images/newsletter_bg_1785313053968.jpg"
          alt="Premium textured background"
          fill
          style={{ objectFit: 'cover', opacity: 0.25 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(13,10,7,1) 0%, rgba(13,10,7,0.3) 50%, rgba(13,10,7,1) 100%)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '580px', margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem' }}>
          <OrnamentalDivider color="#6e4b26" />
        </div>
        <span style={{ fontSize: '0.58rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#7d5b31', fontWeight: 600 }}>
          Join the Circle
        </span>
        <h2 style={{
          margin: '0.75rem 0 1rem',
          fontSize: 'clamp(2.2rem, 6vw, 4.5rem)',
          fontWeight: 800, letterSpacing: '-0.03em',
          color: '#f0e6d3',
        }}>
          STAY <span className="shimmer-text">CHILL</span>
        </h2>
        <p style={{ fontSize: '0.85rem', lineHeight: 1.8, color: 'rgba(240,230,211,0.5)', fontWeight: 300, marginBottom: '2.5rem' }}>
          Get early access to drops, heritage edition reveals,
          and editorial stories from the island.
        </p>

        {submitted ? (
          <div style={{ padding: '1rem', color: '#c9a96e', fontSize: '0.85rem', border: '1px solid #7d5b31', backgroundColor: 'rgba(13,10,7,0.6)', backdropFilter: 'blur(8px)' }}>
            Thank you for joining the circle.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row max-w-[420px] mx-auto gap-2 sm:gap-0">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              style={{
                flex: 1,
                background: 'rgba(13,10,7,0.6)',
                border: '1px solid rgba(125,91,49,0.4)',
                color: '#f0e6d3',
                padding: '0.9rem 1.25rem',
                fontSize: '0.8rem',
                fontFamily: "'Poppins', sans-serif",
                outline: 'none',
                backdropFilter: 'blur(4px)',
              }}
            />
            <button type="submit" className="btn-gold w-full sm:w-auto" style={{ backgroundColor: 'rgba(13,10,7,0.8)' }}>
              <span>Submit</span>
            </button>
          </form>
        )}

        <div style={{ marginTop: '2rem' }}>
          <OrnamentalDivider color="#6e4b26" />
        </div>
      </div>
    </section>
  );
}
