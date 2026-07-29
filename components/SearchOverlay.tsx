"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { products } from '@/lib/data/products';
import { Product } from '@/lib/types';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Filter products based on query
  const filteredProducts = query.trim() === '' 
    ? [] 
    : products.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.description.toLowerCase().includes(query.toLowerCase())
      );

  // Group by collection
  const groupedProducts = filteredProducts.reduce((acc, product) => {
    const key = product.collection || product.category;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  return (
    <div className="fixed inset-x-0 top-[80px] z-[190] flex flex-col max-h-[calc(100dvh-80px)] bg-[#0d0a07]/95 backdrop-blur-xl border-b border-[#7d5b31]/30 text-[#f0e6d3] shadow-2xl shadow-black/90 animate-in slide-in-from-top-4 fade-in duration-300">
      {/* Header */}
      <div className="flex items-center justify-between px-margin-mobile md:px-margin-desktop py-stack-md border-b border-[#7d5b31]/30">
        <div className="flex-1 flex items-center gap-4">
          <span className="material-symbols-outlined text-[#c9a96e] text-2xl">search</span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search products..."
            className="w-full bg-transparent border-none outline-none text-base md:text-xl font-medium text-[#f0e6d3] placeholder:text-[#f0e6d3]/30"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button 
          onClick={onClose}
          className="ml-4 p-2 scale-100 active:scale-95 transition-all duration-200 hover:text-[#c9a96e] text-[#f0e6d3]/60"
        >
          <span className="material-symbols-outlined text-3xl">close</span>
        </button>
      </div>

      {/* Results */}
      <div className="overflow-y-auto px-margin-mobile md:px-margin-desktop py-8">
        {query.trim() === '' ? (
          <div className="py-12 flex flex-col items-center justify-center text-[#c9a96e] opacity-40">
            <span className="material-symbols-outlined text-4xl md:text-6xl mb-4">search</span>
            <p className="font-body-lg text-body-lg" style={{ letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.8rem' }}>Type to start searching...</p>
          </div>
        ) : Object.keys(groupedProducts).length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-[#f0e6d3]/60">
            <p className="font-headline-sm text-headline-sm mb-2 text-[#c9a96e]">No results found for &quot;{query}&quot;</p>
            <p className="font-body-md text-body-md">Try checking your spelling or using different keywords.</p>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto space-y-stack-lg animate-in slide-in-from-bottom-4 duration-500">
            {Object.entries(groupedProducts).map(([collectionName, items]) => (
              <div key={collectionName} className="space-y-stack-sm">
                <h2 className="font-label-caps text-label-caps text-[#c9a96e] border-b border-[#7d5b31]/30 pb-2 uppercase tracking-widest text-xs">
                  {collectionName}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter pt-4">
                  {items.map((product) => (
                    <Link 
                      key={product.id} 
                      href={`/product/${product.slug}`}
                      onClick={onClose}
                      className="group flex flex-col gap-3"
                    >
                      <div className="aspect-[3/4] bg-[#140d08] overflow-hidden border border-[#7d5b31]/10 group-hover:border-[#7d5b31]/40 transition-colors duration-300">
                        <img 
                          src={product.images[0]} 
                          alt={product.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                        />
                      </div>
                      <div>
                        <h3 className="font-body-md text-sm font-medium uppercase text-[#f0e6d3] group-hover:text-[#c9a96e] transition-colors line-clamp-1 tracking-wider">{product.name}</h3>
                        <p className="font-body-md text-xs text-[#c9a96e]/70 tracking-widest mt-1">Rs. {product.price.toLocaleString('en-LK')}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
