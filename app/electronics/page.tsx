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

// ✅ Electronics Product Type
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
  {
    id: "elec-6",
    title: "Mechanical Keyboard",
    image: "/images/electronics/keyboard.png",
    price: 119.99,
    category: "electronics",
    description: "RGB backlit mechanical keyboard with blue switches.",
  },
  {
    id: "elec-7",
    title: "Laptop Stand",
    image: "/images/electronics/laptopstand.png",
    price: 34.99,
    category: "electronics",
    description: "Adjustable aluminum stand for laptops and tablets.",
  },
  {
    id: "elec-8",
    title: "Power Bank 20000mAh",
    image: "/images/electronics/powerbank.png",
    price: 39.99,
    category: "electronics",
    description: "Fast-charging power bank for mobile and tablets.",
  },
  {
    id: "elec-9",
    title: "HD Webcam",
    image: "/images/electronics/hdwebcam.png",
    price: 69.99,
    category: "electronics",
    description: "1080p webcam with built-in microphone for streaming.",
  },
  {
    id: "elec-10",
    title: "Wireless Charger Pad",
    image: "/images/electronics/wirelesscharger.png",
    price: 24.99,
    category: "electronics",
    description: "Fast wireless charging pad compatible with all Qi devices.",
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
    //@ts-ignore
    const item = cartItems.find((item) => item.id === id);
    return item ? item.quantity : 0;
  };

  const handleAdd = (product: Product) => {
    dispatch(
      //@ts-ignore
      addToCart({
      //@ts-ignore

        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.image,
        description: product.description,
      })
    );
  };

  const handleIncrease = (id: string) => {
    //@ts-ignore
    dispatch(increaseQty(id));
  };

  const handleDecrease = (id: string) => {
    //@ts-ignore
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
        className="bg-[#074E46] select-none mt-5 text-white 
        rounded-t-4xl flex flex-col-reverse md:flex-row items-center justify-between 
        px-3 xs:px-4 sm:px-6 md:px-12 lg:px-20 2xl:px-32 
        py-6 xs:py-8 sm:py-10 md:py-16 mx-2 sm:mx-4 md:mx-8 lg:mx-18  relative overflow-hidden"
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
            Explore Latest Electronics
          </h1>
          <p
            className="text-white/80 text-xs xs:text-sm sm:text-base max-w-md mx-auto md:mx-0"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Upgrade your setup with our top tech picks — from gadgets to accessories.
          </p>
        </motion.div>

        <motion.div
          variants={fadeZoomIn}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-10 mt-8 md:mt-0 w-full md:w-1/2 flex justify-center"
        >
          <div className="relative w-[200px] xs:w-[280px] sm:w-[400px] md:w-[500px] lg:w-[590px] h-40 xs:h-[220px] sm:h-[280px] md:h-[340px] lg:h-[380px]">
            <Image
              src="/images/electronic.png"
              alt="Electronics Hero"
              height={900}
              width={900}
              className="object-cover rounded-2xl"
              priority
            />
          </div>
        </motion.div>
      </motion.section>

      {/* 🛒 Product Section */}
      <section className="px-3 xs:px-4 sm:px-6 md:px-12 lg:px-20 2xl:px-32 py-10 select-none">
        <h2
          className="text-xl xs:text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center sm:text-left"
          style={{ fontFamily: "var(--font-fredoka)" }}
        >
          Featured Electronics
        </h2>

        {loading ? (
          <div className="flex flex-col items-center justify-center col-span-full text-gray-600 text-lg h-[50vh]">
            <LoaderCircle size={60} className="animate-spin text-[#0A2540]" />
            <p className="mt-4 text-xl sm:text-2xl font-bold text-[#0A2540]">
              Loading...
            </p>
          </div>
        ) : (
          <div
            className="grid gap-4 xs:gap-5 sm:gap-6 
            grid-cols-[repeat(auto-fit,minmax(180px,1fr))] 
            sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] 
            md:grid-cols-[repeat(auto-fit,minmax(220px,1fr))] 
            lg:grid-cols-[repeat(auto-fit,minmax(240px,1fr))] 
            xl:grid-cols-[repeat(auto-fit,minmax(260px,1fr))]"
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
                  className="bg-white select-none rounded-t-xl rounded-b-[10%] 
                  hover:shadow-md transition flex flex-col items-center justify-between 
                  pb-6 pt-4 h-[340px] xs:h-[360px] sm:h-[380px] md:h-[400px]"
                  style={{ clipPath: "ellipse(150% 97% at 50% 0%)" }}
                >
                  {/* Image */}
                  <Link
                    href="#"
                    className="relative w-full flex justify-center items-center cursor-pointer h-[150px] xs:h-[170px] sm:h-[190px]"
                  >
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={160}
                      height={160}
                      className="object-contain rounded-xl max-h-40"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex flex-col items-center justify-between h-[120px]">
                    <h3
                      className="text-center font-semibold text-gray-800 text-sm sm:text-base mb-1 truncate w-[90%]"
                      style={{ fontFamily: "var(--font-fredoka)" }}
                      title={product.title}
                    >
                      {product.title}
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm capitalize">
                      {product.category}
                    </p>
                    <span
                      className="text-xl font-bold text-gray-800 mb-2"
                      style={{ fontFamily: "var(--font-montserrat)" }}
                    >
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
                            className="cursor-pointer text-gray-700 font-bold hover:scale-110 transition"
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
                            className="cursor-pointer text-gray-700 font-bold hover:scale-110 transition"
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
