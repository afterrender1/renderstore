"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/component/Navbar";
import { LoaderCircle, Plus, Minus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { addToCart, increaseQty, decreaseQty } from "@/app/redux/CartSlice";
import Link from "next/link";

const dailyProducts = [
  {
    id: "daily-1",
    title: "Detergent Powder",
    image: "/images/dailyproducts/tide.png",
    price: 6.99,
    category: "daily products",
    description: "Powerful detergent for fresh and clean clothes.",
  },
  {
    id: "daily-2",
    title: "Toothpaste",
    image: "/images/dailyproducts/colgate.png",
    price: 3.49,
    category: "daily products",
    description: "Fluoride toothpaste for strong and healthy teeth.",
  },
  {
    id: "daily-3",
    title: "Bath Soap",
    image: "/images/dailyproducts/dove.png",
    price: 2.99,
    category: "daily products",
    description: "Refreshing bath soap with natural oils and fragrance.",
  },
  {
    id: "daily-4",
    title: "Shampoo",
    image: "/images/dailyproducts/sunslik.png",
    price: 5.99,
    category: "daily products",
    description: "Gentle shampoo for soft and shiny hair.",
  },
  {
    id: "daily-5",
    title: "Handwash",
    image: "/images/dailyproducts/handwash.png",
    price: 4.49,
    category: "daily products",
    description: "Antibacterial handwash for clean and germ-free hands.",
  },
  {
    id: "daily-6",
    title: "Toilet Cleaner",
    image: "/images/dailyproducts/toilet.png",
    price: 7.99,
    category: "daily products",
    description: "Strong cleaning formula for sparkling toilets.",
  },
  {
    id: "daily-7",
    title: "Dishwashing Liquid",
    image: "/images/dailyproducts/dishwashing.png",
    price: 5.29,
    category: "daily products",
    description: "Tough on grease, gentle on hands dishwashing liquid.",
  },
  {
    id: "daily-8",
    title: "Paper Towels",
    image: "/images/dailyproducts/paper.png",
    price: 3.99,
    category: "daily products",
    description: "Highly absorbent paper towels for everyday cleaning.",
  },
  {
    id: "daily-9",
    title: "Deodorant Spray",
    image: "/images/dailyproducts/spray.png",
    price: 6.49,
    category: "daily products",
    description: "Long-lasting fragrance to keep you fresh all day.",
  },
  {
    id: "daily-10",
    title: "Laundry Softener",
    image: "/images/dailyproducts/laundry.png",
    price: 8.99,
    category: "daily products",
    description: "Gives clothes a soft feel and pleasant fragrance.",
  },
];

export default function DailyProductsPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const fadeZoomIn = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0 },
  };

  const getQuantity = (id: string) => {
    //@ts-ignore
    const item = cartItems.find((item) => item.id === id);
    return item ? item.quantity : 0;
  };

  const handleAdd = (product: any) => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.image,
        description: product.description,
      })
    );
  };
    //@ts-ignore

  const handleIncrease = (id: string) => dispatch(increaseQty(id));
    //@ts-ignore

  const handleDecrease = (id: string) => dispatch(decreaseQty(id));

  return (
    <>
      <Navbar />

      {/* 🧴 Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeZoomIn}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ clipPath: "ellipse(150% 90% at 50% 0%)" }}
        className="bg-[#074E46] select-none mt-5 text-white 
        rounded-t-4xl flex flex-col-reverse md:flex-row items-center justify-between 
        px-3 xs:px-4 sm:px-6 md:px-12 lg:px-20 2xl:px-32 
        py-6 xs:py-8 sm:py-10 md:py-16 mx-2 sm:mx-4 md:mx-8 lg:mx-12 2xl:mx-18 relative overflow-hidden"
      >
        <motion.div
          variants={fadeZoomIn}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative z-10 w-full md:w-1/2 space-y-4 text-center md:text-left"
        >
          <h1
            className="text-xl xs:text-2xl sm:text-3xl md:text-5xl font-extrabold leading-snug"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Essential Daily Use Products
          </h1>
          <p
            className="text-white/80 text-xs xs:text-sm sm:text-base max-w-md mx-auto md:mx-0"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Keep your home clean and refreshed with our top-quality daily
            essentials.
          </p>
        </motion.div>

        <motion.div
          variants={fadeZoomIn}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-10 mt-8 md:mt-0 w-full md:w-1/2 flex justify-center"
        >
          <div className="relative w-[200px] xs:w-[280px] sm:w-[400px] md:w-[500px] lg:w-[550px] h-40 xs:h-[220px] sm:h-[280px] md:h-[340px] lg:h-[380px]">
            <Image
              src="/images/dailyp.png"
              alt="Daily Products Hero"
              fill
              className="object-cover rounded-2xl"
              priority
            />
          </div>
        </motion.div>
      </motion.section>

      {/* 🛒 Products Grid */}
      <section className="px-3 xs:px-4 sm:px-6 md:px-12 lg:px-20 2xl:px-32 py-10 select-none">
        <h2
          className="text-xl xs:text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center sm:text-left"
          style={{ fontFamily: "var(--font-fredoka)" }}
        >
          Daily Essentials You’ll Love
        </h2>

        <div
          className="grid gap-4 xs:gap-5 sm:gap-6 
          grid-cols-[repeat(auto-fit,minmax(150px,1fr))] 
          sm:grid-cols-[repeat(auto-fit,minmax(180px,1fr))] 
          md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] 
          lg:grid-cols-[repeat(auto-fit,minmax(220px,1fr))] 
          xl:grid-cols-[repeat(auto-fit,minmax(240px,1fr))] 
          2xl:grid-cols-[repeat(auto-fit,minmax(260px,1fr))]"
        >
          {dailyProducts.map((product, index) => {
            const quantity = getQuantity(product.id);
            return (
              <motion.div
                key={product.id}
                variants={fadeZoomIn}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white rounded-t-xl rounded-b-[10%] hover:shadow-md transition 
                flex flex-col items-center justify-between pb-4 sm:pb-6 pt-4 h-[300px] xs:h-[320px] sm:h-[360px] md:h-[380px] w-full"
                style={{ clipPath: "ellipse(150% 97% at 50% 0%)" }}
              >
                <div className="relative w-full flex justify-center items-center h-[130px] xs:h-[150px] sm:h-[180px]">
                  <Link
                                       href={`/product/${product.id}`}

                   >
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={160}
                    height={160}
                    draggable={false}
                    className="object-contain rounded-xl max-h-32 sm:max-h-40"
                  />
                  </Link>

                </div>

                <div className="flex flex-col items-center justify-between h-[100px] sm:h-[120px]">
                  <h3
                    className="text-center font-semibold text-gray-800 text-xs xs:text-sm sm:text-base mb-1 truncate w-[90%]"
                    style={{ fontFamily: "var(--font-fredoka)" }}
                    title={product.title}
                  >
                    {product.title}
                  </h3>
                  <p
                    className="text-gray-500 text-center mb-1 capitalize text-xs sm:text-sm"
                    style={{ fontFamily: "var(--font-fredoka)" }}
                  >
                    {product.category}
                  </p>
                  <span
                    className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-800 mb-2"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    ${product.price}
                  </span>
                </div>

                <div className="flex justify-center w-full">
                  <AnimatePresence mode="wait">
                    {quantity === 0 ? (
                      <motion.button
                        key="add"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => handleAdd(product)}
                        style={{ clipPath: "ellipse(130% 90% at 50% 0%)" }}
                        className="bg-[#F0F4EA] px-8 xs:px-10 sm:px-12 md:px-16 py-2 
                        hover:bg-gray-200 transition-colors rounded-lg font-semibold text-gray-700 text-xs xs:text-sm sm:text-base"
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
                        className="bg-[#B9EC5D] px-4 xs:px-6 sm:px-8 py-2 flex items-center justify-center gap-3 rounded-lg"
                      >
                        <button
                          onClick={() => handleDecrease(product.id)}
                          className="text-gray-700 font-bold text-sm sm:text-lg hover:scale-110 transition"
                        >
                          <Minus />
                        </button>
                        <span className="text-gray-800 font-semibold text-sm sm:text-base">
                          {quantity}
                        </span>
                        <button
                          onClick={() => handleIncrease(product.id)}
                          className="text-gray-700 font-bold text-sm sm:text-lg hover:scale-110 transition"
                        >
                          <Plus />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </>
  );
}
