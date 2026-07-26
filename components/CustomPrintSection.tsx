"use client";

import React, { useState } from 'react';
import CustomPrintModal from './CustomPrintModal';
import OrnamentalDivider from './OrnamentalDivider';

export default function CustomPrintSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section style={{ position: 'relative', overflow: 'hidden', background: '#070503' }}>
        {/* Full-bleed fabric image */}
        <div style={{ position: 'relative', minHeight: '680px', display: 'flex', alignItems: 'center' }}>
          <img
            src="/images/ChatGPT_Image_Jul_23__2026__10_08_10_PM.png"
            alt="Premium dark fabric with gold Sri Lankan cultural motifs — elephant, lotus, temple scrollwork"
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center',
            }}
          />

          {/* Vignette — deep edges, clear center */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse 70% 65% at 50% 50%, transparent 0%, rgba(7,5,3,0.55) 60%, rgba(7,5,3,0.97) 100%)',
          }} />
          {/* Top + bottom fade to page */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(13,10,7,0.9) 0%, transparent 18%, transparent 82%, rgba(13,10,7,0.95) 100%)',
          }} />

          {/* Content — centered over the fabric */}
          <div style={{
            position: 'relative', zIndex: 2,
            width: '100%', padding: '6rem 2rem',
            display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
          }}>

            {/* Label */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.75rem' }}>
              <div style={{ width: '2.5rem', height: '1px', background: 'rgba(125,91,49,0.7)' }} />
              <span style={{ fontSize: '0.58rem', letterSpacing: '0.38em', textTransform: 'uppercase', color: '#c9a96e', fontWeight: 600 }}>
                Make It Yours
              </span>
              <div style={{ width: '2.5rem', height: '1px', background: 'rgba(125,91,49,0.7)' }} />
            </div>

            {/* Main heading */}
            <h2 style={{
              margin: '0 0 0.4rem',
              fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
              fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 0.95,
              color: '#f0e6d3',
            }}>
              Custom Print
            </h2>
            <h2
              style={{
                margin: '0 0 2rem',
                fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
                fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 0.95,
              }}
              className="shimmer-text"
            >
              Studio
            </h2>

            {/* Body */}
            <p style={{
              maxWidth: '480px', margin: '0 0 3rem',
              fontSize: '0.88rem', fontWeight: 300, lineHeight: 1.85,
              color: 'rgba(240,230,211,0.6)', letterSpacing: '0.02em',
            }}>
              Upload your own graphic — front or back — choose your fit and fabric,
              and we&apos;ll produce a singular custom piece rooted in the craft of ancient Lanka.
              Your story, worn.
            </p>

            {/* CTA Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-gold"
              style={{ marginBottom: '4.5rem', padding: '1rem 3rem' }}
            >
              <span>Customize Your Own →</span>
            </button>

            {/* Ornament before steps */}
            <div style={{ width: '100%', maxWidth: '640px', marginBottom: '3rem' }}>
              <OrnamentalDivider color="#6e4b26" />
            </div>

            {/* 3-step process */}
            <div
              className="collections-3"
              style={{
                display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0',
                width: '100%', maxWidth: '680px',
                border: '1px solid rgba(125,91,49,0.25)',
              }}
            >
              {[
                { num: '01', title: 'Upload Artwork', desc: 'Your graphic, motif, or heritage print' },
                { num: '02', title: 'Choose Fit', desc: 'Oversized, relaxed, or tailored silhouette' },
                { num: '03', title: 'Receive Creation', desc: 'Crafted and delivered to your door' },
              ].map((step, i) => (
                <div
                  key={step.num}
                  className="heritage-card"
                  style={{
                    padding: '2rem 1.5rem',
                    borderLeft: i > 0 ? '1px solid rgba(125,91,49,0.25)' : 'none',
                    borderRadius: 0,
                    background: 'rgba(13,10,7,0.65)',
                    backdropFilter: 'blur(12px)',
                    textAlign: 'center',
                    transition: 'background 0.3s ease',
                  }}
                >
                  <div style={{
                    fontSize: '0.55rem', letterSpacing: '0.3em', textTransform: 'uppercase',
                    color: '#7d5b31', fontWeight: 700, marginBottom: '0.75rem',
                  }}>
                    {step.num}
                  </div>
                  <div style={{ width: '1.5rem', height: '1px', background: '#7d5b31', margin: '0 auto 0.75rem' }} />
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#f0e6d3', marginBottom: '0.4rem', letterSpacing: '0.02em' }}>
                    {step.title}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'rgba(240,230,211,0.4)', fontWeight: 300, lineHeight: 1.6 }}>
                    {step.desc}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Custom Print Modal */}
      <CustomPrintModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
