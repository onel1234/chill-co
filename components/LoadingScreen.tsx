"use client";

import React, { useState, useEffect } from 'react';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Don't show loading screen if the user has already seen it this session
    const hasLoaded = sessionStorage.getItem('chill-co-loaded');
    if (hasLoaded) {
      setLoading(false);
      return;
    }

    sessionStorage.setItem('chill-co-loaded', '1');

    const dismiss = () => {
      setAnimateOut(true);
      setTimeout(() => setLoading(false), 800);
    };

    // If page is already loaded, show briefly then dismiss
    if (document.readyState === 'complete') {
      const timer = setTimeout(dismiss, 1200);
      return () => clearTimeout(timer);
    }

    // Wait for the page to fully load, then dismiss
    const onLoad = () => {
      // Small extra delay so it doesn't feel jarring
      setTimeout(dismiss, 400);
    };
    window.addEventListener('load', onLoad);

    // Safety timeout — dismiss after 4s max even if load hasn't fired
    const maxTimer = setTimeout(dismiss, 4000);

    return () => {
      window.removeEventListener('load', onLoad);
      clearTimeout(maxTimer);
    };
  }, []);

  if (!loading) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-2xl transition-all duration-[800ms] ease-in-out ${
        animateOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background abstract shapes for glassmorphism effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[20%] w-[40vw] h-[40vw] bg-primary/10 rounded-full mix-blend-multiply filter blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[20%] right-[20%] w-[30vw] h-[30vw] bg-secondary-container/20 rounded-full mix-blend-multiply filter blur-[80px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Logo */}
        <div className={`flex flex-col items-center transition-transform duration-[1000ms] ${
          animateOut ? 'translate-y-[-20px]' : 'translate-y-0'
        }`}>
          <img 
            alt="Chill Co. Logo" 
            className="w-auto h-[80px] md:h-[110px] object-contain drop-shadow-2xl transition-all duration-500 ease-in-out" 
            src="/images/WhatsApp_Image_2026-07-26_at_23.42.00-removebg-preview.png" 
          />
        </div>

        {/* Animated Text */}
        <div className="mt-10 font-label-caps text-label-caps text-on-surface/60 tracking-[0.3em] uppercase flex items-center justify-center gap-[2px] flex-wrap px-4">
          <span className="inline-block animate-pulse">S</span>
          <span className="inline-block animate-pulse" style={{ animationDelay: '0.1s' }}>t</span>
          <span className="inline-block animate-pulse" style={{ animationDelay: '0.15s' }}>i</span>
          <span className="inline-block animate-pulse" style={{ animationDelay: '0.2s' }}>t</span>
          <span className="inline-block animate-pulse" style={{ animationDelay: '0.25s' }}>c</span>
          <span className="inline-block animate-pulse" style={{ animationDelay: '0.3s' }}>h</span>
          <span className="inline-block animate-pulse" style={{ animationDelay: '0.35s' }}>i</span>
          <span className="inline-block animate-pulse" style={{ animationDelay: '0.4s' }}>n</span>
          <span className="inline-block animate-pulse mr-2" style={{ animationDelay: '0.45s' }}>g</span>
          
          <span className="inline-block animate-pulse" style={{ animationDelay: '0.5s' }}>y</span>
          <span className="inline-block animate-pulse" style={{ animationDelay: '0.55s' }}>o</span>
          <span className="inline-block animate-pulse" style={{ animationDelay: '0.6s' }}>u</span>
          <span className="inline-block animate-pulse mr-2" style={{ animationDelay: '0.65s' }}>r</span>
          
          <span className="inline-block animate-pulse" style={{ animationDelay: '0.7s' }}>v</span>
          <span className="inline-block animate-pulse" style={{ animationDelay: '0.75s' }}>i</span>
          <span className="inline-block animate-pulse" style={{ animationDelay: '0.8s' }}>b</span>
          <span className="inline-block animate-pulse" style={{ animationDelay: '0.85s' }}>e</span>
          <span className="inline-block animate-pulse ml-1" style={{ animationDelay: '0.9s' }}>.</span>
          <span className="inline-block animate-pulse" style={{ animationDelay: '0.95s' }}>.</span>
          <span className="inline-block animate-pulse" style={{ animationDelay: '1s' }}>.</span>
        </div>
      </div>
    </div>
  );
}
