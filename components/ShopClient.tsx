"use client";

import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { products } from '@/lib/data/products';

const ITEMS_PER_PAGE = 5;

export default function ShopClient() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const displayedProducts = products.length > ITEMS_PER_PAGE
    ? products.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
    : products;

  return (
    <main className="relative pt-[110px] pb-section-gap min-h-screen text-on-surface overflow-hidden">
      {/* Mobile Sri Lankan Background Image */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none md:hidden"
        style={{
          backgroundImage: "url('/images/sri_lanka_bg.png')",
        }}
      />
      
      {/* Desktop Sri Lankan Background Image */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none hidden md:block"
        style={{
          backgroundImage: "url('/images/shop_dekstop.png')",
        }}
      />

      {/* Dark Luxury Ambient Overlay */}
      <div 
        className="fixed inset-0 z-0 bg-gradient-to-b from-[#0d0a07]/80 via-[#0d0a07]/65 to-[#0d0a07]/90 pointer-events-none" 
      />

      <div className="relative z-10 max-w-screen-2xl mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Page Header */}
        <header className="mb-12 pt-6 border-b border-outline-variant/30 pb-10 flex flex-col md:flex-row md:items-end justify-between gap-gutter">
          <div>
            <h1 className="font-headline-lg-mobile md:font-headline-lg text-4xl md:text-6xl text-primary font-black uppercase tracking-tighter gold-text">
              All Products
            </h1>
          </div>

          <div className="flex items-center gap-4 text-xs font-label-caps uppercase tracking-wider text-on-surface-variant mt-4 md:mt-0">
            <span className="bg-surface-container-high/60 backdrop-blur-md border border-outline-variant/30 px-3.5 py-2 rounded-full text-gold-pale">
              Showing {displayedProducts.length} of {products.length} Products
            </span>
            <span className="hidden md:inline-block w-8 h-[1px] bg-outline-variant/40"></span>
            <button className="flex items-center gap-2 text-on-surface hover:text-primary transition-colors bg-surface-container-high/60 backdrop-blur-md border border-outline-variant/30 px-4 py-2 rounded-full">
              Sort By: Newest <span className="material-symbols-outlined text-[16px] text-primary">expand_more</span>
            </button>
          </div>
        </header>

        {/* Ornamental Sri Lankan Accent Line */}
        <div className="ornament-line mb-12 opacity-60"></div>

        {/* Product Grid (Full Width, Filters Removed) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              title={product.name}
              subtitle={product.colors[0]?.name || ''}
              price={`Rs. ${product.price.toLocaleString('en-LK')}`}
              imageSrc={product.images[0]}
              badge={product.isNewArrival ? "New Arrival" : undefined}
              href={`/product/${product.slug}`}
            />
          ))}
        </div>

        {/* Dynamic Pagination (Appears only if more than 5 products) */}
        {products.length > ITEMS_PER_PAGE && (
          <div className="mt-section-gap flex justify-center items-center gap-8 border-t border-outline-variant/30 pt-10">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="font-label-caps text-xs uppercase tracking-widest text-tertiary hover:text-primary transition-colors disabled:opacity-40"
            >
              Previous
            </button>
            <div className="flex gap-4 font-body-md text-sm">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`pb-1 transition-colors ${currentPage === page ? 'text-primary font-bold border-b-2 border-primary' : 'text-on-surface-variant hover:text-primary'}`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="font-label-caps text-xs uppercase tracking-widest text-on-surface hover:text-primary transition-colors disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </main>
  );
}


