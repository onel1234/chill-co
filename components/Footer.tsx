import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-surface-variant w-full py-section-gap px-margin-mobile md:px-margin-desktop relative overflow-hidden">
      <div className="absolute inset-0 bg-texture opacity-30 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 border-[40px] border-surface-container rounded-full translate-x-1/3 translate-y-1/3 opacity-50 z-0"></div>
      <div className="max-w-full mx-auto grid grid-cols-1 md:grid-cols-4 gap-gutter relative z-10">
        <div className="col-span-1 md:col-span-2 flex flex-col items-start space-y-stack-md">
          <img 
            alt="Chill Co." 
            className="h-20 w-auto object-contain mix-blend-multiply mb-4" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqB65R-CNaUPWxe_JwjGRHxiS3EUkEaXgG_Ykp-m9DV7dZVVB2qnF0O1xUNp6ioaAH7YSjRh1PAkQrEacFEWd3ju5pOJ4rXlPTBID9lpaGpjs_02jZwIsNjKKKPA5WYRj0rclafY-H2LtxCzFRxb7nyftQ-rr0G6RYnF-CnkK305lo-IqnWrNri_UUhYERexGtllSN_-WafAqC7s1ZWKuvcHAWDKK4NqZyTA-qs7UtMfISab21PmlHbupj6bYL8Rxyrmbo3LtTvSs" 
          />
          <p className="font-body-md text-body-md text-on-surface-variant max-w-sm font-medium">
            Designed for comfort. Built for everyday.
          </p>
          <p className="font-label-caps text-label-caps text-tertiary mt-auto pt-8 font-bold">
            © 2026 Chill Co.
          </p>
        </div>
        <div className="col-span-1 flex flex-col space-y-stack-sm">
          <span className="font-label-caps text-label-caps text-on-background uppercase mb-4 font-bold tracking-widest">Shop</span>
          <Link href="#" className="font-body-md text-body-md text-on-surface-variant hover:text-primary-container transition-colors duration-300 font-medium">New Drops</Link>
          <Link href="#" className="font-body-md text-body-md text-on-surface-variant hover:text-primary-container transition-colors duration-300 font-medium">Essentials</Link>
          <Link href="#" className="font-body-md text-body-md text-on-surface-variant hover:text-primary-container transition-colors duration-300 font-medium">Accessories</Link>
        </div>
        <div className="col-span-1 flex flex-col space-y-stack-sm">
          <span className="font-label-caps text-label-caps text-on-background uppercase mb-4 font-bold tracking-widest">Support</span>
          <Link href="#" className="font-body-md text-body-md text-on-surface-variant hover:text-primary-container transition-colors duration-300 font-medium">Privacy Policy</Link>
          <Link href="#" className="font-body-md text-body-md text-on-surface-variant hover:text-primary-container transition-colors duration-300 font-medium">Terms of Service</Link>
          <Link href="#" className="font-body-md text-body-md text-on-surface-variant hover:text-primary-container transition-colors duration-300 font-medium">Shipping</Link>
          <Link href="#" className="font-body-md text-body-md text-on-surface-variant hover:text-primary-container transition-colors duration-300 font-medium">Returns</Link>
          <Link href="#" className="font-body-md text-body-md text-on-surface-variant hover:text-primary-container transition-colors duration-300 font-medium">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
