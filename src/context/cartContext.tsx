"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Product type — basic product info
type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

// CartItem — a product and quantity
type CartItem = Product & {
  quantity: number;
};

// Context type — what data/functions the context will provide
type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
};

// Create the context (default value is undefined)
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create the provider — the “store” for our global state
export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load from localStorage on first render
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Save to localStorage when cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

// Add product to cart
  function addToCart(product: Product) {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        // If item exists, it will increase quantity
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If new item, it will add it with quantity = 1
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  }

  // Remove or decrease product from cart
  function removeFromCart(id: number) {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === id);

      if (!existingItem) return prevCart;

      if (existingItem.quantity > 1) {
        // Reduce quantity by 1
        return prevCart.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        // Remove item completely
        return prevCart.filter((item) => item.id !== id);
      }
    });
  }

  // Returns the context provider
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use the context easily
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
