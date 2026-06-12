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
    <div className="fixed inset-0 z-[100] flex flex-col bg-white animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center justify-between px-margin-mobile md:px-margin-desktop py-stack-md border-b border-surface-variant">
        <div className="flex-1 flex items-center gap-4">
          <span className="material-symbols-outlined text-on-surface-variant text-2xl">search</span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search products..."
            className="w-full bg-transparent border-none outline-none font-headline-md text-headline-md-mobile md:text-headline-md text-on-surface placeholder:text-surface-variant"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button 
          onClick={onClose}
          className="ml-4 p-2 scale-100 active:scale-95 transition-all duration-200 hover:text-primary"
        >
          <span className="material-symbols-outlined text-3xl">close</span>
        </button>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto px-margin-mobile md:px-margin-desktop py-section-gap">
        {query.trim() === '' ? (
          <div className="h-full flex flex-col items-center justify-center text-on-surface-variant opacity-50">
            <span className="material-symbols-outlined text-6xl mb-4">search</span>
            <p className="font-body-lg text-body-lg">Type to start searching...</p>
          </div>
        ) : Object.keys(groupedProducts).length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-on-surface-variant">
            <p className="font-headline-sm text-headline-sm mb-2">No results found for &quot;{query}&quot;</p>
            <p className="font-body-md text-body-md">Try checking your spelling or using different keywords.</p>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto space-y-stack-lg animate-in slide-in-from-bottom-4 duration-500">
            {Object.entries(groupedProducts).map(([collectionName, items]) => (
              <div key={collectionName} className="space-y-stack-sm">
                <h2 className="font-label-caps text-label-caps text-primary border-b border-surface-variant pb-2 uppercase tracking-widest">
                  Collection: {collectionName}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter pt-4">
                  {items.map((product) => (
                    <Link 
                      key={product.id} 
                      href={`/product/${product.slug}`}
                      onClick={onClose}
                      className="group flex flex-col gap-2"
                    >
                      <div className="aspect-[3/4] bg-surface-container-low overflow-hidden">
                        <img 
                          src={product.images[0]} 
                          alt={product.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                      <div>
                        <h3 className="font-body-md text-sm md:text-base font-medium uppercase group-hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
                        <p className="font-body-md text-sm text-on-surface-variant">${product.price.toFixed(2)}</p>
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
