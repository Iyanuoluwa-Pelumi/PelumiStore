"use client";
import { useCart } from "@/components/CartContext";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


export default function Navbar() {
  const { cart } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {

    return (
      <nav className="flex items-center justify-between px-6 py-4 bg-blue-600 text-white  top-0 fixed w-full z-10">
        <Skeleton width={150} height={30} />
        <Skeleton width={100} height={30} />
      </nav>
    )
  }

  {/* return (
    //<nav className="flex items-center justify-between px-6 py-4 bg-blue-600 text-white  top-0 fixed w-full z-10">
      <h1 className="text-2xl font-bold">🛍️ PelumiShop</h1>

      <button onClick={() => {
        const cartSection = document.querySelector('#cart');
        cartSection?.scrollIntoView({ behavior: "smooth" });
      }} className="relative bg-blue-800 px-4 py-2 rounded hover:bg-blue-700 cursor-pointer">
        🛒 Cart
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            {totalItems}
          </span>
        )}
      </button>
    </nav>
  ); */ }

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex items-center justify-between px-6 py-4 bg-blue-600 text-white top-0 fixed w-full z-10"
    >
      <motion.h1 whileHover={{ scale: 1.05 }} className="text-2xl font-bold">
        🛍️ PelumiStore
      </motion.h1>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          const cartSection = document.querySelector("#cart");
          cartSection?.scrollIntoView({ behavior: "smooth" });
        }}
        className="relative bg-blue-800 px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
      >
        🛒 Cart
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            {totalItems}
          </span>
        )}
      </motion.button>
    </motion.nav>
  );
}

