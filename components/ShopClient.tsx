"use client";

import React from 'react';
import Link from 'next/link';
import ProductCard from './ProductCard';
import { products } from '@/lib/data/products';

export default function ShopClient() {
  return (
    <main className="pt-[100px] pb-section-gap px-margin-mobile md:px-margin-desktop min-h-screen">
      {/* Page Header */}
      <header className="mb-section-gap pt-stack-lg border-b border-surface-variant pb-stack-lg flex flex-col md:flex-row md:items-end justify-between gap-gutter">
        <div>
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary uppercase tracking-tighter mb-4">
            All Products
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Designed for comfort. Made to stand out. Our core collection of oversized fits and premium fabrics.
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm font-label-caps text-label-caps uppercase text-on-surface-variant mt-4 md:mt-0">
          <span className="">Showing {products.length} Results</span>
          <span className="hidden md:inline-block w-8 h-[1px] bg-surface-variant"></span>
          <button className="flex items-center gap-2 hover:text-primary transition-colors">
            Sort By: Newest <span className="material-symbols-outlined text-[16px]">expand_more</span>
          </button>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-gutter md:gap-[64px]">
        {/* Minimalist Filters Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0 mb-stack-lg lg:mb-0">
          <div className="sticky top-[120px] space-y-stack-lg">
            {/* Filter Group: Category */}
            <div className="border-b border-surface-variant pb-stack-md">
              <button className="w-full flex justify-between items-center font-label-caps text-label-caps uppercase tracking-wider mb-4 group">
                <span className="text-on-background group-hover:text-primary transition-colors">Category</span>
                <span className="material-symbols-outlined text-tertiary">remove</span>
              </button>
              <ul className="space-y-3 font-body-md text-body-md text-on-surface-variant">
                <li className=""><label className="flex items-center gap-3 cursor-pointer hover:text-primary transition-colors"><input defaultChecked className="form-checkbox text-primary-container border-surface-variant focus:ring-primary-container rounded-none w-4 h-4" type="checkbox" /> All</label></li>
                <li className=""><label className="flex items-center gap-3 cursor-pointer hover:text-primary transition-colors"><input className="form-checkbox text-primary-container border-surface-variant focus:ring-primary-container rounded-none w-4 h-4" type="checkbox" /> Tees</label></li>
                <li className=""><label className="flex items-center gap-3 cursor-pointer hover:text-primary transition-colors"><input className="form-checkbox text-primary-container border-surface-variant focus:ring-primary-container rounded-none w-4 h-4" type="checkbox" /> Hoodies</label></li>
                <li className=""><label className="flex items-center gap-3 cursor-pointer hover:text-primary transition-colors"><input className="form-checkbox text-primary-container border-surface-variant focus:ring-primary-container rounded-none w-4 h-4" type="checkbox" /> Bottoms</label></li>
                <li className=""><label className="flex items-center gap-3 cursor-pointer hover:text-primary transition-colors"><input className="form-checkbox text-primary-container border-surface-variant focus:ring-primary-container rounded-none w-4 h-4" type="checkbox" /> Accessories</label></li>
              </ul>
            </div>
            {/* Filter Group: Size */}
            <div className="border-b border-surface-variant pb-stack-md">
              <button className="w-full flex justify-between items-center font-label-caps text-label-caps uppercase tracking-wider mb-4 group">
                <span className="text-on-background group-hover:text-primary transition-colors">Size</span>
                <span className="material-symbols-outlined text-tertiary">remove</span>
              </button>
              <div className="grid grid-cols-4 gap-2">
                <button className="border border-surface-variant py-2 text-center font-label-caps text-label-caps hover:border-primary hover:text-primary transition-all">S</button>
                <button className="border border-primary bg-primary/5 py-2 text-center font-label-caps text-label-caps text-primary transition-all">M</button>
                <button className="border border-surface-variant py-2 text-center font-label-caps text-label-caps hover:border-primary hover:text-primary transition-all">L</button>
                <button className="border border-surface-variant py-2 text-center font-label-caps text-label-caps hover:border-primary hover:text-primary transition-all">XL</button>
                <button className="border border-surface-variant py-2 text-center font-label-caps text-label-caps hover:border-primary hover:text-primary transition-all">XXL</button>
              </div>
            </div>
            {/* Filter Group: Color */}
            <div className="border-b border-surface-variant pb-stack-md">
              <button className="w-full flex justify-between items-center font-label-caps text-label-caps uppercase tracking-wider mb-4 group">
                <span className="text-on-background group-hover:text-primary transition-colors">Color</span>
                <span className="material-symbols-outlined text-tertiary">add</span>
              </button>
            </div>
          </div>
        </aside>
        
        {/* Product Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-gutter lg:gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              title={product.name}
              subtitle={product.colors[0]?.name || ''}
              price={`$${product.price.toFixed(2)}`}
              imageSrc={product.images[0]}
              badge={product.isNewArrival ? "New Arrival" : undefined}
              href={`/product/${product.slug}`}
            />
          ))}
        </div>
      </div>

      {/* Pagination (Minimalist) */}
      <div className="mt-section-gap flex justify-center items-center gap-8 border-t border-surface-variant pt-8">
        <button className="font-label-caps text-label-caps uppercase text-tertiary hover:text-primary transition-colors disabled:opacity-50" disabled>Previous</button>
        <div className="flex gap-4 font-body-md text-body-md">
          <span className="text-primary border-b border-primary pb-1">1</span>
          <a className="text-on-surface-variant hover:text-primary transition-colors pb-1" href="#">2</a>
          <a className="text-on-surface-variant hover:text-primary transition-colors pb-1" href="#">3</a>
        </div>
        <button className="font-label-caps text-label-caps uppercase text-on-surface hover:text-primary transition-colors">Next</button>
      </div>
    </main>
  );
}
