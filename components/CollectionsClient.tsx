"use client";

import React from 'react';

export default function CollectionsClient() {
  return (
    <main className="pt-[100px] pb-[100px] md:pb-0">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] items-center bg-primary-container text-on-primary-container bg-grain overflow-hidden px-margin-mobile md:px-margin-desktop py-section-gap grid md:grid-cols-2 p-0">
        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 opacity-30 text-6xl">✨</div>
        <div className="absolute bottom-20 left-10 opacity-30 text-4xl font-headline-lg font-bold">XXX</div>

        <div className="relative z-20 max-w-4xl md:col-span-1 flex flex-col justify-center p-margin-mobile md:p-margin-desktop">
          <p className="font-label-caps text-label-caps mb-stack-sm tracking-widest">EST. 2024 / DESIGNED DIFFERENT</p>
          <h1 className="font-display-xl text-display-xl font-black uppercase leading-none tracking-tighter mix-blend-multiply">
            THE<br />
            <span className="text-surface-container-lowest">COLLECTIONS</span>
          </h1>
          <p className="font-body-lg text-body-lg mt-stack-md max-w-md font-medium">
            Pushing boundaries with innovative designs that challenge the norm. Every piece is crafted to be unique—just like you.
          </p>
        </div>
        {/* Brush stroke graphic placeholder (using css shapes) */}
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-surface-container-lowest opacity-20 transform rotate-12 translate-y-1/4 translate-x-1/4 rounded-full blur-3xl"></div>
        <div className="relative h-full min-h-[400px] md:min-h-0 overflow-hidden">
          <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgA5vv7KMETYgw3K2TXKP7UOwhHIU6SbRXNhhDXHLuMA3CZ1NbtrePm9VdH4For1NlvT6SAxioiw6nELmJ_C2iTefrmkMWMNkcHHad_ZygmfLxlqr4HpdP58c5v6LL8L0L2c8mLzm7pxQwuGGq445lGhUKZRYV9UTfimnsSwV1NrD7UChWfpauUJq_mShKwgc9oARN_YO0PDlLhuay7zn9Bxf0NTgFmgdhUmCsAYSRQkDqWDWlbfK_e3pQBPm3D1jWbjV_WVEJhog" alt="Urban Kinetic Streetwear Collection" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/20 mix-blend-overlay"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary-container to-transparent md:block hidden"></div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="px-margin-mobile md:px-margin-desktop py-section-gap max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          {/* Collection 1: Essentials (Large Feature) */}
          <article className="md:col-span-12 group relative mb-section-gap">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-surface-container-high bg-surface-container-lowest transition-transform duration-500 hover:scale-[1.01]">
              <div className="p-gutter md:p-stack-lg flex flex-col justify-center bg-surface-container-low">
                <span className="font-label-caps text-label-caps text-primary mb-stack-sm">01 / STAPLES</span>
                <h2 className="font-headline-lg text-headline-lg md:text-display-xl md:font-display-xl font-black uppercase mb-stack-md">Essentials</h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant mb-stack-lg max-w-md">Premium fabrics. Oversized fit. Everyday wear. Effortless style. That&apos;s chill.</p>
                <a className="inline-flex items-center font-button-text text-button-text bg-primary text-on-primary px-8 py-4 w-max hover:bg-on-surface transition-colors" href="#">
                  EXPLORE ESSENTIALS <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
                </a>
              </div>
              <div className="relative h-[60vh] md:h-auto bg-[#e5e5e5]">
                <img alt="Stone Grey Heavyweight T-shirt" className="w-full h-full object-cover mix-blend-multiply" loading="lazy" src="https://lh3.googleusercontent.com/aida/AP1WRLto2iOOThZE8TxeNHHMA10XDEr17NIrIOwvOlO_Ta3_WOkMfC6v7mKzt48CD5yXwrmqhqNuGgCpdTt9QsWGcg23buW-IGCKN2XBGf7Rq8TQ8SQEEccSqUtepda3mF4QPPuwYLuhT74g-OCr2o5xWXi60yiKHRrQN5AM4GiMUVVSvIGHeRWnv6KHdJfd8zDXHvOFuGnBQIY4UY1DhejBScrj0qskTFQpuR18D6iReUzIgPXmE8agNIVFyeQ" />
              </div>
            </div>
          </article>
          
          {/* Collection 2 & 3: Bento Grid */}
          <article className="md:col-span-7 group relative">
            <div className="h-full border border-surface-container-high bg-surface-container-lowest p-gutter flex flex-col">
              <div className="relative h-[50vh] mb-stack-md bg-[#e5e5e5] overflow-hidden">
                <img alt="Harvest Orange Oversized T-shirt" className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105" loading="lazy" src="https://lh3.googleusercontent.com/aida/AP1WRLtVxeWDdZjeVUvG3oxwdidoHqbsUZZK-XHF_FMn_WNPj-nsY5bsoD-d6FM3Z4Z_hK6yNTxqJ3HYm02qbb2LfrqwSMFTrhlPcax_EfifczyFG_Dr5KdqTUV8kQ_ZMPp6MBf2EgUCjLWBtqQbv5GUheaQ5FfpDvDw7-wiC-cfNZKf3FtvndkSuJVpeOjbtFoFypwXt_ZYP9n3YzJfDZMugbL10IFOBWGm1RkWHdAaApuCEdV8eIpxbFuhc5o" />
                {/* Floating Badge */}
                <div className="absolute top-4 right-4 bg-surface-container-lowest px-3 py-1 font-label-caps text-label-caps border border-on-surface">NEW DROP</div>
              </div>
              <span className="font-label-caps text-label-caps text-primary mb-2">02 / HIGH ENERGY</span>
              <h2 className="font-headline-md text-headline-md font-bold uppercase mb-2">Urban Kinetic</h2>
              <a className="inline-flex items-center font-button-text text-button-text text-on-surface mt-auto pt-stack-sm border-t border-surface-container-high group-hover:text-primary transition-colors" href="#">
                VIEW COLLECTION <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
              </a>
            </div>
          </article>
          
          <article className="md:col-span-5 group relative">
            <div className="h-full border border-surface-container-high bg-surface-container-lowest p-gutter flex flex-col">
              <div className="relative h-[50vh] mb-stack-md bg-[#e5e5e5] overflow-hidden">
                <img alt="Midnight Black T-shirt" className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105" loading="lazy" src="https://lh3.googleusercontent.com/aida/AP1WRLtxWQD-_6NtmG278M0cP5BPAOsSwBbd52vXkHqJqPh8jVgg4PovOKNiEPs6_FhpL-P-f8PDBIiVt7Xr8N0KL7GgpYiv4a-LjY1r5UUetf2dPlwdlcay6thTLfcqTkZW4i8mvu2LwkBLBV8zLnnuKbtEmYD-pLqG266merloV0pNFENDln5sdPu0EjWH0YAqMI5XRTH1EFv7NJOmiOIlwzXQLDnbuDtSPm-D0z0nmloWn2cL8D05F4I-Uqc" />
              </div>
              <span className="font-label-caps text-label-caps text-primary mb-2">03 / DARK MODE</span>
              <h2 className="font-headline-md text-headline-md font-bold uppercase mb-2">Midnight Drop</h2>
              <a className="inline-flex items-center font-button-text text-button-text text-on-surface mt-auto pt-stack-sm border-t border-surface-container-high group-hover:text-primary transition-colors" href="#">
                VIEW COLLECTION <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
              </a>
            </div>
          </article>
          
          {/* Collection 4: Full width banner style */}
          <article className="md:col-span-12 mt-section-gap relative">
            <div className="relative h-[70vh] border border-surface-container-high bg-[#e5e5e5] overflow-hidden flex items-center">
              <img alt="Model wearing Chill Co. from back" className="absolute inset-0 w-full h-full object-cover object-top mix-blend-multiply opacity-80" loading="lazy" src="https://lh3.googleusercontent.com/aida/AP1WRLsI-RUD687vHK6C78dnfPSmhEY8nkmca5er96wsxPjJx49ZGS3S5IQskQX17It39V0FgG6KIynAK38HfdCYpZt4NHIHhmfoETG1jdC1BNf5-HWQKkmOhjXWEJ_bLN6oUx8_JDVCFAXQtDHxEt0jlZbfYm8Vavk7jaejQEvDBQTxEc_UaD9yr3NL5QH7nTHCIuaZDjv3VyHvNq8-ceLEMnzsBVuktDJ5tVdW-3fWv1LBsjpxIC44rWBbTPI" />
              {/* Text Overlay */}
              <div className="relative z-10 w-full flex flex-col items-center text-center p-gutter">
                <span className="font-label-caps text-label-caps mb-stack-md bg-surface-container-lowest px-4 py-2 border border-on-surface">04 / EXCLUSIVE</span>
                <h2 className="font-display-xl text-display-xl font-black uppercase stroke-text text-surface-container-lowest mb-stack-lg mix-blend-difference">The Signature<br />Series</h2>
                <a className="inline-flex items-center font-button-text text-button-text bg-transparent border-2 border-on-surface text-on-surface px-8 py-4 hover:bg-on-surface hover:text-surface-container-lowest transition-colors backdrop-blur-sm bg-surface-container-lowest/30" href="#">
                  SHOP SIGNATURE <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
