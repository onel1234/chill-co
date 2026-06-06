import React from 'react';
import ProductCard from './ProductCard';
import Link from 'next/link';

export default function CuratedSelection() {
  const products = [
    {
      id: 1,
      title: 'Oversized Signature Tee',
      subtitle: 'Harvest Orange',
      price: '$45',
      imageSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAns1Dr9x3VDLdWSnhgP1rHClkfOXU2QbWkyyKbCAHdPaTP-SpmYCEQxzXOvuV48HE9V-tWy42-JNdLt1OA5_akF5D1iyId9JW1JGee-wDlnNypKycyJMHLIIp7AuKx1qTE0nIzZ3QiVGV3a5hI--5w0C9GONQPvJdn4DbgfMr_lbSeq2PoRP54QIvtcWPDP0Mf2kArHbMI9OqEUPgFV61gn4__HmVv-eNph-ZRbMg1VHF85-FM11cMcJHzPHca-ATLKIdg2RKPsY4',
      badge: 'NEW',
    },
    {
      id: 2,
      title: 'Heavyweight Core Tee',
      subtitle: 'Stone Grey',
      price: '$85',
      imageSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDiuTzyHWcm2rcGKQgZRAtjxd_uC2u9t9X1MWxqWLrLvs5GwXfbDyYKufssAlitw0HI6n22uKCjBs8bbk5ekmx5OgnL2Kf_Yrd5TF7ZUTVGRfACnO-N86XdJGjAnM2ipeoqJ7jdHbLAqRvMDkyElme8fe8D6N2RCIqGv4IosFYJb2YNSTL9xpwM6aDwICSDTwN536D_8tEmu1YS3-RUlPmpdMTNUYGpcZr2SOc_bq-R-R3isXX2zw3CLU749rL4xIHFt4eH4y33znw',
    },
    {
      id: 3,
      title: 'Everyday Classic Tee',
      subtitle: 'Midnight Black',
      price: '$38',
      imageSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCi4vtTbsk1xfbmKZn6l8GNdK4eUkNtVxkyEvKjfVHPf68-NivmsFx470JJW0NwHWHJKX_6YdIwgJCazlxt3K_8wyNfNDnikZWD8EVjDtsLa-epiPMmY5bIBY2fQ2M6_jz6ffTo8NaNNSXkviQbBsRHuMfUTkpqXqB-a2pKdwz5Q7ZQstI1gxbHkrxBcGVuoYCJedRhtfdpj1xIoW8GmIthFVBIVFelhUaMQ1X9j0yamtyy93Ohb9shbhmu7iZLxPh0ggHOT5Sw9CE',
    },
  ];

  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop bg-surface-container-lowest relative">
      <div className="absolute top-0 left-0 w-full h-full bg-texture opacity-50 pointer-events-none"></div>
      <div className="max-w-full mx-auto relative z-10">
        <div className="flex justify-between items-end mb-16 border-b-2 border-on-background pb-6">
          <div className="space-y-stack-sm">
            <div className="flex items-center gap-2">
              <svg className="text-primary-container" fill="none" height="20" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="20">
                <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" />
              </svg>
              <span className="font-label-caps text-label-caps text-primary-container uppercase tracking-widest font-bold">
                Curated Selection
              </span>
            </div>
            <h2 className="font-display-xl text-headline-md md:text-headline-lg text-on-background uppercase">
              The Latest Drops
            </h2>
          </div>
          <Link href="#" className="hidden md:flex items-center gap-2 font-button-text text-button-text uppercase tracking-widest hover:text-primary-container transition-colors font-bold">
            View All
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {products.map((product) => (
            <ProductCard 
              key={product.id}
              title={product.title}
              subtitle={product.subtitle}
              price={product.price}
              imageSrc={product.imageSrc}
              badge={product.badge}
            />
          ))}
        </div>
        <div className="mt-12 md:hidden">
          <Link href="#" className="block text-center font-button-text text-button-text uppercase tracking-widest border-2 border-on-background py-4 hover:bg-on-background hover:text-white transition-colors font-bold">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
