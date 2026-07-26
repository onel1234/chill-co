import React from 'react';

export default function OrnamentalDivider({ color = '#7d5b31', className = '' }: { color?: string; className?: string }) {
  return (
    <div className={`relative flex items-center justify-center py-1 ${className}`}>
      <div style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, transparent, ${color})` }} />
      <svg viewBox="0 0 40 14" width="40" height="14" className="mx-3 flex-shrink-0">
        <g fill={color}>
          <path d="M20 1 L26 7 L20 13 L14 7 Z" />
          <circle cx="6" cy="7" r="1.5" />
          <circle cx="34" cy="7" r="1.5" />
        </g>
      </svg>
      <div style={{ flex: 1, height: '1px', background: `linear-gradient(90deg, ${color}, transparent)` }} />
    </div>
  );
}
