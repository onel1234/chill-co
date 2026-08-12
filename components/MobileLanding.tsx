"use client";

import MobileNavBar from '@/components/MobileNavBar';
import Manifesto from '@/components/Manifesto';
import Newsletter from '@/components/Newsletter';

export default function MobileLanding() {
  return (
    <div className="bg-background text-on-background font-body-md overflow-x-hidden antialiased">
      {/* Grain Overlay */}
      <div className="fixed inset-0 z-[60] grain-texture"></div>

      <MobileNavBar />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col pt-24 pb-margin-mobile overflow-hidden kinetic-bg">
        {/* Decorative Star */}
        <div className="absolute top-28 right-8 opacity-40 animate-pulse">
          <svg className="text-primary-container" fill="none" height="48" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" width="48">
            <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" />
          </svg>
        </div>
        <div className="px-margin-mobile z-10">
          <span className="font-label-caps text-label-caps text-primary bg-primary-container/10 px-3 py-1 mb-stack-md inline-block">New Arrivals</span>
          <h1 className="font-display-xl uppercase leading-none tracking-tighter text-on-surface relative text-headline-lg-mobile w-max">EFFORTLESS</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-stack-md max-w-[80%]">Premium fabrics. Oversized fit. Everyday wear. Effortless style. That&apos;s chill.</p>
        </div>
        <div className="relative flex-grow mt-stack-lg flex items-center justify-center">
          <div className="absolute w-80 h-80 bg-primary-container/30 rounded-full blur-3xl -z-10 animate-pulse"></div>
          <div className="relative w-full px-margin-mobile">
            <img alt="Hero Product" className="w-full h-auto object-contain scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuADHmmuup460XWCa2mwSo0iAeHSQs5JsiLVKenTdiFlE_Rl7eqj0022HnirD8OvhySzabNKtJkbuxeLNd0-25NGyZJF1U6oxaDChAR4ggK6QTApNFBHI7OzMF27dwQUNdl1SU5tqnugid_hQV7EG_D_aXd11KRsePObPDpbM5xudZ908yte4k8V3k6Rtg_ayN17WfZTSdtV-mtoYP6PYYoPPOsJ9aAXd6ntd9iq9uJIsg8tEFSdhSZNKorbUKFA13oP28F9NuXmdRs" />
            <div className="absolute bottom-10 right-10 rotate-12">
              <span className="material-symbols-outlined text-primary text-6xl opacity-40">edit_note</span>
            </div>
          </div>
        </div>
        <div className="px-margin-mobile mt-auto pt-stack-lg">
          <button className="w-full bg-primary text-on-primary font-button-text text-button-text py-5 uppercase tracking-widest active:scale-95 transition-all flex justify-between items-center px-6">
            EXPLORE COLLECTION
            <span className="material-symbols-outlined">arrow_right_alt</span>
          </button>
        </div>
      </section>

      {/* Scrolling Marquee */}
      <div className="bg-primary py-3 overflow-hidden whitespace-nowrap border-y border-on-primary/10">
        <div className="flex animate-marquee">
          <p className="font-label-caps text-label-caps text-on-primary px-4">CHILL CO. EST 2024 — URBAN KINETIC — PREMIUM QUALITY — LIMITED QUANTITIES — </p>
          <p className="font-label-caps text-label-caps text-on-primary px-4">CHILL CO. EST 2024 — URBAN KINETIC — PREMIUM QUALITY — LIMITED QUANTITIES — </p>
        </div>
      </div>

      {/* Product Grid Section */}
      <section className="py-section-gap px-margin-mobile">
        <div className="flex justify-between items-end mb-stack-lg">
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile uppercase tracking-tighter">ESSENTIALS</h2>
          <div className="text-right">
            <span className="font-label-caps text-label-caps text-on-surface-variant">003 PRODUCTS</span>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-12">
          {/* Product 1 */}
          <div className="group">
            <div className="bg-surface-container aspect-[3/4] overflow-hidden relative mb-stack-md">
              <img alt="Oversized Signature Tee" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida/AP1WRLslFnLa29ODlNVbFZFsExdoKS-zdT9Dni1AqpgWFiWL_8yVXiylsfsuTXzeYJepncHPWkfiSEQHSXGxNSUBu8F42B527tSCtfyCvzX_oTku-bKWJQLMe5oOkaCggK1MoSz-x0-PONe7Y1iH16TlRHC04C71b9dV1Fwex-KOSrgOyyhiSsBtNro0FUspqRInYDNIIO8odQSn_KA2rQ0ed9aOsb3uz2cITBzPZPFMT3V5DLLJrhlB_yd4NH0" />
              <div className="absolute top-4 left-4 bg-background px-3 py-1">
                <span className="font-label-caps text-[10px] text-on-surface">NEW ARRIVAL</span>
              </div>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-headline-md text-[20px] uppercase leading-tight">Oversized<br/>Signature Tee</h3>
                <p className="font-label-caps text-on-surface-variant mt-1">HARVEST ORANGE</p>
              </div>
              <span className="font-body-lg text-body-lg text-primary">$85</span>
            </div>
            <button className="mt-4 w-full border border-surface-variant py-3 font-button-text text-button-text uppercase text-on-surface-variant active:bg-on-surface active:text-background transition-colors">Add to Bag</button>
          </div>

          {/* Product 2 */}
          <div className="group">
            <div className="bg-surface-container aspect-[3/4] overflow-hidden relative mb-stack-md">
              <img alt="Heavyweight Core Tee" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida/AP1WRLtCXfYj4KmciuEKv2u40BWjKIH0QklOCrLTpTNyNdgHWDfY_wJPUYJRygFneHmUd1uZnFJb7Pz53ei7pIxe3kF-0ruBcIUvMuI7CdbnkkDNBpZBEk5P_I63s1f4WEDSWjq978n6FFkqTG7StBmmlE01eKPipYJ6whNXwRfjH1LxRU5tbsO2NKkSNur_4GC5-wpeuq6P05KgrpLTYn9UFU9ln8ldvzGPHSzSxAzG04VszFbsNIJYx1u_iik" />
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-headline-md text-[20px] uppercase leading-tight">Heavyweight<br/>Core Tee</h3>
                <p className="font-label-caps text-on-surface-variant mt-1">STONE GREY</p>
              </div>
              <span className="font-body-lg text-body-lg text-primary">$75</span>
            </div>
            <button className="mt-4 w-full border border-surface-variant py-3 font-button-text text-button-text uppercase text-on-surface-variant active:bg-on-surface active:text-background transition-colors">Add to Bag</button>
          </div>

          {/* Product 3 */}
          <div className="group">
            <div className="bg-surface-container aspect-[3/4] overflow-hidden relative mb-stack-md">
              <img alt="Everyday Classic Tee" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida/AP1WRLsLL84CRjfjLAIyzkKM_Q2b4K048JHjmZ9HzC1dUBJiv_vYOTbER4H4w39OULx6eVimRAXGTMVAlnjbzShTUrvAMjtngsXCgM8jb_5kwP0ZndFN4KAFGI6HQSmOyicdYbD1TeMVr87zNYOnJuk6fT00x0lbYKopoJPMKg-FcZOLx2Zf6Mb4muFJSr2PGQWfxHyq99Rjz361ydur7-aYrzS5J1DHve9MktyhQ3NTvHJDP-ro80h0s9DaJUk" />
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-headline-md text-[20px] uppercase leading-tight">Everyday<br/>Classic Tee</h3>
                <p className="font-label-caps text-on-surface-variant mt-1">MIDNIGHT BLACK</p>
              </div>
              <span className="font-body-lg text-body-lg text-primary">$65</span>
            </div>
            <button className="mt-4 w-full border border-surface-variant py-3 font-button-text text-button-text uppercase text-on-surface-variant active:bg-on-surface active:text-background transition-colors">Add to Bag</button>
          </div>
        </div>
      </section>

      {/* Editorial Block */}
      <Manifesto />

      {/* Newsletter */}
      <Newsletter />

      {/* Footer */}
      <footer className="bg-surface-container-lowest py-section-gap px-margin-mobile flex flex-col gap-12">
        <div>
          <img alt="Chill Co. Logo" className="h-12 w-auto mb-6 object-contain" src="/images/WhatsApp_Image_2026-07-26_at_23.42.00-removebg-preview.png" />
          <p className="font-body-md text-body-md text-on-surface-variant max-w-xs">Premium streetwear designed for comfort and the urban kinetic lifestyle.</p>
        </div>
        <div className="grid grid-cols-2 gap-stack-lg">
          <div className="flex flex-col gap-4">
            <p className="font-label-caps text-label-caps text-primary">SHOP</p>
            <a className="font-body-md text-on-surface-variant" href="#">New Arrivals</a>
            <a className="font-body-md text-on-surface-variant" href="#">Best Sellers</a>
            <a className="font-body-md text-on-surface-variant" href="#">Accessories</a>
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-label-caps text-label-caps text-primary">SUPPORT</p>
            <a className="font-body-md text-on-surface-variant" href="#">Shipping</a>
            <a className="font-body-md text-on-surface-variant" href="#">Returns</a>
            <a className="font-body-md text-on-surface-variant" href="#">Contact</a>
          </div>
        </div>
        <div className="pt-stack-lg border-t border-surface-variant">
          <div className="flex flex-col gap-4 mb-8">
            <a className="font-label-caps text-label-caps text-on-surface-variant" href="#">Privacy Policy</a>
            <a className="font-label-caps text-label-caps text-on-surface-variant" href="#">Terms of Service</a>
          </div>
          <p className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest opacity-60">© 2024 Chill Co. Designed for comfort.</p>
        </div>
      </footer>
    </div>
  );
}
