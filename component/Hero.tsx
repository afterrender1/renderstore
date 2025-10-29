"use client";
import Image from "next/image";
import GroceryCategories from "./GroceryCategories";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import Link from "next/link";

type Product = {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
  category: string;
};

export default function Hero() {
  const [products, setProducts] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const reversedProducts = [...products].reverse();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setProducts(data.products);
        console.log(data.products);
        
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const increase = (id: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const decrease = (id: number) => {
    setQuantities((prev) => {
      const newQty = (prev[id] || 0) - 1;
      if (newQty <= 0) {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      }
      return { ...prev, [id]: newQty };
    });
  };

  return (
    <>
      {/* 🛒 Hero Section */}
      <section
        style={{ clipPath: "ellipse(150% 90% at 50% 0%)" }}
        className="bg-[#074E46] mt-5 mx-18 text-white rounded-t-4xl flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-20 py-10 md:py-16 relative overflow-hidden"
      >
        <div className="relative z-10 md:w-1/2 space-y-4">
          <h1
            className="text-3xl md:text-6xl font-extrabold leading-snug"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            We bring the store <br /> to your door
          </h1>
          <p
            className="text-white/80 text-sm md:text-base max-w-md"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Get organic produce and sustainably sourced groceries delivered at up to{" "}
            <span className="font-semibold text-white">4% off grocery</span>.
          </p>
          <button
            style={{ fontFamily: "var(--font-fredoka)" }}
            className="cursor-pointer bg-[#C7F464] text-[#074E46] px-6 py-2 rounded-lg font-semibold hover:bg-[#b9ec5d] transition"
          >
            Shop now
          </button>
        </div>

        <div className="relative z-10 mt-10 md:mt-0 md:w-1/2 flex justify-center">
          <Image
            src="/images/bag.png"
            alt="Grocery bag"
            width={500}
            height={500}
            className="object-cover"
          />
        </div>
      </section>

      <GroceryCategories />

      {/* 🧺 Product Cards */}
      <section className="px-6 md:px-12 lg:px-20 py-10">
        <div className="flex justify-between items-center mb-6">
          <h2
            className="text-3xl font-bold text-gray-800"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            You might need
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {reversedProducts.map((product) => {
            const quantity = quantities[product.id] || 0;
            return (
              <div
                key={product.id}
                className="bg-white rounded-t-xl w-70 rounded-b-[10%] hover:shadow-md transition flex flex-col items-center pb-7"
                style={{ clipPath: "ellipse(150% 97% at 50% 0%)" }}
              >
                {/* Product Image + Link */}
                <Link
                  href={`/product/${product.id}`}
                  className="relative w-full flex justify-center items-start cursor-pointer"
                >
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    width={200}
                    height={200}
                    className="object-contain rounded-xl"
                  />
                </Link>

                {/* Info */}
                <h3
                  className="text-center font-semibold text-gray-800 text-base mb-1 truncate"
                  style={{ fontFamily: "var(--font-fredoka)" }}
                >
                  {product.title}
                </h3>
                <p
                  className="text-gray-500 text-center mb-2 capitalize"
                  style={{ fontFamily: "var(--font-fredoka)" }}
                >
                  {product.category}
                </p>
                <span
                  className="text-3xl font-bold text-gray-800 mb-3"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  {product.price}$
                </span>

                {/* Animated Add / Minus Button */}
                <div className="flex justify-center w-full">
                  <AnimatePresence mode="wait">
                    {quantity === 0 ? (
                      <motion.button
                        key="add"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={(e) => {
                          e.stopPropagation(); // 👈 prevent link click
                          increase(product.id);
                        }}
                        style={{ clipPath: "ellipse(130% 90% at 50% 0%)" }}
                        className="cursor-pointer bg-[#F0F4EA] px-20 py-3 hover:bg-gray-200 transition-colors rounded-lg flex items-center justify-center font-semibold text-gray-700"
                      >
                        <Plus />
                      </motion.button>
                    ) : (
                      <motion.div
                        key="counter"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ clipPath: "ellipse(130% 90% at 50% 0%)" }}
                        className="cursor-pointer bg-[#B9EC5D] px-10 py-3 flex items-center justify-center gap-4 rounded-lg"
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            decrease(product.id);
                          }}
                          className="cursor-pointer text-gray-700 font-bold text-lg hover:scale-110 transition"
                        >
                          <Minus />
                        </button>
                        <span className="text-gray-800 font-semibold">
                          {quantity}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            increase(product.id);
                          }}
                          className="cursor-pointer text-gray-700 font-bold text-lg hover:scale-110 transition"
                        >
                          <Plus />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
