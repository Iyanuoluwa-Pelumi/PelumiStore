"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const products = [
  { id: 1, name: "iPhone 17", price: 4000000, image: "/iphone 17.png" },
  { id: 2, name: "MacBook Air", price: 900000, image: "/Macbook Air.png" },
  { id: 3, name: "AirPods Pro", price: 200000, image: "/Airpod.png" },
  { id: 4, name: "Redmi Note 13", price: 280000, image: "/redmi note 13.png" },
  { id: 5, name: "Samsung TV", price: 560000, image: "/Samsung TV.png" },
  { id: 6, name: "Air Conditioner", price: 480000, image: "/AC.png" },
  { id: 7, name: "Petrol Generator 3kW 240V 50Hz 15A - 18L Tank", price: 380000, image: "/Generator.png" },
  { id: 8, name: "Washing Machine", price: 450000, image: "/Washing Machine.png" },
  { id: 9, name: "Deep Freezer", price: 300000, image: "/fridge.png" },
];

export default function ProductList() {
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 mt-20">

        {Array(9)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="border rounded-2xl bg-white shadow-md p-6 hover:shadow-lg transition-all duration-300 w-full"
            >
              <Skeleton width={200} height={200} className="mb-4 rounded-md w-full h-44 object-contain" />
              <Skeleton width="100%" height={20} className="mb-2" />
              <Skeleton width={80} height={20} />
              <Skeleton width="100%" height={40} className="mt-4 rounded-md" />
            </div>
          ))}
      </div>
    );
  }

  {/*return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 mt-20">
      {products.map((p) => (
        <div
          key={p.id}
          className="border rounded-2xl bg-white shadow-md p-6 hover:shadow-lg transition-all duration-300 w-full"
        >
          <Image
            src={p.image}
            alt={p.name}
            width={200}
            height={200}
            className="w-full h-44 object-contain mb-4"
          />
          <h2 className="font-semibold text-lg">{p.name}</h2>
          <p className="text-gray-600 mb-3">#{p.price.toLocaleString()}</p>
          <button
            onClick={() => addToCart(p)}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all cursor-pointer"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  ); */}

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 mt-20">
      {products.map((p, i) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="border rounded-2xl bg-white shadow-md p-6 hover:shadow-xl transition-all duration-300"
        >
          <Image
            src={p.image}
            alt={p.name}
            width={200}
            height={200}
            className="w-full h-44 object-contain mb-4"
          />
          <h2 className="font-bold text-lg">{p.name}</h2>
          <p className="text-gray-600 mb-3">#{p.price.toLocaleString()}</p>
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => addToCart(p)}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all cursor-pointer"
          >
            Add to Cart
          </motion.button>
        </motion.div>
      ))}
    </div>
  );
}
