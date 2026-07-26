import React from 'react';

export default function CrownBorder() {
  return (
    <svg viewBox="0 0 1440 20" width="100%" height="20" preserveAspectRatio="none">
      <defs>
        <pattern id="crown" x="0" y="0" width="48" height="20" patternUnits="userSpaceOnUse">
          <path d="M24 1 L29 8 L34 5 L32 12 L16 12 L14 5 L19 8 Z" fill="#7d5b31" />
          <path d="M0 20 L48 20 L48 14 L0 14 Z" fill="#7d5b31" />
          <path d="M0 14 L48 14" stroke="#c9a96e" strokeWidth="0.4" fill="none" />
        </pattern>
      </defs>
      <rect width="1440" height="20" fill="url(#crown)" />
    </svg>
  );
}
