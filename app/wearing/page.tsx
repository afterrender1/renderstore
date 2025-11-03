"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/component/Navbar";
import Link from "next/link";
import { LoaderCircle, Plus, Minus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { addToCart, increaseQty, decreaseQty } from "@/app/redux/CartSlice";

type Product = {
  id: number;
  title: string;
  image: string;
  price: number;
  category: string;
  description: string;
};

export default function WearingPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const fadeZoomIn = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0 },
  };

  useEffect(() => {
    const fetchWearing = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("❌ Error during fetching:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchWearing();
  }, []);

  const getQuantity = (id: number) => {
    const item = cartItems.find((item) => item.id === id);
    return item ? item.quantity : 0;
  };

  const handleAdd = (product: Product) => {
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

  const handleIncrease = (id: number) => dispatch(increaseQty(id));
  const handleDecrease = (id: number) => dispatch(decreaseQty(id));

  return (
    <>
      <Navbar />

      {/* 🧥 Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeZoomIn}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ clipPath: "ellipse(150% 90% at 50% 0%)" }}
        className="bg-[#074E46] select-none mt-5 text-white 
        rounded-t-4xl flex flex-col-reverse md:flex-row items-center justify-between 
        px-3 xs:px-4 sm:px-6 md:px-12 lg:px-20 2xl:px-32 
        py-6 xs:py-8 sm:py-10 md:py-16  mx-2 sm:mx-4 md:mx-8 lg:mx-12 xl:mx-18 2xl:mx-18 relative overflow-hidden"
      >
        {/* Left Text Section */}
        <motion.div
          variants={fadeZoomIn}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative z-10 w-full md:w-1/2 space-y-4 text-center md:text-left"
        >
          <h1
            className="text-xl xs:text-2xl sm:text-3xl md:text-5xl font-extrabold leading-snug"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Explore the <br /> Latest Wear Collection
          </h1>
          <p
            className="text-white/80 text-xs xs:text-sm sm:text-base max-w-md mx-auto md:mx-0"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Step into style with our trendy, comfortable, and sustainable fashion
            picks for all occasions.
          </p>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          variants={fadeZoomIn}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-10 mt-8 md:mt-0 w-full md:w-1/2 flex justify-center"
        >
          <div className="relative w-[200px] xs:w-[280px] sm:w-[400px] md:w-[500px] lg:w-[550px] 2xl:w-[650px] h-[160px] xs:h-[220px] sm:h-[280px] md:h-[340px] lg:h-[380px] 2xl:h-[420px]">
            <Image
              src="/images/herowearing.png"
              alt="Wearing Hero"
              fill
              className="object-cover rounded-2xl"
              priority
            />
          </div>
        </motion.div>
      </motion.section>

      {/* 🛍️ Product Section */}
      <section className="px-3 xs:px-4 sm:px-6 md:px-12 lg:px-20 2xl:px-32 py-10 select-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 gap-4"
        >
          <h2
            className="text-xl xs:text-2xl sm:text-3xl font-bold text-gray-800 text-center sm:text-left"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Featured Wearing Products
          </h2>
        </motion.div>

        {/* Loading / Error States */}
        {loading ? (
          <div className="flex flex-col items-center justify-center col-span-full text-gray-600 text-lg h-[50vh]">
            <LoaderCircle size={60} className="animate-spin text-[#074E46]" />
            <p className="mt-4 text-xl sm:text-2xl font-bold text-[#074E46]">
              Loading...
            </p>
          </div>
        ) : error ? (
          <p className="text-red-600 text-lg text-center">
            Failed to fetch products. Please try again later.
          </p>
        ) : (
          <div
            className="grid gap-4 xs:gap-5 sm:gap-6 
            grid-cols-[repeat(auto-fit,minmax(150px,1fr))] 
            sm:grid-cols-[repeat(auto-fit,minmax(180px,1fr))] 
            md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] 
            lg:grid-cols-[repeat(auto-fit,minmax(220px,1fr))] 
            xl:grid-cols-[repeat(auto-fit,minmax(240px,1fr))] 
            2xl:grid-cols-[repeat(auto-fit,minmax(260px,1fr))]"
          >
            {products.slice(0, 20).map((product, index) => {
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
                  pb-4 sm:pb-6 pt-4 h-[300px] xs:h-[320px] sm:h-[360px] md:h-[380px] w-full"
                  style={{ clipPath: "ellipse(150% 97% at 50% 0%)" }}
                >
                  {/* Product Image */}
                  <Link
                    href={`/wear/${product.id}`}
                    className="relative w-full flex justify-center items-center cursor-pointer h-[130px] xs:h-[150px] sm:h-[180px]"
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

                  {/* Product Info */}
                  <div className="flex flex-col items-center justify-between h-[100px] sm:h-[120px]">
                    <h3
                      className="text-center font-semibold text-gray-800 text-xs xs:text-sm sm:text-base mb-1 truncate w-[90%]"
                      style={{ fontFamily: "var(--font-fredoka)" }}
                      title={product.title}
                    >
                      {product.title.length > 30
                        ? product.title.slice(0, 27) + "..."
                        : product.title}
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

                  {/* Add / Counter Buttons */}
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
                          style={{ clipPath: "ellipse(130% 90% at 50% 0%)" }}
                          className="cursor-pointer bg-[#F0F4EA] 
                          px-8 xs:px-10 sm:px-12 md:px-16 py-2 hover:bg-gray-200 
                          transition-colors rounded-lg flex items-center 
                          justify-center font-semibold text-gray-700 text-xs xs:text-sm sm:text-base"
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
                          className="cursor-pointer bg-[#B9EC5D] 
                          px-4 xs:px-6 sm:px-8 py-2 flex items-center justify-center 
                          gap-2 xs:gap-3 sm:gap-4 rounded-lg"
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDecrease(product.id);
                            }}
                            className="cursor-pointer text-gray-700 font-bold text-sm xs:text-base sm:text-lg hover:scale-110 transition"
                          >
                            <Minus />
                          </button>
                          <span className="text-gray-800 font-semibold text-xs xs:text-sm sm:text-base">
                            {quantity}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleIncrease(product.id);
                            }}
                            className="cursor-pointer text-gray-700 font-bold text-sm xs:text-base sm:text-lg hover:scale-110 transition"
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
