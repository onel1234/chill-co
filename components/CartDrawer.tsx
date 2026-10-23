"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/context/CartContext";

export default function CartDrawer() {
  const {
    isCartOpen,
    closeCart,
    items,
    updateQuantity,
    removeFromCart,
    totalPrice,
    totalItems,
  } = useCart();
  const router = useRouter();

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCartOpen) {
        closeCart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCartOpen, closeCart]);

  const handleCheckout = () => {
    closeCart();
    router.push("/checkout");
  };

  return (
    <div
      aria-hidden={!isCartOpen}
      className={`fixed inset-0 z-[250] transition-opacity duration-300 ${
        isCartOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Dark backdrop with blur */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Slideout Panel */}
      <aside
        role="dialog"
        aria-label="Shopping Bag"
        className={`absolute top-0 right-0 bottom-0 w-full max-w-[460px] bg-[#0d0a07] border-l border-[rgba(125,91,49,0.3)] shadow-[-16px_0_40px_rgba(0,0,0,0.85)] flex flex-col text-[#f0e6d3] transition-transform duration-300 ease-out z-10 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[rgba(125,91,49,0.25)] bg-[#140d08]/60">
          <div className="flex items-center gap-3">
            <span className="text-[0.62rem] font-semibold tracking-[0.25em] uppercase text-[#c9a96e]">
              Your Bag
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[rgba(201,169,110,0.15)] text-[#c9a96e] border border-[rgba(201,169,110,0.25)] font-mono">
              {totalItems}
            </span>
          </div>

          <button
            type="button"
            onClick={closeCart}
            aria-label="Close Shopping Bag"
            className="w-8 h-8 rounded-full border border-[rgba(125,91,49,0.3)] bg-transparent text-[#c9a96e] hover:text-[#f0e6d3] hover:border-[#c9a96e] flex items-center justify-center transition-colors cursor-pointer"
          >
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content Body */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-8 py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-[#140d08] border border-[rgba(201,169,110,0.2)] flex items-center justify-center text-[#c9a96e] mb-4 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <path d="M3 6h18M16 10a4 4 0 01-8 0" />
              </svg>
            </div>
            <h3 className="text-lg font-serif italic text-[#f0e6d3] mb-2">
              Your bag is empty
            </h3>
            <p className="text-xs text-[rgba(240,230,211,0.55)] font-light max-w-xs leading-relaxed mb-6">
              Looks like you haven&apos;t added any pieces yet. Explore our curated streetwear collection.
            </p>
            <Link
              href="/shop"
              onClick={closeCart}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[rgba(201,169,110,0.4)] text-[#c9a96e] hover:text-[#f0e6d3] hover:border-[#c9a96e] hover:bg-[rgba(201,169,110,0.08)] text-xs font-semibold uppercase tracking-widest transition-all"
            >
              Discover Collection
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-3.5 bg-[#140d08]/85 border border-[rgba(125,91,49,0.2)] rounded-xl relative group transition-colors hover:border-[rgba(201,169,110,0.35)]"
              >
                {/* Thumbnail */}
                <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-black/40 border border-[rgba(201,169,110,0.18)] flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>

                {/* Info & Controls */}
                <div className="flex-1 flex flex-col justify-between min-w-0 pr-6">
                  <div>
                    <h4 className="text-sm font-semibold text-[#f0e6d3] truncate">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-[rgba(240,230,211,0.6)] font-light mt-0.5 truncate">
                      {item.color} · Size {item.size}
                    </p>
                    <p className="text-xs font-medium text-[#c9a96e] mt-1.5 font-mono">
                      Rs. {item.price.toLocaleString("en-LK")}
                    </p>
                  </div>

                  {/* Quantity selector */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="inline-flex items-center border border-[rgba(125,91,49,0.3)] rounded-lg bg-[#0d0a07] overflow-hidden">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center text-[rgba(240,230,211,0.7)] hover:text-[#c9a96e] hover:bg-[rgba(201,169,110,0.08)] transition-colors text-xs font-bold"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-xs font-semibold text-[#f0e6d3] font-mono select-none">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center text-[rgba(240,230,211,0.7)] hover:text-[#c9a96e] hover:bg-[rgba(201,169,110,0.08)] transition-colors text-xs font-bold"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-[11px] text-[rgba(240,230,211,0.5)] font-mono ml-auto">
                      Rs. {(item.price * item.quantity).toLocaleString("en-LK")}
                    </span>
                  </div>
                </div>

                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                  aria-label={`Remove ${item.name}`}
                  className="absolute top-3 right-3 text-[rgba(240,230,211,0.4)] hover:text-[#e77a7a] transition-colors p-1"
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="14"
                    height="14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Footer (when bag has items) */}
        {items.length > 0 && (
          <div className="p-6 bg-[#140d08]/95 border-t border-[rgba(125,91,49,0.25)] space-y-4 shadow-[0_-8px_24px_rgba(0,0,0,0.4)]">
            <div className="flex items-baseline justify-between">
              <span className="text-xs uppercase tracking-[0.2em] text-[rgba(240,230,211,0.7)] font-medium">
                Subtotal
              </span>
              <span className="text-lg font-bold text-[#f0e6d3] font-mono">
                Rs. {totalPrice.toLocaleString("en-LK")}
              </span>
            </div>

            <p className="text-[11px] text-[rgba(240,230,211,0.5)] font-light leading-snug">
              Shipping &amp; one-time loyalty rewards applied during checkout.
            </p>

            <button
              type="button"
              onClick={handleCheckout}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#d2ae6d] via-[#c49e58] to-[#b38b44] text-[#2c1b0d] font-bold text-xs uppercase tracking-[0.2em] hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center gap-3 shadow-[0_8px_25px_rgba(201,169,110,0.22)] cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>

            <button
              type="button"
              onClick={closeCart}
              className="w-full text-center text-xs text-[rgba(201,169,110,0.7)] hover:text-[#f0e6d3] transition-colors py-1 cursor-pointer font-light"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
