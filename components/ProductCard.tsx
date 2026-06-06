import React from 'react';

interface ProductCardProps {
  title: string;
  subtitle: string;
  price: string;
  imageSrc: string;
  badge?: string;
}

export default function ProductCard({ title, subtitle, price, imageSrc, badge }: ProductCardProps) {
  return (
    <div className="group cursor-pointer">
      <div className="aspect-[4/5] bg-surface-container-low relative mb-6 torn-edge p-2 bg-white shadow-sm border border-surface-variant">
        <img 
          alt={title} 
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.02]" 
          src={imageSrc} 
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10 torn-edge">
          <button className="bg-gradient-orange text-white font-button-text text-button-text px-8 py-4 uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 font-bold hover:shadow-lg">
            Add to Bag
          </button>
        </div>
        {badge && (
          <div className="absolute top-4 left-4 bg-white px-3 py-1 font-label-caps text-[10px] font-bold z-10">
            {badge}
          </div>
        )}
      </div>
      <div className="flex justify-between items-start pt-2 border-t border-surface-variant">
        <div>
          <h3 className="font-body-lg text-body-lg text-on-background uppercase font-bold tracking-tight">{title}</h3>
          <p className="font-body-md text-sm text-on-surface-variant mt-1">{subtitle}</p>
        </div>
        <span className="font-display-xl text-headline-md text-on-background">{price}</span>
      </div>
    </div>
  );
}
