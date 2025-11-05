"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/component/Navbar";
import Link from "next/link";
import { LoaderCircle, Plus, Minus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { addToCart, increaseQty, decreaseQty } from "@/app/redux/CartSlice";

// ✅ Product Type
type Product = {
  id: string;
  title: string;
  image: string;
  price: number;
  category: string;
  description: string;
};

// ✅ Electronics Data
const electronics: Product[] = [
  {
    id: "elec-1",
    title: "Wireless Headphones",
    image: "/images/electronics/wirelessheadphones.png",
    price: 59.99,
    category: "electronics",
    description: "Noise-cancelling wireless headphones with deep bass.",
  },
  {
    id: "elec-2",
    title: "17 Pro Max",
    image: "/images/electronics/promax.png",
    price: 799.99,
    category: "electronics",
    description: "Next-gen smartphone with powerful performance and camera.",
  },
  {
    id: "elec-3",
    title: "Bluetooth Speaker",
    image: "/images/electronics/speaker.png",
    price: 89.99,
    category: "electronics",
    description: "Portable waterproof speaker with crisp sound.",
  },
  {
    id: "elec-4",
    title: "Smartwatch Ultra",
    image: "/images/electronics/smartwatch.png",
    price: 199.99,
    category: "electronics",
    description: "Advanced smartwatch with heart rate monitor and GPS.",
  },
  {
    id: "elec-5",
    title: "Gaming Mouse",
    image: "/images/electronics/mouse.png",
    price: 49.99,
    category: "electronics",
    description: "Ergonomic RGB gaming mouse with adjustable DPI.",
  },
];

export default function ElectronicsPage() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const fadeZoomIn = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0 },
  };

  const getQuantity = (id: string) => {
    // @ts-ignore
    const item = cartItems.find((item) => item.id === id);
    return item ? item.quantity : 0;
  };

  const handleAdd = (product: Product) => {
    dispatch(
      // @ts-ignore
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.image,
        description: product.description,
      })
    );
  };

  const handleIncrease = (id: string) => {
    // @ts-ignore
    dispatch(increaseQty(id));
  };

  const handleDecrease = (id: string) => {
    // @ts-ignore
    dispatch(decreaseQty(id));
  };

  return (
    <>
      <Navbar />

      {/* ⚡ Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeZoomIn}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ clipPath: "ellipse(150% 90% at 50% 0%)" }}
        className="bg-[#074E46] text-white mt-5 rounded-t-4xl
        flex flex-col-reverse md:flex-row items-center justify-between 
        px-4 sm:px-8 md:px-12 lg:px-20 2xl:px-32 py-10 md:py-16 
        mx-2 sm:mx-4 md:mx-8 lg:mx-16 overflow-hidden"
      >
        {/* Left Content */}
        <motion.div
          variants={fadeZoomIn}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="w-full md:w-1/2 text-center md:text-left space-y-4"
        >
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold leading-snug font-fredoka">
            Explore Latest Electronics
          </h1>
          <p className="text-white/80 text-sm sm:text-base max-w-md mx-auto md:mx-0 font-fredoka">
            Upgrade your setup with our top tech picks — from gadgets to accessories.
          </p>
        </motion.div>

        {/* Right Image */}
        <motion.div
          variants={fadeZoomIn}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative mt-8 md:mt-0 w-full md:w-1/2 flex justify-center"
        >
          <div className="relative w-[200px] sm:w-[300px] md:w-[450px] lg:w-[550px] h-[180px] sm:h-60 md:h-80 lg:h-[360px]">
            <Image
              src="/images/electronic.png"
              alt="Electronics Hero"
              fill
              className="object-contain rounded-2xl"
              priority
            />
          </div>
        </motion.div>
      </motion.section>

      {/* 🛒 Product Section */}
      <section className="px-4 sm:px-8 md:px-12 lg:px-20 2xl:px-32 py-12 bg-white">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center font-fredoka">
          Featured Electronics
        </h2>

        {loading ? (
          <div className="flex flex-col items-center justify-center text-gray-600 text-lg h-[50vh]">
            <LoaderCircle size={60} className="animate-spin text-[#074E46]" />
            <p className="mt-4 text-xl sm:text-2xl font-bold text-[#074E46]">
              Loading...
            </p>
          </div>
        ) : (
          <div
            className="
              grid gap-6 sm:gap-8
              grid-cols-2
              sm:grid-cols-3
              lg:grid-cols-4
              xl:grid-cols-5
              justify-items-center
            "
          >
            {electronics.map((product, index) => {
              const quantity = getQuantity(product.id);
              return (
                <motion.div
                  key={product.id}
                  variants={fadeZoomIn}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-white border border-gray-100 rounded-xl hover:shadow-lg transition 
                  flex flex-col items-center justify-between w-full max-w-[220px] sm:max-w-60 md:max-w-[260px] 
                  p-4 sm:p-5 h-[340px] sm:h-[380px]"
                >
                  {/* Image */}
                  <Link
                    href={`/product/${product.id}`}
                    className="w-full flex justify-center items-center h-[150px] sm:h-[180px] mb-2"
                  >
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={150}
                      height={150}
                      className="object-contain"
                    />
                  </Link>

                  {/* Info */}
                  <div className="text-center flex flex-col items-center justify-between grow">
                    <h3
                      className="font-semibold text-gray-800 text-sm sm:text-base truncate w-[90%]"
                      title={product.title}
                    >
                      {product.title}
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm capitalize mt-1">
                      {product.category}
                    </p>
                    <span className="text-lg sm:text-xl font-bold text-gray-800 mt-2 mb-3">
                      ${product.price}
                    </span>
                  </div>

                  {/* Add / Counter */}
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
                            e.stopPropagation();
                            handleAdd(product);
                          }}
                          className="cursor-pointer bg-[#E0E7F3] 
                          px-10 py-2 hover:bg-gray-200 
                          transition-colors rounded-lg flex items-center 
                          justify-center font-semibold text-gray-700 text-sm"
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
                          className="cursor-pointer bg-[#B4DE69] 
                          px-6 py-2 flex items-center justify-center 
                          gap-3 rounded-lg"
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDecrease(product.id);
                            }}
                            className="text-gray-700 font-bold hover:scale-110 transition"
                          >
                            <Minus />
                          </button>
                          <span className="text-gray-800 font-semibold">
                            {quantity}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleIncrease(product.id);
                            }}
                            className="text-gray-700 font-bold hover:scale-110 transition"
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
        )}
      </section>
    </>
  );
}
