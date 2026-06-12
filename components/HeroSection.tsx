"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const slides = [
  {
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2520&auto=format&fit=crop",
    title: "Latest Drops",
    subtitle: "Premium fabrics. Oversized fit. Everyday wear."
  },
  {
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2370&auto=format&fit=crop",
    title: "Exclusive",
    subtitle: "Streetwear essentials designed for comfort."
  },
  {
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2671&auto=format&fit=crop",
    title: "Heritage",
    subtitle: "Building your perfect capsule wardrobe."
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Slideshow Backgrounds */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-[1500ms] ease-in-out ${
            index === currentSlide ? "opacity-100 z-0" : "opacity-0 -z-10"
          }`}
        >
          {/* Subtle gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <img
            src={slide.image}
            alt={slide.title}
            className={`w-full h-full object-cover transition-transform duration-[10000ms] ease-linear ${
              index === currentSlide ? "scale-105" : "scale-100"
            }`}
          />
        </div>
      ))}

      {/* Content - Clean text over image */}
      <div className="relative z-20 w-full max-w-5xl px-6 md:px-12 flex flex-col items-center justify-center text-center mt-16">
        
        <div className="h-28 md:h-32 flex items-center justify-center relative w-full overflow-visible">
          {slides.map((slide, index) => (
             <h1 
               key={`title-${index}`}
               className={`absolute font-body-md text-5xl md:text-[84px] font-bold tracking-tight text-white transition-all duration-1000 transform leading-[1.1] md:leading-none w-full ${
                 index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
               }`}
             >
               {slide.title}
             </h1>
          ))}
        </div>
        
        <div className="h-16 md:h-10 flex items-center justify-center relative w-full mb-8">
           {slides.map((slide, index) => (
              <p 
                key={`subtitle-${index}`}
                className={`absolute font-body-lg text-base md:text-xl text-white/90 max-w-md mx-auto transition-all duration-1000 w-full ${
                  index === currentSlide ? "opacity-100 delay-300" : "opacity-0 pointer-events-none"
                }`}
              >
                {slide.subtitle}
              </p>
           ))}
        </div>

        <div className="pt-4 z-30">
          <Link href="/collections" className="inline-flex items-center justify-center text-white font-body-md text-xs md:text-sm px-10 py-3 uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors duration-300 border border-white rounded-full">
            Shop Now
          </Link>
        </div>
      </div>
      
      {/* Slideshow Indicators - Positioned absolutely to the header */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center space-x-4 z-30">
        {slides.map((_, index) => {
          const isActive = index === currentSlide;
          return (
            <button
              key={`indicator-${index}`}
              onClick={() => setCurrentSlide(index)}
              className="relative flex items-center justify-center w-8 h-8 group"
              aria-label={`Go to slide ${index + 1}`}
            >
              {/* Center dot */}
              <div className={`w-2 h-2 rounded-full transition-all duration-300 ${isActive ? 'bg-white' : 'bg-white/50 group-hover:bg-white/80'}`} />
              
              {/* Progress ring for active slide */}
              {isActive && (
                <svg key={`ring-${currentSlide}`} className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 24 24">
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="white"
                    strokeWidth="1.25"
                    fill="none"
                    strokeDasharray="63"
                    strokeDashoffset="63"
                    style={{ animation: 'progress 6s linear forwards' }}
                  />
                </svg>
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
}
