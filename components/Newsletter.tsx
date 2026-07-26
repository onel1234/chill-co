"use client";

import React, { useState } from 'react';
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
    <section style={{ padding: '7rem 3rem', background: '#0d0a07', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative peacock behind */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: 0.04, pointerEvents: 'none',
      }}>
        <img src="/images/WhatsApp_Image_2026-07-10_at_09.12.30.jpeg" alt="" style={{ width: '50vw', maxWidth: '700px', objectFit: 'contain' }} />
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
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
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
          <div style={{ padding: '1rem', color: '#c9a96e', fontSize: '0.85rem', border: '1px solid #7d5b31' }}>
            Thank you for joining the circle.
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', maxWidth: '420px', margin: '0 auto' }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              style={{
                flex: 1,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(125,91,49,0.4)',
                borderRight: 'none',
                color: '#f0e6d3',
                padding: '0.9rem 1.25rem',
                fontSize: '0.8rem',
                fontFamily: "'Poppins', sans-serif",
                outline: 'none',
              }}
            />
            <button type="submit" className="btn-gold">
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
