"use client";

import React from 'react';
import Link from 'next/link';

export default function ProductTeeClient() {
  return (
    <main className="pt-[90px] pb-section-gap px-margin-mobile md:px-margin-desktop max-w-full mx-auto">
      <div className="grid grid-cols-4 md:grid-cols-12 gap-gutter">
        {/* Left Gallery Column */}
        <div className="col-span-4 md:col-span-7 flex flex-col gap-stack-md">
          <div className="bg-surface-container-low w-full aspect-[3/4] md:aspect-auto md:h-[80vh] relative group overflow-hidden">
            <img alt="Model wearing Chill Co. Oversized Signature Tee" className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwZxAZ1zfzc6eSw-J3lImQAyU1XNzPBi860bWf1Qbti_xfPNStJPyjVdQrJqNcmIcg3raT3gt7YRuuBRtTdbzNAJNc_2TfX9nAr2UedV5hYffalXylgYfic1IjpoOGNsP9vjecDBJC5RGXAwaHCoruPDmTWaEq_2yY8y42s3ED_QwVHECdhAnY4deRPcNqxISS9Z3rJGGkDENWROP9An1l1vqTi0s16udtHg3hPI3P6pcnyBc0qNIgXY3X8HlZmdGbLV06ARmmRD8" />
            <div className="absolute top-8 left-8 text-primary opacity-50 hidden md:block">
              <svg fill="none" height="40" viewBox="0 0 40 40" width="40" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 0L23.5 16.5L40 20L23.5 23.5L20 40L16.5 23.5L0 20L16.5 16.5L20 0Z" fill="currentColor"></path>
              </svg>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-stack-md">
            <div className="bg-surface-container-low aspect-[3/4] relative group overflow-hidden">
              <img alt="Detail shot of the Oversized Signature Tee fabric." className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBh11HZa9W3IeOE3nJw6SVMtcLaGXLnoSLYB969ofLjo0_16xbK9l0fueNfpIRBbo6b2DB4wLhHH71KcjRefIjRYZT_Td-bzZA61Ph44Z4OOblOTlTa01R_VgvhyoUP2TaTwTOpgvHvb-q8lBjajGrziK_dCgI81uasfW1s6tfXOJCNAIo8rjsEsX8oG8nF6UqRieMXZWTjqAU7katDARMrsF-YF60z45DksicLUmEynC5Ec5_BChySBJWDvYCB3TpdRzjFYsN6J8U" />
            </div>
            <div className="bg-surface-container-low aspect-[3/4] relative group overflow-hidden">
              <img alt="Model wearing Chill Co. Oversized Signature Tee front view." className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbBV-anVnr6wVgeFeZ_RrgdEkJgKBgTYoKbG-0Kw4o56W2GPIHNQqQ9EqQQ6igsFBP3_Ie7NhshDTSvP3b-mqlZ1ljwNtkQMWqndJmZf4m-CsXihC_QdsctSAR0oyEG16xpG9wK__eO6ti4bU0JZX9HXGafUl-FaD8c-3OLDTm3RqJkWDjmc0G5hGFZoun2L_l6a1dPvHtCkur7fGCHV9Rnjgq0BMn-4NEA582HfxI216msFHw1sIzlTqpdObZVx_qGo15ca9ICDk" />
            </div>
          </div>
        </div>
        {/* Right Sticky Column */}
        <div className="col-span-4 md:col-span-5 md:pl-gutter relative">
          <div className="md:sticky md:top-[120px] flex flex-col gap-stack-lg">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-label-caps text-label-caps text-primary border border-primary px-2 py-1">New Arrival</span>
                <span className="font-label-caps text-label-caps text-tertiary">Essentials</span>
              </div>
              <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-stack-sm uppercase">Oversized Signature Tee</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant">$48.00</p>
            </div>
            <div>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-[400px]">
                Oversized fit, premium heavyweight cotton, designed for the everyday. We push boundaries with innovative designs that challenge the norm.
              </p>
            </div>
            <div className="flex flex-col gap-stack-sm">
              <span className="font-label-caps text-label-caps text-on-surface">Color: <span className="text-tertiary ml-1" id="color-name">Harvest Orange</span></span>
              <div className="flex gap-4">
                <button aria-label="Select Harvest Orange" className="w-10 h-10 rounded-full border-2 border-surface bg-[#F37B21] ring-2 ring-primary ring-offset-2 transition-all"></button>
                <button aria-label="Select Yellow Green" className="w-10 h-10 rounded-full border-2 border-surface bg-[#A8C256] hover:ring-2 hover:ring-secondary-container hover:ring-offset-2 transition-all opacity-80 hover:opacity-100"></button>
              </div>
            </div>
            <div className="flex flex-col gap-stack-sm">
              <div className="flex justify-between items-center max-w-[320px]">
                <span className="font-label-caps text-label-caps text-on-surface">Size</span>
                <button className="font-label-caps text-label-caps text-tertiary underline hover:text-primary transition-colors">Size Guide</button>
              </div>
              <div className="grid grid-cols-4 gap-2 max-w-[320px]">
                <button className="py-3 border border-surface-variant text-center font-button-text text-button-text text-on-surface hover:border-primary hover:text-primary transition-colors">S</button>
                <button className="py-3 border border-surface-variant text-center font-button-text text-button-text text-on-surface hover:border-primary hover:text-primary transition-colors">M</button>
                <button className="py-3 border border-primary bg-primary text-on-primary text-center font-button-text text-button-text transition-colors">L</button>
                <button className="py-3 border border-surface-variant text-center font-button-text text-button-text text-on-surface hover:border-primary hover:text-primary transition-colors">XL</button>
              </div>
            </div>
            <div className="pt-stack-md border-t border-surface-variant max-w-[400px]">
              <button className="w-full bg-primary-container text-on-primary-container py-4 px-8 font-button-text text-button-text uppercase tracking-wider hover:opacity-90 active:scale-[0.98] transition-all flex justify-center items-center gap-2">
                Add to Bag
                <span className="material-symbols-outlined" data-icon="shopping_bag">shopping_bag</span>
              </button>
              <p className="text-center font-label-caps text-label-caps text-tertiary mt-stack-sm">Free shipping on orders over $100</p>
            </div>
            <div className="max-w-[400px] border-t border-surface-variant pt-stack-sm">
              <button className="w-full py-4 flex justify-between items-center group">
                <span className="font-button-text text-button-text uppercase">Fabric &amp; Care</span>
                <span className="material-symbols-outlined transition-transform group-active:rotate-180" data-icon="add">add</span>
              </button>
              <button className="w-full py-4 border-t border-surface-variant flex justify-between items-center group">
                <span className="font-button-text text-button-text uppercase">Shipping &amp; Returns</span>
                <span className="material-symbols-outlined transition-transform group-active:rotate-180" data-icon="add">add</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
