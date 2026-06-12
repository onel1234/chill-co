"use client";

import React from 'react';

export default function AboutClient() {
  return (
    <main className="pt-[100px] md:pt-[120px]">
      {/* Hero Section: Editorial Asymmetry */}
      <section className="px-margin-mobile md:px-margin-desktop py-section-gap grid grid-cols-1 md:grid-cols-12 gap-gutter items-center min-h-[80vh]">
        <div className="col-span-1 md:col-span-5 flex flex-col gap-stack-lg z-10">
          <div className="flex flex-col gap-stack-sm">
            <span className="font-label-caps text-label-caps tracking-[0.2em] text-on-surface-variant">Welcome To</span>
            <h1 className="font-display-xl text-7xl md:text-display-xl text-primary lowercase tracking-tighter leading-none mb-stack-md">chill<br />co.™</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
              OVERSIZED FIT.<br />
              <span className="font-bold">UNDENIABLE DIFFERENCE.</span>
            </p>
          </div>
          <p className="font-body-md text-body-md text-on-surface max-w-sm">
            chill co. is more than a brand— it&apos;s a mindset. we create oversized tshirts that blend comfort, quality, and bold, innovative design.
          </p>
          <div className="flex items-center gap-stack-md mt-stack-md">
            <span className="material-symbols-outlined text-on-surface text-[32px] font-light">language</span>
            <span className="font-label-caps text-label-caps text-on-surface-variant">chill with purpose.<br />wear the difference.</span>
          </div>
        </div>
        {/* Hero Image / Texture Area */}
        <div className="col-span-1 md:col-span-7 relative h-full min-h-[350px] md:min-h-[500px] mt-8 md:mt-0">
          {/* Large Orange Brush Stroke Background element (simulated with CSS for performance/size) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary-container rounded-full blur-[100px] opacity-20 -z-10"></div>
          <div className="relative w-full h-full border-hairline bg-surface-container-low overflow-hidden group">
            <img alt="A young man with curly hair wearing an oversized, light grey graphic t-shirt. He is viewed from behind, turning slightly, showcasing the back of the shirt which has the word 'DIFFERENT' scrawled in a harsh, black, handwritten font over a swath of painted orange texture. The setting is minimal and bright, emphasizing a modern streetwear editorial style." className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDd3mXR0N3N4KGZRIXpork4cnaC2jrcEyPKNSIyCGKWErGUqcgLtvtr3eSqy1lJg-lfTkSJ5MdLE06c-Wvgz9dnvro-2Ba-g8Inf7ePi0CVyLajOXr24EpBTqdgkUGILDwA4tBY7py0JFu_Bm-Vbz0rQBD-NsGY-vZAzswtgVOAqkSVTlUOGFWJT-m51q0BhyLcM4a8ZlxwStVt-UB9161__OlLsWcB6022FcM6NLyDMkYqbbOg5AVtZymfuFu6Zg0iywB2lAQaC00" />
            {/* Floating Badge */}
            <div className="absolute bottom-stack-lg right-stack-lg bg-surface-container-lowest border-hairline p-stack-md shadow-sm transform rotate-2">
              <span className="font-label-caps text-label-caps font-bold text-on-surface">Designed<br />Different.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Our Philosophy: Bento Grid */}
      <section className="bg-surface-container px-margin-mobile md:px-margin-desktop py-section-gap">
        <div className="max-w-7xl mx-auto">
          <div className="mb-stack-lg flex flex-col md:flex-row justify-between items-start md:items-end gap-stack-md">
            <div>
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-background uppercase">Made To<br /><span className="text-primary-container">Stand Out.</span></h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
              we push boundaries with innovative designs that challenge the norm. every piece is crafted to be unique—just like you.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {/* Bento Box 1 */}
            <div className="bg-surface-container-lowest p-stack-lg border-hairline flex flex-col justify-between min-h-[300px] hover:bg-surface-container-low transition-colors duration-300">
              <span className="material-symbols-outlined text-primary text-[48px] mb-stack-md">verified</span>
              <div>
                <h3 className="font-headline-md text-headline-md mb-stack-sm">Quality First</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Premium fabrics. Heavyweight cottons that drape perfectly and last longer than a season.</p>
              </div>
            </div>
            {/* Bento Box 2 (Image Focus) */}
            <div className="md:col-span-2 border-hairline bg-surface-dim relative overflow-hidden min-h-[300px] group">
              <img alt="Two young men walking down a clean, sunlit urban street, wearing oversized streetwear. One wears a stark white t-shirt and dark loose pants, the other a dark hoodie. The lighting is crisp and modern, casting sharp shadows. The mood is effortless and raw, typical of high-end urban lifestyle photography." className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfwQUde3ZzmkTBcinaUymJF5Od6yu9hnByzp1wW8MMyhQknL2dvQhgjQ-ebJq88kAEsRVYgBbQBKQhurZYsLDJ5FOobXy-cmDRyIQQK4LdStTodTY0o69tVLAriuQkH7MwN_Qo1azhBqOVTBE8QyQQ1kjsnbTvhDqpleIRvjYsJmK-wnrKjZXXM_darGTMxWTXRFuBDk_rTOHnjgc_9dZPAKAoO0AmIYVBYuvyEyVKidDC5OwgHD_IfEsDix-FHqnxS7DFQ6Gp4So" />
              <div className="absolute inset-0 bg-gradient-to-t from-on-background/60 to-transparent"></div>
              <div className="absolute bottom-stack-lg left-stack-lg right-stack-lg text-on-tertiary">
                <h3 className="font-headline-md text-headline-md mb-stack-sm text-on-primary">The Everyday Uniform</h3>
                <p className="font-body-md text-body-md text-surface-container-highest max-w-md">built for comfort. made for everyday. effortless style. that&apos;s chill.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section: Large Typography & Color Block */}
      <section className="bg-primary-container text-on-primary px-margin-mobile md:px-margin-desktop py-section-gap relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 opacity-20">
          <span className="material-symbols-outlined text-[120px]" style={{ fontVariationSettings: "'FILL' 0" }}>all_inclusive</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-lg items-center relative z-10 max-w-7xl mx-auto">
          <div>
            <h2 className="font-display-xl text-6xl md:text-display-xl uppercase tracking-tighter leading-none mb-stack-md">This is<br />just the<br />beginning.</h2>
            <p className="font-body-lg text-body-lg text-on-primary-fixed mb-stack-lg max-w-md">
              thank you for being part of the chill co. community. let&apos;s build something different. together.
            </p>
            <button className="bg-surface-container-lowest text-primary-container px-gutter py-stack-sm font-button-text text-button-text uppercase tracking-widest hover:bg-surface-container transition-colors duration-300">
              Join The Movement
            </button>
          </div>
          <div className="flex justify-center md:justify-end relative">
            {/* "Taped" Note Effect */}
            <div className="bg-surface-container-lowest text-on-surface p-stack-lg transform -rotate-3 border-hairline shadow-sm relative w-full max-w-sm">
              <div className="absolute top-[-15px] left-1/2 -translate-x-1/2 w-20 h-8 bg-surface-container/50 backdrop-blur-sm border border-surface-variant/30 transform rotate-2"></div>
              <p className="font-headline-md text-headline-md uppercase text-center text-on-background scribble-highlight">
                Chill More.<br />Worry Less.<br />Wear Chill Co.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
