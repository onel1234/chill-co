"use client";

import React from 'react';
import Link from 'next/link';

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
          <span className="">Showing 24 Results</span>
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
          {/* Product Card 1 */}
          <Link href="/product/oversized-signature-tee" className="group relative flex flex-col gap-4">
            <div className="relative aspect-[3/4] bg-surface-container-low overflow-hidden w-full h-full">
              <img alt="Chill Co. Oversized Tee" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1VzJMnLSSXBMrMZ3M01fEj0Tj8a9cIMkSS6VazeTtz9xoFWsvgWohz4wy1pLzBnuTxnjvPViQPvG6xQz3HCX9AuqwiwwkKThP7jGxs9pE2PXr7v2sozniLsxnBxvA4AN_KJfCgHqW6RbMhCXHRt2vRjj1KqKHN3wkIAeAk3sxg3Gdq0Twpe5rYAHYq8h-6k9EJ8-L60s144E1pwjz4WqK4Ea00js9QtkWKZlXB_dYpYClSyyRxuhDklUyw5DFrYKOYcmLa61BKZM" />
              {/* Quick Add Hover Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out z-10">
                <button className="w-full bg-primary text-on-primary font-button-text text-button-text uppercase py-3 hover:bg-primary-container transition-colors shadow-sm">
                  Quick Add +
                </button>
              </div>
              {/* Minimalist Badge */}
              <div className="absolute top-4 left-4 border border-outline px-2 py-1 bg-surface/80 backdrop-blur-sm">
                <span className="font-label-caps text-label-caps text-on-surface uppercase">New Arrival</span>
              </div>
            </div>
            <div className="flex justify-between items-start pt-2">
              <div>
                <h3 className="font-body-md text-body-md font-medium text-on-background group-hover:text-primary transition-colors">The &quot;Different&quot; Oversized Tee</h3>
                <p className="font-label-caps text-label-caps text-tertiary mt-1 uppercase">Off-White / Ash</p>
              </div>
              <span className="font-body-md text-body-md text-on-background">$45.00</span>
            </div>
          </Link>
          
          {/* Product Card 2 */}
          <div className="group relative flex flex-col gap-4">
            <div className="relative aspect-[3/4] bg-surface-container-low overflow-hidden w-full h-full">
              <img alt="Chill Co. Standard Hoodie" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6F7YQ9PyYSmAjl8vm5yWdzmH98OONl1ocPDASo9X8LRbDBPG7RIDFyQwoSuQzEL5IYP0rU903qeLgzB7HIhLZJH9JTfPtEOLemhtIlFcnSKK-DwUtikvHKBhD_9ZAay5WJwVc0vOjW5-U5AW4t6oPeufmFW2IblVChlOY9xEH84YjNHrzWgLbzl_3V7jkx-s75jWD6DcaJOdErorPzM3FdxIeJpwE-3TohTNHCF9WXs0-xgcI-BJb1EHW6QAwOlHF6ZyxIM0EP5Y" />
              <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out z-10">
                <button className="w-full bg-primary text-on-primary font-button-text text-button-text uppercase py-3 hover:bg-primary-container transition-colors shadow-sm">
                  Quick Add +
                </button>
              </div>
            </div>
            <div className="flex justify-between items-start pt-2">
              <div>
                <h3 className="font-body-md text-body-md font-medium text-on-background group-hover:text-primary transition-colors">Core Heavyweight Hoodie</h3>
                <p className="font-label-caps text-label-caps text-tertiary mt-1 uppercase">Heather Grey</p>
              </div>
              <span className="font-body-md text-body-md text-on-background">$85.00</span>
            </div>
          </div>
          
          {/* Product Card 3 (Bento style spanning 2 columns on tablet) */}
          <div className="group relative flex flex-col gap-4 md:col-span-2 xl:col-span-1">
            <div className="relative aspect-[3/4] md:aspect-[16/9] xl:aspect-[3/4] bg-primary/10 overflow-hidden w-full h-full border border-surface-variant flex items-center justify-center p-8">
              {/* Abstract product presentation instead of lifestyle photo for variety */}
              <div className="text-center space-y-4 max-w-[80%]">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-6 transform group-hover:rotate-12 transition-transform duration-500">
                  <span className="material-symbols-outlined text-on-primary text-3xl">star</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-primary uppercase">The Essentials Bundle</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Three classic tees. One effortless style.</p>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out z-10">
                <button className="w-full bg-surface text-on-surface border border-surface-variant font-button-text text-button-text uppercase py-3 hover:border-primary hover:text-primary transition-colors shadow-sm">
                  View Bundle
                </button>
              </div>
            </div>
            <div className="flex justify-between items-start pt-2">
              <div>
                <h3 className="font-body-md text-body-md font-medium text-on-background group-hover:text-primary transition-colors">Essentials 3-Pack</h3>
                <p className="font-label-caps text-label-caps text-tertiary mt-1 uppercase">Mixed Colors</p>
              </div>
              <span className="font-body-md text-body-md text-on-background">$110.00</span>
            </div>
          </div>
          
          {/* Product Card 4 */}
          <div className="group relative flex flex-col gap-4">
            <div className="relative aspect-[3/4] bg-surface-container-low overflow-hidden w-full h-full">
              <img alt="Chill Co. Basic Tee" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRAcpPheU9yWtfp70IsZIs4iy3ChierRHF1y8TRRc5G1oWaVuXjNiMXsjhSo4CNfQCNEbZJD0qcrsl7pzrhfeIujbhHfpEDtZUqEIhO_Zn4dK0fY196UnyLz7CGerAN90-PaF3TL0ZgztJ2iggYr_IHna79exD0BkyqdfBvmTyRsC68xAMeR5tZhlyLHae11Ru7BT0XkDsuLvXk7mFrysu4gvfa57ugJoeoa_fQExGWTfnvKrdweOScMlK-E8ypFF93YmD8p0aciw" />
              <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out z-10">
                <button className="w-full bg-primary text-on-primary font-button-text text-button-text uppercase py-3 hover:bg-primary-container transition-colors shadow-sm">
                  Quick Add +
                </button>
              </div>
            </div>
            <div className="flex justify-between items-start pt-2">
              <div>
                <h3 className="font-body-md text-body-md font-medium text-on-background group-hover:text-primary transition-colors">Everyday Classic Tee</h3>
                <p className="font-label-caps text-label-caps text-tertiary mt-1 uppercase">Pure White</p>
              </div>
              <span className="font-body-md text-body-md text-on-background">$35.00</span>
            </div>
          </div>
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
