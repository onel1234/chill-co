"use client";

import React from 'react';

const items = [
  { quote: '"Fashion is the armor to survive the reality of everyday life."', author: '— Bill Cunningham' },
  { quote: '"Style is a way to say who you are without having to speak."', author: '— Rachel Zoe' },
  { quote: '"Comfort is the ultimate Rebellion."', author: '— Chill Co.' },
  { quote: '"Wear the story, feel the heritage."', author: '— Ancient Craft' },
];

export default function MarqueeQuote() {
  return (
    <div
      style={{
        borderTop: '1px solid rgba(125,91,49,0.25)',
        borderBottom: '1px solid rgba(125,91,49,0.25)',
        padding: '1.1rem 0',
        overflow: 'hidden',
        background: '#0d0a07',
        position: 'relative',
        userSelect: 'none',
      }}
    >
      <style>{`
        @keyframes marqueeLoop {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .marquee-container {
          display: flex;
          width: max-content;
          white-space: nowrap;
          animation: marqueeLoop 35s linear infinite;
          will-change: transform;
        }
        .marquee-container:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="marquee-container">
        {/* Track 1 */}
        <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          {items.map((item, i) => (
            <div key={`t1-${i}`} style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ padding: '0 1.75rem', fontSize: '0.75rem', fontWeight: 300, fontStyle: 'italic', letterSpacing: '0.06em', color: 'rgba(240,230,211,0.65)' }}>
                {item.quote}
              </span>
              <span style={{ color: '#c9a96e', fontSize: '0.62rem', padding: '0 0.5rem', fontWeight: 500, letterSpacing: '0.05em' }}>
                {item.author}
              </span>
              <span style={{ color: '#7d5b31', padding: '0 2rem', fontSize: '0.7rem' }}>✦</span>
            </div>
          ))}
        </div>

        {/* Track 2 (Duplicate for seamless 100% loop) */}
        <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          {items.map((item, i) => (
            <div key={`t2-${i}`} style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ padding: '0 1.75rem', fontSize: '0.75rem', fontWeight: 300, fontStyle: 'italic', letterSpacing: '0.06em', color: 'rgba(240,230,211,0.65)' }}>
                {item.quote}
              </span>
              <span style={{ color: '#c9a96e', fontSize: '0.62rem', padding: '0 0.5rem', fontWeight: 500, letterSpacing: '0.05em' }}>
                {item.author}
              </span>
              <span style={{ color: '#7d5b31', padding: '0 2rem', fontSize: '0.7rem' }}>✦</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
