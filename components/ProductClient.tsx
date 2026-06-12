"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { useCart } from '@/lib/context/CartContext';

interface ProductClientProps {
  product: Product;
}

export default function ProductClient({ product }: ProductClientProps) {
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToBag = () => {
    setIsAdding(true);
    addToCart({
      id: `${product.id}-${selectedColor.name}-${selectedSize}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      color: selectedColor.name,
      size: selectedSize,
      quantity: 1,
    });
    
    // Simulate short loading state
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };

  return (
    <main className="pt-[90px] pb-section-gap px-margin-mobile md:px-margin-desktop max-w-full mx-auto">
      <div className="grid grid-cols-4 md:grid-cols-12 gap-gutter">
        {/* Left Gallery Column */}
        <div className="col-span-4 md:col-span-7 flex flex-col gap-stack-md">
          <div className="bg-surface-container-low w-full aspect-[3/4] md:aspect-auto md:h-[80vh] relative group overflow-hidden">
            <img alt={`${product.name} lifestyle shot`} className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105" src={product.images[0]} />
            <div className="absolute top-8 left-8 text-primary opacity-50 hidden md:block">
              <svg fill="none" height="40" viewBox="0 0 40 40" width="40" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 0L23.5 16.5L40 20L23.5 23.5L20 40L16.5 23.5L0 20L16.5 16.5L20 0Z" fill="currentColor"></path>
              </svg>
            </div>
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-2 gap-stack-md">
              {product.images.slice(1, 3).map((img, i) => (
                <div key={i} className="bg-surface-container-low aspect-[3/4] relative group overflow-hidden">
                  <img alt={`${product.name} detail shot ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={img} />
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Right Sticky Column */}
        <div className="col-span-4 md:col-span-5 md:pl-gutter relative">
          <div className="md:sticky md:top-[120px] flex flex-col gap-stack-lg">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {product.isNewArrival && (
                  <span className="font-label-caps text-label-caps text-primary border border-primary px-2 py-1">New Arrival</span>
                )}
                <span className="font-label-caps text-label-caps text-tertiary">{product.category}</span>
              </div>
              <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-stack-sm uppercase">{product.name}</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant">${product.price.toFixed(2)}</p>
            </div>
            <div>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-[400px]">
                {product.description}
              </p>
            </div>
            
            {/* Colors */}
            <div className="flex flex-col gap-stack-sm">
              <span className="font-label-caps text-label-caps text-on-surface">Color: <span className="text-tertiary ml-1">{selectedColor.name}</span></span>
              <div className="flex gap-4">
                {product.colors.map((color) => (
                  <button 
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Select ${color.name}`} 
                    className={`w-10 h-10 rounded-full border-2 border-surface transition-all ${selectedColor.name === color.name ? 'ring-2 ring-primary ring-offset-2' : 'hover:ring-2 hover:ring-secondary-container hover:ring-offset-2 opacity-80 hover:opacity-100'}`}
                    style={{ backgroundColor: color.hex }}
                  ></button>
                ))}
              </div>
            </div>
            
            {/* Sizes */}
            <div className="flex flex-col gap-stack-sm">
              <div className="flex justify-between items-center max-w-[320px]">
                <span className="font-label-caps text-label-caps text-on-surface">Size</span>
                <button className="font-label-caps text-label-caps text-tertiary underline hover:text-primary transition-colors">Size Guide</button>
              </div>
              <div className="grid grid-cols-4 gap-2 max-w-[320px]">
                {product.sizes.map((size) => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 border text-center font-button-text text-button-text transition-colors ${selectedSize === size ? 'border-primary bg-primary text-on-primary' : 'border-surface-variant text-on-surface hover:border-primary hover:text-primary'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Add to Bag */}
            <div className="pt-stack-md border-t border-surface-variant max-w-[400px]">
              <button 
                onClick={handleAddToBag}
                disabled={isAdding}
                className="w-full bg-primary-container text-on-primary-container py-4 px-8 font-button-text text-button-text uppercase tracking-wider hover:opacity-90 active:scale-[0.98] transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isAdding ? 'Added to Bag' : 'Add to Bag'}
                <span className="material-symbols-outlined">{isAdding ? 'check' : 'shopping_bag'}</span>
              </button>
              <p className="text-center font-label-caps text-label-caps text-tertiary mt-stack-sm">Free shipping on orders over $100</p>
            </div>
            
            {/* Accordions */}
            <div className="max-w-[400px] border-t border-surface-variant pt-stack-sm">
              <button className="w-full py-4 flex justify-between items-center group">
                <span className="font-button-text text-button-text uppercase">Fabric &amp; Care</span>
                <span className="material-symbols-outlined transition-transform group-active:rotate-180">add</span>
              </button>
              <button className="w-full py-4 border-t border-surface-variant flex justify-between items-center group">
                <span className="font-button-text text-button-text uppercase">Shipping &amp; Returns</span>
                <span className="material-symbols-outlined transition-transform group-active:rotate-180">add</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
