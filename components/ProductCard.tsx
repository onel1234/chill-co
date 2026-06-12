import React from 'react';
import Link from 'next/link';

interface ProductCardProps {
  title: string;
  subtitle: string;
  price: string;
  imageSrc: string;
  badge?: string;
  href?: string;
}

export default function ProductCard({ title, subtitle, price, imageSrc, badge, href = "#" }: ProductCardProps) {
  return (
    <Link href={href} className="group cursor-pointer block">
      <div className="aspect-[4/5] bg-white relative mb-4 overflow-hidden">
        <img 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          src={imageSrc} 
        />
        
        {/* Quick View Button - slides up on hover */}
        <div className="absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button className="w-full bg-[#2a2a2a] text-white font-body-md text-[10px] md:text-xs py-3 uppercase tracking-widest hover:bg-black transition-colors">
            Quick View
          </button>
        </div>

        {badge && (
          <div className="absolute top-4 right-4 bg-white px-3 py-1 font-label-caps text-[10px] font-bold z-10">
            {badge}
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div className="flex flex-col items-start pt-2">
        <h3 className="font-body-md text-sm md:text-base text-on-background uppercase font-medium tracking-wide leading-tight">{title}</h3>
        <p className="font-body-md text-xs text-on-surface-variant mt-1 mb-2 hidden md:block">{subtitle}</p>
        <span className="font-body-md text-sm md:text-base text-on-background font-medium mt-1">{price}</span>
      </div>
    </Link>
  );
}
