'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
  id: number;
  icon: string;
  fish: string;
  price: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  getItemQuantity: (id: number) => number;
  totalItems: number;
  updateQuantity: (id: number, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setItems(JSON.parse(storedCart));
    }
  }, []);

  // Save to localStorage when items change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }, [items]);

  const addToCart = (item: CartItem) => {
    setItems(currentItems => {
      const alreadyInCart = currentItems.some(cartItem => cartItem.id === item.id);
      if (alreadyInCart) return currentItems;
      return [...currentItems, item];
    });

    if (typeof window !== "undefined") {
      localStorage.setItem('cart', JSON.stringify([...items, item]));
    }
  };

  const removeFromCart = (id: number) => {
    setItems(currentItems => currentItems.filter(item => item.id !== id));

    if (typeof window !== "undefined") {
      const updatedCart = items.filter(item => item.id !== id);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  const updateQuantity = () => {
    console.warn("updateQuantity has no effect in single-item cart mode");
  };

  const clearCart = () => {
    setItems([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem('cart');
    }
  };

  const getItemQuantity = (id: number) => {
    return items.some(item => item.id === id) ? 1 : 0;
  };

  const totalItems = items.length;

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      clearCart,
      getItemQuantity,
      totalItems,
      updateQuantity
    }}>
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
