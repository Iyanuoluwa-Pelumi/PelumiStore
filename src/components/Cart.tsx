"use client";
import Image from "next/image";
import { useCart } from "@/components/CartContext";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useState, useEffect } from "react";

export default function Cart() {
  const { cart, addToCart, removeFromCart } = useCart();
  const [loading, setLoading] = useState(true);

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    // Loader Skeleton
    return (
      <div className="w-screen sm:w-lg mx-auto bg-white p-6 rounded-2xl shadow-md sm:mt-20">
        <Skeleton width={120} height={30} className="mb-4" />

        <div className="space-y-4">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="flex justify-between items-center border-b pb-3"
              >
                <div className="flex items-center gap-3">
                  <Skeleton width={50} height={50} />
                  <div>
                    <Skeleton width={120} height={15} />
                    <Skeleton width={80} height={12} />
                  </div>
                </div>
                <Skeleton width={80} height={30} />
              </div>
            ))}
        </div>

        <div className="mt-6 text-right font-bold text-lg">
          <Skeleton width={100} height={25} />
        </div>
      </div>
    );
  }

  // Actual Cart Content
  return (
    <div id="cart" className="w-screen sm:w-lg mx-auto bg-white p-6 rounded-2xl shadow-md sm:mt-20">
      <h2 className="font-bold text-2xl mb-4 border-b pb-2">🛍️ Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {cart.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center border-b pb-3"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={50}
                  height={50}
                  className="object-contain"
                />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    #{item.price.toLocaleString()} × {item.quantity}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded cursor-pointer"
                >
                  –
                </button>
                <span className="font-semibold">{item.quantity}</span>
                <button
                  onClick={() => addToCart(item)}
                  className="px-2 py-1 bg-green-500 text-white rounded cursor-pointer"
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {cart.length > 0 && (
        <div className="mt-6 text-right font-bold text-lg">
          Total: #
          {cart
            .reduce((acc, item) => acc + item.price * item.quantity, 0)
            .toLocaleString()}
        </div>
      )}
    </div>
  );
}
