"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CartItem } from '../types';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';
import { getProductBySlug } from '@/lib/data/products';

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_KEY = 'chill_co_cart';

// Map CartItem (app) to DB row shape
function toDbRow(item: CartItem, userId: string) {
  return {
    user_id: userId,
    product_id: item.productId,
    name: item.name,
    price: item.price,
    image: item.image,
    color: item.color,
    size: item.size,
    quantity: item.quantity,
  };
}

// Map DB row to CartItem (app)
function fromDbRow(row: Record<string, unknown>): CartItem {
  const product = getProductBySlug(row.product_id as string);
  return {
    id: `${row.product_id}-${row.color}-${row.size}`,
    productId: row.product_id as string,
    name: row.name as string,
    price: row.price as number,
    image: row.image as string,
    color: row.color as string,
    size: row.size as string,
    quantity: row.quantity as number,
    loyaltyPoints: product?.loyaltyPoints,
  };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const supabase = createClient();

  // ─── Load from Supabase ───────────────────────────────────────────────
  const loadCartFromSupabase = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from('cart_items')
      .select('*')
      .eq('user_id', userId);

    if (!error && data) {
      setItems(data.map(fromDbRow));
    }
  }, [supabase]);

  // ─── Merge guest cart into Supabase on sign-in ───────────────────────
  const mergeLocalCartToSupabase = useCallback(async (userId: string, localItems: CartItem[]) => {
    if (localItems.length === 0) return;

    for (const item of localItems) {
      const row = toDbRow(item, userId);
      // Upsert: if item with same product/color/size exists, add quantities
      const { data: existing } = await supabase
        .from('cart_items')
        .select('id, quantity')
        .eq('user_id', userId)
        .eq('product_id', item.productId)
        .eq('color', item.color)
        .eq('size', item.size)
        .single();

      if (existing) {
        await supabase
          .from('cart_items')
          .update({ quantity: existing.quantity + item.quantity })
          .eq('id', existing.id);
      } else {
        await supabase.from('cart_items').insert(row);
      }
    }

    // Clear localStorage after merging
    localStorage.removeItem(LOCAL_KEY);
    // Reload fresh cart from DB
    await loadCartFromSupabase(userId);
  }, [supabase, loadCartFromSupabase]);

  // ─── Helpers ──────────────────────────────────────────────────────────
  function getLocalCart(): CartItem[] {
    try {
      const stored = localStorage.getItem(LOCAL_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  // ─── Auth state tracking ───────────────────────────────────────────────
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setCurrentUser(session.user);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user ?? null;

      if (user && !currentUser) {
        // User just signed in — merge local cart
        const localItems = getLocalCart();
        setCurrentUser(user);
        if (localItems.length > 0) {
          mergeLocalCartToSupabase(user.id, localItems).then(() => {
            setIsInitialized(true);
          });
        } else {
          loadCartFromSupabase(user.id).then(() => {
            setIsInitialized(true);
          });
        }
      } else if (!user && currentUser) {
        // User signed out — clear in-memory cart
        setCurrentUser(null);
        setItems([]);
        setIsInitialized(true);
      }
    });

    return () => subscription.unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Initial load ──────────────────────────────────────────────────────
  useEffect(() => {
    const init = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setCurrentUser(session.user);
        await loadCartFromSupabase(session.user.id);
      } else {
        setItems(getLocalCart());
      }
      setIsInitialized(true);
    };
    init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Persist to localStorage for guests ───────────────────────────────
  useEffect(() => {
    if (isInitialized && !currentUser) {
      localStorage.setItem(LOCAL_KEY, JSON.stringify(items));
    }
  }, [items, isInitialized, currentUser]);


  // ─── Actions ──────────────────────────────────────────────────────────
  const addToCart = async (newItem: CartItem) => {
    if (currentUser) {
      // Supabase path
      const existing = items.find((i) => i.id === newItem.id);
      if (existing) {
        const newQty = existing.quantity + newItem.quantity;
        await supabase
          .from('cart_items')
          .update({ quantity: newQty })
          .eq('user_id', currentUser.id)
          .eq('product_id', newItem.productId)
          .eq('color', newItem.color)
          .eq('size', newItem.size);

        setItems((prev) =>
          prev.map((i) => i.id === newItem.id ? { ...i, quantity: newQty } : i)
        );
      } else {
        await supabase.from('cart_items').insert(toDbRow(newItem, currentUser.id));
        setItems((prev) => [...prev, newItem]);
      }
    } else {
      // localStorage path
      setItems((prevItems) => {
        const existingIndex = prevItems.findIndex((item) => item.id === newItem.id);
        if (existingIndex >= 0) {
          const updated = [...prevItems];
          updated[existingIndex].quantity += newItem.quantity;
          return updated;
        }
        return [...prevItems, newItem];
      });
    }
  };

  const removeFromCart = async (id: string) => {
    if (currentUser) {
      const item = items.find((i) => i.id === id);
      if (item) {
        await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', currentUser.id)
          .eq('product_id', item.productId)
          .eq('color', item.color)
          .eq('size', item.size);
      }
    }
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    if (currentUser) {
      const item = items.find((i) => i.id === id);
      if (item) {
        await supabase
          .from('cart_items')
          .update({ quantity })
          .eq('user_id', currentUser.id)
          .eq('product_id', item.productId)
          .eq('color', item.color)
          .eq('size', item.size);
      }
    }

    setItems((prev) =>
      prev.map((item) => item.id === id ? { ...item, quantity } : item)
    );
  };

  const clearCart = async () => {
    if (currentUser) {
      await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', currentUser.id);
    } else {
      localStorage.removeItem(LOCAL_KEY);
    }
    setItems([]);
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
