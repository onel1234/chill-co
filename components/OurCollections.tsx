import React from 'react';
import Link from 'next/link';

export default function OurCollections() {
  const collections = [
    {
      title: 'Latest drops',
      href: '/collections',
      image: '/images/staples_tshirt.png'
    },
    {
      title: 'Exclusive',
      href: '/collections',
      image: '/images/kinetic_tshirt.png'
    },
    {
      title: 'Heritage',
      href: '/collections',
      image: '/images/signature_series.png'
    }
  ];

  return (
    <section className="py-section-gap relative">
      {/* Heading Section with padding */}
      <div className="max-w-full mx-auto px-margin-mobile md:px-margin-desktop mb-16 relative z-10">
        <div className="flex justify-between items-end border-b-2 border-on-background pb-6">
          <div className="space-y-stack-sm">
            <div className="flex items-center gap-2">
              <svg className="text-primary-container" fill="none" height="20" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="20">
                <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" />
              </svg>
              <span className="font-label-caps text-label-caps text-primary-container uppercase tracking-widest font-bold">
                Shop By Category
              </span>
            </div>
            <h2 className="font-display-xl text-headline-md md:text-headline-lg text-on-background uppercase">
              Our Collections
            </h2>
          </div>
          <Link href="/collections" className="hidden md:flex items-center gap-2 font-button-text text-button-text uppercase tracking-widest hover:text-primary-container transition-colors font-bold">
            View All
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
      </div>

      {/* Full-bleed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-2 w-full bg-white dark:bg-black">
        {collections.map((collection) => (
          <Link 
            key={collection.title}
            href={collection.href} 
            className="group relative overflow-hidden aspect-square md:aspect-[4/5] bg-black"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img 
                src={collection.image} 
                alt={collection.title}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-in-out"
              />
            </div>
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            
            {/* Text Content */}
            <div className="absolute bottom-6 left-6 right-6">
              <span className="font-headline-md text-headline-md-mobile md:text-headline-md text-white font-medium group-hover:tracking-wider transition-all duration-300">
                {collection.title}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
