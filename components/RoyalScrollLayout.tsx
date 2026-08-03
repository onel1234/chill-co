"use client";

import React, { useState } from 'react';
import Link from 'next/link';

interface Section {
  id: string;
  title: string;
  subTitle?: string;
  content: React.ReactNode;
}

interface RoyalScrollLayoutProps {
  activeTab: 'privacy' | 'terms';
  title: string;
  sinhalaTitle?: string;
  subtitle: string;
  effectiveDate: string;
  sections: Section[];
}

export default function RoyalScrollLayout({
  activeTab,
  title,
  sinhalaTitle,
  subtitle,
  effectiveDate,
  sections,
}: RoyalScrollLayoutProps) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || '');

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main
      style={{
        backgroundColor: '#070503',
        minHeight: '100vh',
        paddingTop: '100px',
        paddingBottom: '100px',
        color: '#f0e6d3',
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .scroll-container {
            padding: 0 0.5rem !important;
          }
          .scroll-body {
            padding: 2rem 1.15rem !important;
          }
          .scroll-section {
            padding: 1.25rem 1rem !important;
          }
          .scroll-tab {
            width: 100% !important;
            justify-content: center !important;
          }
          .scroll-toc {
            grid-template-columns: 1fr !important;
            gap: 0.5rem !important;
          }
          .scroll-roller-text {
            font-size: 0.45rem !important;
            letter-spacing: 0.12em !important;
          }
          .scroll-roller-line {
            width: 15px !important;
          }
          .scroll-handle-left {
            left: -10px !important;
            width: 14px !important;
          }
          .scroll-handle-right {
            right: -10px !important;
            width: 14px !important;
          }
          .action-toolbar {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.75rem !important;
          }
          .scroll-main-title {
            font-size: clamp(1.6rem, 7vw, 2.5rem) !important;
          }
        }
      `}</style>

      {/* Ambient background glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80vw',
          height: '60vh',
          background: 'radial-gradient(ellipse at center, rgba(125,91,49,0.12) 0%, rgba(7,5,3,0) 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="scroll-container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 10 }}>
        
        {/* Navigation Tabs Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '2.5rem',
            flexWrap: 'wrap',
          }}
        >
          <Link
            href="/privacy-policy"
            className="scroll-tab"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.75rem 1.75rem',
              background: activeTab === 'privacy'
                ? 'linear-gradient(135deg, #7d5b31 0%, #4a341b 100%)'
                : 'rgba(20,13,8,0.8)',
              border: activeTab === 'privacy'
                ? '1px solid #c9a96e'
                : '1px solid rgba(125,91,49,0.3)',
              borderRadius: '2px',
              color: activeTab === 'privacy' ? '#f0e6d3' : 'rgba(240,230,211,0.6)',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              boxShadow: activeTab === 'privacy' ? '0 4px 20px rgba(125,91,49,0.4)' : 'none',
              transition: 'all 0.3s ease',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: activeTab === 'privacy' ? '#c9a96e' : 'transparent',
                border: '1px solid #c9a96e',
                flexShrink: 0,
              }}
            />
            Privacy Policy
          </Link>

          <Link
            href="/terms-and-conditions"
            className="scroll-tab"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.75rem 1.75rem',
              background: activeTab === 'terms'
                ? 'linear-gradient(135deg, #7d5b31 0%, #4a341b 100%)'
                : 'rgba(20,13,8,0.8)',
              border: activeTab === 'terms'
                ? '1px solid #c9a96e'
                : '1px solid rgba(125,91,49,0.3)',
              borderRadius: '2px',
              color: activeTab === 'terms' ? '#f0e6d3' : 'rgba(240,230,211,0.6)',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              boxShadow: activeTab === 'terms' ? '0 4px 20px rgba(125,91,49,0.4)' : 'none',
              transition: 'all 0.3s ease',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: activeTab === 'terms' ? '#c9a96e' : 'transparent',
                border: '1px solid #c9a96e',
                flexShrink: 0,
              }}
            />
            Terms & Conditions
          </Link>
        </div>

        {/* Action Toolbar */}
        <div
          className="action-toolbar"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
            padding: '0 0.5rem',
            fontSize: '0.7rem',
            color: '#c9a96e',
            letterSpacing: '0.1em',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>verified_user</span>
            <span>OFFICIAL LEGAL POLICY • CHILL CO.</span>
          </div>
          <button
            onClick={() => window.print()}
            style={{
              background: 'none',
              border: '1px solid rgba(125,91,49,0.4)',
              color: '#c9a96e',
              padding: '0.35rem 0.85rem',
              fontSize: '0.65rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'all 0.2s ease',
            }}
            onMouseOver={(e) => (e.currentTarget.style.borderColor = '#c9a96e')}
            onMouseOut={(e) => (e.currentTarget.style.borderColor = 'rgba(125,91,49,0.4)')}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>print</span>
            Print Document
          </button>
        </div>

        {/* THE PARCHMENT SCROLL WRAPPER */}
        <div style={{ position: 'relative' }}>

          {/* TOP WOODEN / BRASS SCROLL ROLLER */}
          <div style={{ position: 'relative', zIndex: 20, marginBottom: '-8px' }}>
            {/* Wooden Roller Body */}
            <div
              style={{
                height: '32px',
                background: 'linear-gradient(180deg, #1b120a 0%, #3e2815 30%, #634324 50%, #3e2815 80%, #170d06 100%)',
                borderRadius: '4px',
                border: '1px solid #7d5b31',
                boxShadow: '0 8px 25px rgba(0,0,0,0.8), inset 0 2px 4px rgba(201,169,110,0.4)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 12px',
              }}
            >
              {/* Gold Ornament band on roller left */}
              <div
                style={{
                  width: '24px',
                  height: '100%',
                  background: 'linear-gradient(90deg, #7d5b31, #c9a96e, #7d5b31)',
                  borderLeft: '1px solid #ffe8b5',
                  borderRight: '1px solid #5a3c1a',
                  flexShrink: 0,
                }}
              />
              {/* Center Emblem */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 1, minWidth: 0 }}>
                <div className="scroll-roller-line" style={{ width: '40px', height: '1px', background: 'linear-gradient(90deg, transparent, #c9a96e)', flexShrink: 1 }} />
                <svg viewBox="0 0 24 24" width="16" height="16" fill="#c9a96e" style={{ flexShrink: 0 }}>
                  <path d="M12 2L14.5 8.5L21 9L16 13.5L17.5 20L12 16.5L6.5 20L8 13.5L3 9L9.5 8.5Z" />
                </svg>
                <span className="scroll-roller-text" style={{ fontSize: '0.6rem', letterSpacing: '0.25em', color: '#ffe8b5', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  CHILL CO. OFFICIAL DOCUMENT
                </span>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="#c9a96e" style={{ flexShrink: 0 }}>
                  <path d="M12 2L14.5 8.5L21 9L16 13.5L17.5 20L12 16.5L6.5 20L8 13.5L3 9L9.5 8.5Z" />
                </svg>
                <div className="scroll-roller-line" style={{ width: '40px', height: '1px', background: 'linear-gradient(90deg, #c9a96e, transparent)', flexShrink: 1 }} />
              </div>
              {/* Gold Ornament band on roller right */}
              <div
                style={{
                  width: '24px',
                  height: '100%',
                  background: 'linear-gradient(90deg, #7d5b31, #c9a96e, #7d5b31)',
                  borderLeft: '1px solid #ffe8b5',
                  borderRight: '1px solid #5a3c1a',
                  flexShrink: 0,
                }}
              />
            </div>

            {/* Brass End Handles Left & Right */}
            <div
              className="scroll-handle-left"
              style={{
                position: 'absolute',
                top: '-8px',
                left: '-16px',
                width: '20px',
                height: '48px',
                background: 'radial-gradient(circle at 30% 30%, #ffe8b5 0%, #c9a96e 40%, #7d5b31 80%, #3e2815 100%)',
                borderRadius: '10px 0 0 10px',
                boxShadow: '-4px 2px 10px rgba(0,0,0,0.7)',
                border: '1px solid #ffe8b5',
              }}
            />
            <div
              className="scroll-handle-right"
              style={{
                position: 'absolute',
                top: '-8px',
                right: '-16px',
                width: '20px',
                height: '48px',
                background: 'radial-gradient(circle at 70% 30%, #ffe8b5 0%, #c9a96e 40%, #7d5b31 80%, #3e2815 100%)',
                borderRadius: '0 10px 10px 0',
                boxShadow: '4px 2px 10px rgba(0,0,0,0.7)',
                border: '1px solid #ffe8b5',
              }}
            />
          </div>

          {/* PARCHMENT BODY */}
          <div
            className="scroll-body"
            style={{
              backgroundColor: '#16100a',
              backgroundImage: `
                radial-gradient(circle at 50% 0%, rgba(125,91,49,0.25) 0%, transparent 60%),
                radial-gradient(circle at 50% 100%, rgba(125,91,49,0.2) 0%, transparent 60%),
                linear-gradient(180deg, #1c140c 0%, #16100a 30%, #140d07 70%, #1b130b 100%)
              `,
              borderLeft: '4px solid #4a341b',
              borderRight: '4px solid #4a341b',
              padding: '3.5rem 3rem',
              boxShadow: '0 20px 50px rgba(0,0,0,0.9), inset 0 0 80px rgba(0,0,0,0.8), inset 0 0 15px rgba(201,169,110,0.2)',
              position: 'relative',
            }}
          >
            {/* Liyavela Outer Gold Border Motif Frame */}
            <div
              style={{
                position: 'absolute',
                inset: '10px',
                border: '1px solid rgba(201,169,110,0.4)',
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: '14px',
                border: '1px solid rgba(125,91,49,0.3)',
                pointerEvents: 'none',
              }}
            />

            {/* Four Corner Traditional Sri Lankan Ornamental Accents */}
            {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner) => {
              const isTop = corner.includes('top');
              const isLeft = corner.includes('left');
              return (
                <div
                  key={corner}
                  style={{
                    position: 'absolute',
                    top: isTop ? '18px' : 'auto',
                    bottom: !isTop ? '18px' : 'auto',
                    left: isLeft ? '18px' : 'auto',
                    right: !isLeft ? '18px' : 'auto',
                    width: '24px',
                    height: '24px',
                    pointerEvents: 'none',
                    transform: `scale(${isLeft ? 1 : -1}, ${isTop ? 1 : -1})`,
                  }}
                >
                  <svg viewBox="0 0 30 30" width="24" height="24" fill="none" stroke="#c9a96e" strokeWidth="1.2">
                    <path d="M2 2 H28 V28" />
                    <circle cx="6" cy="6" r="2" fill="#c9a96e" />
                    <path d="M12 2 C12 10, 10 12, 2 12" stroke="#7d5b31" />
                  </svg>
                </div>
              );
            })}

            {/* Header Section */}
            <div style={{ textAlign: 'center', marginBottom: '2.5rem', position: 'relative', zIndex: 5 }}>
              
              {/* Crest Symbol */}
              <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1rem' }}>
                <svg viewBox="0 0 100 60" width="70" height="42" style={{ filter: 'drop-shadow(0 2px 8px rgba(201,169,110,0.3))' }}>
                  <g fill="#c9a96e">
                    <circle cx="25" cy="20" r="8" />
                    <path d="M25 6 L25 10 M25 30 L25 34 M11 20 L15 20 M35 20 L39 20 M15 10 L18 13 M32 27 L35 30 M15 30 L18 27 M32 13 L35 10" stroke="#c9a96e" strokeWidth="1.5" />
                    <path d="M75 12 A10 10 0 1 0 82 28 A12 12 0 1 1 75 12 Z" />
                    <path d="M50 8 L57 22 L66 17 L62 30 L38 30 L34 17 L43 22 Z" />
                    <circle cx="50" cy="5" r="2.5" fill="#ffe8b5" />
                  </g>
                  <path d="M10 42 Q50 52 90 42" stroke="#7d5b31" strokeWidth="1.5" fill="none" />
                  <circle cx="50" cy="46" r="3" fill="#c9a96e" />
                </svg>
                {sinhalaTitle && (
                  <span style={{ fontSize: '0.8rem', color: '#c9a96e', letterSpacing: '0.2em', fontWeight: 600, marginTop: '0.25rem' }}>
                    {sinhalaTitle}
                  </span>
                )}
              </div>

              <h1
                className="scroll-main-title"
                style={{
                  fontSize: 'clamp(1.8rem, 5vw, 3.2rem)',
                  fontWeight: 800,
                  fontFamily: 'serif',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  lineHeight: 1.15,
                  marginBottom: '0.75rem',
                  background: 'linear-gradient(135deg, #ffe8b5 0%, #c9a96e 40%, #e8d5b0 70%, #9a7644 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.8))',
                }}
              >
                {title}
              </h1>

              <p
                style={{
                  fontSize: '0.78rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'rgba(240,230,211,0.7)',
                  maxWidth: '600px',
                  margin: '0 auto 1.25rem auto',
                  fontWeight: 300,
                  lineHeight: 1.5,
                }}
              >
                {subtitle}
              </p>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.4rem 1rem',
                  background: 'rgba(20,13,8,0.7)',
                  border: '1px solid rgba(125,91,49,0.3)',
                  fontSize: '0.62rem',
                  letterSpacing: '0.12em',
                  color: '#c9a96e',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>verified</span>
                LAST UPDATED & EFFECTIVE DATE: {effectiveDate}
              </div>

              {/* Ornamental Section Divider */}
              <div style={{ marginTop: '1.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, #7d5b31)' }} />
                <svg viewBox="0 0 60 16" width="50" height="14" style={{ margin: '0 0.75rem', flexShrink: 0 }}>
                  <path d="M30 0 L38 8 L30 16 L22 8 Z" fill="#c9a96e" />
                  <circle cx="10" cy="8" r="2" fill="#7d5b31" />
                  <circle cx="50" cy="8" r="2" fill="#7d5b31" />
                </svg>
                <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, #7d5b31, transparent)' }} />
              </div>
            </div>

            {/* Quick Table of Contents Jump Links */}
            <div
              style={{
                backgroundColor: 'rgba(10,7,5,0.6)',
                border: '1px solid rgba(125,91,49,0.25)',
                padding: '1rem 1.25rem',
                marginBottom: '2.5rem',
                borderRadius: '2px',
              }}
            >
              <div
                style={{
                  fontSize: '0.6rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#c9a96e',
                  fontWeight: 700,
                  marginBottom: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>segment</span>
                TABLE OF CONTENTS
              </div>
              <div
                className="scroll-toc"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '0.5rem 1rem',
                }}
              >
                {sections.map((sec, idx) => (
                  <button
                    key={sec.id}
                    onClick={() => scrollToSection(sec.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: '0.2rem 0',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '0.72rem',
                      color: activeSection === sec.id ? '#ffe8b5' : 'rgba(240,230,211,0.6)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      transition: 'color 0.2s ease',
                      lineHeight: 1.4,
                    }}
                  >
                    <span style={{ color: '#c9a96e', fontWeight: 700, fontSize: '0.68rem', flexShrink: 0 }}>
                      § {idx + 1}.
                    </span>
                    <span style={{ textDecoration: activeSection === sec.id ? 'underline' : 'none', wordBreak: 'break-word' }}>
                      {sec.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* MAIN POLICY SECTIONS CONTENT */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', position: 'relative', zIndex: 5 }}>
              {sections.map((sec, idx) => (
                <section
                  key={sec.id}
                  id={sec.id}
                  className="scroll-section"
                  style={{
                    backgroundColor: 'rgba(10,7,5,0.4)',
                    border: '1px solid rgba(125,91,49,0.18)',
                    padding: '1.75rem 2rem',
                    position: 'relative',
                  }}
                >
                  {/* Section Title */}
                  <div style={{ marginBottom: '1rem' }}>
                    <div
                      style={{
                        fontSize: '0.58rem',
                        letterSpacing: '0.22em',
                        textTransform: 'uppercase',
                        color: '#7d5b31',
                        fontWeight: 700,
                        marginBottom: '0.25rem',
                      }}
                    >
                      SECTION {idx + 1}
                    </div>
                    <h2
                      style={{
                        fontSize: 'clamp(1.1rem, 3.5vw, 1.35rem)',
                        fontWeight: 700,
                        fontFamily: 'serif',
                        color: '#c9a96e',
                        letterSpacing: '0.02em',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        flexWrap: 'wrap',
                      }}
                    >
                      <span
                        style={{
                          width: '26px',
                          height: '26px',
                          background: 'linear-gradient(135deg, #7d5b31, #3e2815)',
                          color: '#ffe8b5',
                          borderRadius: '2px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.8rem',
                          fontWeight: 800,
                          border: '1px solid #c9a96e',
                          flexShrink: 0,
                        }}
                      >
                        {idx + 1}
                      </span>
                      {sec.title}
                    </h2>
                    {sec.subTitle && (
                      <p style={{ fontSize: '0.72rem', color: 'rgba(240,230,211,0.5)', marginTop: '0.25rem', fontStyle: 'italic' }}>
                        {sec.subTitle}
                      </p>
                    )}
                  </div>

                  {/* Body text */}
                  <div
                    style={{
                      color: 'rgba(240,230,211,0.85)',
                      fontSize: '0.88rem',
                      lineHeight: 1.8,
                      fontWeight: 300,
                      wordBreak: 'break-word',
                    }}
                  >
                    {sec.content}
                  </div>
                </section>
              ))}
            </div>

            {/* WAX SEAL BADGE AT BOTTOM */}
            <div
              style={{
                marginTop: '3.5rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
              }}
            >
              {/* Silk Gold/Red Ribbon hanging from Seal */}
              <div
                style={{
                  width: '22px',
                  height: '50px',
                  background: 'linear-gradient(180deg, #7d5b31 0%, #b81c1c 40%, #7a0d0d 100%)',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.6)',
                  marginBottom: '-16px',
                  borderRadius: '0 0 4px 4px',
                  position: 'relative',
                  zIndex: 1,
                }}
              />

              {/* Circular Wax Seal Badge */}
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 35% 35%, #d93838 0%, #9e1b1b 50%, #520909 100%)',
                  border: '3px solid #c9a96e',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.8), inset 0 3px 8px rgba(255,232,181,0.5)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  zIndex: 2,
                  color: '#ffe8b5',
                  padding: '4px',
                }}
              >
                <svg viewBox="0 0 24 24" width="20" height="20" fill="#ffe8b5">
                  <path d="M12 1L15 8L22 9L17 14L18.5 21L12 17.5L5.5 21L7 14L2 9L9 8Z" />
                </svg>
                <span style={{ fontSize: '0.42rem', fontWeight: 800, letterSpacing: '0.12em', marginTop: '2px', textAlign: 'center' }}>
                  CHILL CO.
                </span>
                <span style={{ fontSize: '0.36rem', letterSpacing: '0.1em', opacity: 0.85 }}>
                  VERIFIED
                </span>
              </div>

              <div style={{ marginTop: '1rem' }}>
                <p style={{ fontSize: '0.75rem', color: '#c9a96e', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>
                  CHILL CO. COMPLIANCE & LEGAL AFFAIRS
                </p>
                <p style={{ fontSize: '0.65rem', color: 'rgba(240,230,211,0.4)', marginTop: '0.2rem' }}>
                  Colombo, Western Province, Democratic Socialist Republic of Sri Lanka
                </p>
              </div>
            </div>

          </div>

          {/* BOTTOM WOODEN / BRASS SCROLL ROLLER */}
          <div style={{ position: 'relative', zIndex: 20, marginTop: '-8px' }}>
            {/* Wooden Roller Body */}
            <div
              style={{
                height: '32px',
                background: 'linear-gradient(180deg, #1b120a 0%, #3e2815 30%, #634324 50%, #3e2815 80%, #170d06 100%)',
                borderRadius: '4px',
                border: '1px solid #7d5b31',
                boxShadow: '0 -8px 25px rgba(0,0,0,0.8), inset 0 -2px 4px rgba(201,169,110,0.4)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 12px',
              }}
            >
              <div
                style={{
                  width: '24px',
                  height: '100%',
                  background: 'linear-gradient(90deg, #7d5b31, #c9a96e, #7d5b31)',
                  borderLeft: '1px solid #ffe8b5',
                  borderRight: '1px solid #5a3c1a',
                  flexShrink: 0,
                }}
              />
              <span className="scroll-roller-text" style={{ fontSize: '0.55rem', letterSpacing: '0.25em', color: 'rgba(255,232,181,0.6)', textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                CHILL CO. • ALL RIGHTS RESERVED
              </span>
              <div
                style={{
                  width: '24px',
                  height: '100%',
                  background: 'linear-gradient(90deg, #7d5b31, #c9a96e, #7d5b31)',
                  borderLeft: '1px solid #ffe8b5',
                  borderRight: '1px solid #5a3c1a',
                  flexShrink: 0,
                }}
              />
            </div>

            {/* Brass End Handles Left & Right */}
            <div
              className="scroll-handle-left"
              style={{
                position: 'absolute',
                top: '-8px',
                left: '-16px',
                width: '20px',
                height: '48px',
                background: 'radial-gradient(circle at 30% 30%, #ffe8b5 0%, #c9a96e 40%, #7d5b31 80%, #3e2815 100%)',
                borderRadius: '10px 0 0 10px',
                boxShadow: '-4px -2px 10px rgba(0,0,0,0.7)',
                border: '1px solid #ffe8b5',
              }}
            />
            <div
              className="scroll-handle-right"
              style={{
                position: 'absolute',
                top: '-8px',
                right: '-16px',
                width: '20px',
                height: '48px',
                background: 'radial-gradient(circle at 70% 30%, #ffe8b5 0%, #c9a96e 40%, #7d5b31 80%, #3e2815 100%)',
                borderRadius: '0 10px 10px 0',
                boxShadow: '4px -2px 10px rgba(0,0,0,0.7)',
                border: '1px solid #ffe8b5',
              }}
            />
          </div>

        </div>

        {/* Back to Home CTA */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link href="/" className="btn-gold">
            <span>Return To Store</span>
          </Link>
        </div>

      </div>
    </main>
  );
}
