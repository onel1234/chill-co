"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const slides = [
  {
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2520&auto=format&fit=crop",
    title: "EFFORTLESS",
    subtitle: "Premium fabrics. Oversized fit. Everyday wear."
  },
  {
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2370&auto=format&fit=crop",
    title: "ELEVATED",
    subtitle: "Streetwear essentials designed for comfort."
  },
  {
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2671&auto=format&fit=crop",
    title: "TIMELESS",
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
          <div className="absolute inset-0 bg-black/30 z-10"></div>
          <img
            src={slide.image}
            alt={slide.title}
            className={`w-full h-full object-cover transition-transform duration-[10000ms] ease-linear ${
              index === currentSlide ? "scale-105" : "scale-100"
            }`}
          />
        </div>
      ))}

      {/* Content - Glass Effect Container */}
      <div className="relative z-20 w-full max-w-5xl px-6 md:px-12">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 md:p-16 shadow-2xl flex flex-col items-center text-center space-y-6">
          <span className="font-label-caps text-label-caps uppercase tracking-widest text-white/90 border border-white/30 px-5 py-2 inline-block backdrop-blur-md">
            New Arrivals
          </span>
          
          <div className="h-20 md:h-32 flex items-center justify-center relative w-full overflow-hidden">
            {slides.map((slide, index) => (
               <h1 
                 key={`title-${index}`}
                 className={`absolute font-display-xl text-5xl md:text-[100px] font-bold tracking-tight text-white uppercase transition-all duration-1000 transform ${
                   index === currentSlide ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                 }`}
               >
                 {slide.title}
               </h1>
            ))}
          </div>
          
          <div className="h-16 flex items-center justify-center relative w-full mb-4">
             {slides.map((slide, index) => (
                <p 
                  key={`subtitle-${index}`}
                  className={`absolute font-body-lg text-body-lg text-white/90 max-w-md mx-auto transition-all duration-1000 ${
                    index === currentSlide ? "opacity-100 delay-300" : "opacity-0"
                  }`}
                >
                  {slide.subtitle}
                </p>
             ))}
          </div>

          <div className="pt-6 z-30">
            <Link href="/collections" className="inline-flex items-center justify-center bg-white text-black font-button-text text-button-text px-12 py-5 uppercase tracking-widest hover:bg-black hover:text-white transition-colors duration-300 font-bold border border-transparent hover:border-white">
              Shop The Collection
            </Link>
          </div>
          
          {/* Slideshow Indicators */}
          <div className="flex space-x-4 pt-10">
            {slides.map((_, index) => (
              <button
                key={`indicator-${index}`}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 rounded-none transition-all duration-500 ${
                  index === currentSlide ? "w-12 bg-white" : "w-6 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
