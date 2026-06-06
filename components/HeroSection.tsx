import React from 'react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <header className="relative min-h-screen flex items-center justify-center pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop overflow-hidden bg-gradient-brand">
      {/* Abstract Grunge Background Elements */}
      <svg className="absolute top-0 right-0 w-full md:w-3/4 h-full grunge-brush text-primary-container" preserveAspectRatio="none" viewBox="0 0 100 100">
        <path d="M0,0 C30,40 70,60 100,100 L100,0 Z" fill="currentColor" opacity="0.15" />
        <circle cx="80" cy="20" fill="none" opacity="0.3" r="15" stroke="currentColor" strokeWidth="0.5" />
        <path d="M70,10 L90,30 M90,10 L70,30" opacity="0.3" stroke="currentColor" strokeWidth="0.5" />
      </svg>
      <div className="absolute top-32 left-10 md:left-20 opacity-40">
        <svg className="text-primary-container" fill="none" height="40" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" width="40">
          <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" />
        </svg>
      </div>
      <div className="absolute bottom-20 right-10 md:right-32 opacity-30 font-display-xl text-headline-md tracking-widest">
        XXX
      </div>
      <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
        <div className="col-span-1 md:col-span-6 flex flex-col items-start space-y-stack-lg">
          <div className="space-y-stack-sm relative">
            <span className="font-label-caps text-label-caps uppercase text-primary-container tracking-widest border-2 border-primary-container px-4 py-1.5 rounded-full font-bold inline-block bg-white/50 backdrop-blur-sm">New Arrivals</span>
            <div className="relative mt-6">
              <h1 className="font-display-xl text-display-xl md:text-[120px] font-bold tracking-[-0.04em] leading-none text-on-background uppercase relative z-10 whitespace-nowrap">
                EFFORTLESS
              </h1>
            </div>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md mt-6 font-medium border-l-4 border-primary-container pl-4">
              Premium fabrics. Oversized fit. Everyday wear. Effortless style. That&apos;s chill.
            </p>
          </div>
          <Link href="#" className="inline-flex items-center justify-center bg-gradient-orange text-white font-button-text text-button-text px-10 py-5 uppercase tracking-widest hover:shadow-lg hover:-translate-y-1 transition-all duration-300 font-bold">
            Shop The Collection
          </Link>
        </div>
        <div className="col-span-1 md:col-span-6 relative mt-12 md:mt-0">
          <div className="aspect-[4/5] relative group overflow-visible">
            <div className="absolute inset-0 bg-primary-container translate-x-4 translate-y-4 -z-10 torn-edge opacity-20"></div>
            <img 
              alt="Chill Co. Signature Oversized Tee" 
              className="w-full h-full torn-edge shadow-xl relative z-10 object-contain" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbZOtWgOzWmWBxo12pMmBPlQ0riucHU4XuOB4EprrmCoS3G6YkyegCgMWT_zBemqB8i6_vefmbeRCA8P6cx0xYjOelc43-N3YiHSbQiV7UZe_e2KJWbovast_15ufoFKTaR8ikMAGexGABFbwOfE5dzBiMFmzi-rzQdd0QPBTejJJdZkUvk2cXRzyhI31FFPbB7_NSlUy8rzaXTIY2la8NGsYGHGprvBP37l6H5GLGrWnyONKcRiPRiiK66CI-Jent7F1vyZb0row" 
            />
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border-2 border-on-background rounded-full flex items-center justify-center -rotate-12 bg-white shadow-lg z-20">
              <span className="font-label-caps text-label-caps text-center uppercase leading-tight font-bold text-on-background">
                Est.<br />2026
              </span>
            </div>
            <div className="absolute top-10 -right-8 w-24 h-24 border border-primary-container rounded-full flex items-center justify-center opacity-50 z-0">
              <div className="w-16 h-16 border border-primary-container rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
