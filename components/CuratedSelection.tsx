"use client";

import React, { useRef, useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import Link from 'next/link';

const products = [
  {
    id: 1,
    title: 'Essential Tote Bag',
    subtitle: 'Natural Canvas',
    price: 'Rs 3,000.00',
    imageSrc: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1000&auto=format&fit=crop',
    badge: 'NEW',
  },
  {
    id: 2,
    title: 'Contrast Piped Cami Top',
    subtitle: 'Black/White',
    price: 'Rs 2,700.00',
    imageSrc: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Chalk Corset Top',
    subtitle: 'White/Black',
    price: 'Rs 2,900.00',
    imageSrc: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Loose Flared Jeans',
    subtitle: 'Washed Black',
    price: 'Rs 7,500.00',
    imageSrc: 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'Oversized Signature Tee',
    subtitle: 'Harvest Orange',
    price: 'Rs 4,500.00',
    imageSrc: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1000&auto=format&fit=crop',
  }
];

export default function CuratedSelection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white relative">
      <div className="max-w-[1600px] mx-auto px-4 md:px-12 relative z-10">
        
        <div className="flex justify-between items-end mb-12">
          <div className="flex flex-col">
            <h2 className="font-body-md text-xl text-black">Shop till you drop!</h2>
          </div>
          <Link href="/collections" className="hidden md:block font-body-md text-sm text-black border-b border-black hover:opacity-70 transition-opacity pb-1">
            Shop New Collection
          </Link>
        </div>
        
        <div className="relative group">
          {/* Left Arrow */}
          <div className="absolute -left-5 top-1/2 -translate-y-1/2 z-20 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
            {showLeftArrow && (
              <button 
                onClick={() => scroll('left')}
                className="hidden md:flex w-10 h-10 bg-white border border-gray-200 rounded-full items-center justify-center shadow-sm hover:bg-gray-50"
                aria-label="Scroll left"
              >
                <span className="material-symbols-outlined text-gray-600">arrow_back</span>
              </button>
            )}
          </div>

          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto gap-4 md:gap-6 snap-x snap-mandatory scrollbar-hide pb-4"
          >
            {products.map((product) => (
              <div key={product.id} className="min-w-[calc(50%-0.5rem)] md:min-w-[calc(33.333%-1rem)] snap-start shrink-0">
                <ProductCard 
                  title={product.title}
                  subtitle={product.subtitle}
                  price={product.price}
                  imageSrc={product.imageSrc}
                  badge={product.badge}
                />
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <div className="absolute -right-5 top-1/2 -translate-y-1/2 z-20 transition-opacity duration-300 opacity-0 group-hover:opacity-100">
            {showRightArrow && (
              <button 
                onClick={() => scroll('right')}
                className="hidden md:flex w-10 h-10 bg-white border border-gray-200 rounded-full items-center justify-center shadow-sm hover:bg-gray-50"
                aria-label="Scroll right"
              >
                <span className="material-symbols-outlined text-gray-600">arrow_forward</span>
              </button>
            )}
          </div>
        </div>
        
      </div>
    </section>
  );
}
