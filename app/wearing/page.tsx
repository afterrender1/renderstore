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
        className="bg-[#074E46] select-none mt-5 text-white mx-18 rounded-t-4xl flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-20 py-10 md:py-16 relative overflow-hidden"
      >
        <motion.div
          variants={fadeZoomIn}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative z-10 md:w-1/2 space-y-4"
        >
          <h1
            className="text-3xl md:text-5xl font-extrabold leading-snug"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Explore the <br /> Latest Wear Collection
          </h1>
          <p
            className="text-white/80 text-sm md:text-base max-w-md"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Step into style with our trendy, comfortable, and sustainable fashion
            picks for all occasions.
          </p>
         
        </motion.div>

    <motion.div
  variants={fadeZoomIn}
  transition={{ duration: 0.8, delay: 0.3 }}
  className="relative z-10 mt-10 md:mt-0 md:w-1/2 flex justify-center"
>
  <div className="relative w-[550px] h-98">
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
      <section className="px-6 md:px-12 lg:px-20 py-10 select-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex justify-between items-center mb-6"
        >
          <h2
            className="text-3xl font-bold text-gray-800"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Featured Wearing Products
          </h2>
        </motion.div>

        {loading ? (
          <div className="flex flex-col items-center col-span-full text-gray-600 text-lg h-screen">
            <LoaderCircle size={80} className="animate-spin text-[#074E46]" />
            <p className="mt-4 text-2xl font-bold text-[#074E46]">Loading...</p>
          </div>
        ) : error ? (
          <p className="text-red-600 text-lg text-center">
            Failed to fetch products. Please try again later.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {products.slice(0, 20).map((product, index) => {
              const quantity = getQuantity(product.id);
              return (
                <motion.div
                  key={product.id}
                  variants={fadeZoomIn}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-white select-none rounded-t-xl rounded-b-[10%] hover:shadow-md transition flex flex-col items-center justify-between pb-6 pt-4 h-[380px] w-full"
                  style={{ clipPath: "ellipse(150% 97% at 50% 0%)" }}
                >
                  {/* Product Image */}
                  <Link
                    href={`/wear/${product.id}`}
                    className="relative w-full flex justify-center items-center cursor-pointer h-[180px]"
                  >
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={160}
                      height={160}
                      draggable={false}
                      className="object-contain rounded-xl max-h-40"
                    />
                  </Link>

                  {/* Product Info */}
                  <div className="flex flex-col items-center justify-between h-[120px]">
                    <h3
                      className="text-center font-semibold text-gray-800 text-base mb-1 truncate w-[90%]"
                      style={{ fontFamily: "var(--font-fredoka)" }}
                      title={product.title}
                    >
                      {product.title.length > 30
                        ? product.title.slice(0, 27) + "..."
                        : product.title}
                    </h3>
                    <p
                      className="text-gray-500 text-center mb-1 capitalize text-sm"
                      style={{ fontFamily: "var(--font-fredoka)" }}
                    >
                      {product.category}
                    </p>
                    <span
                      className="text-2xl font-bold text-gray-800 mb-2"
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
                          className="cursor-pointer bg-[#F0F4EA] px-16 py-2 hover:bg-gray-200 transition-colors rounded-lg flex items-center justify-center font-semibold text-gray-700"
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
                          className="cursor-pointer bg-[#B9EC5D] px-8 py-2 flex items-center justify-center gap-4 rounded-lg"
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDecrease(product.id);
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
                              handleIncrease(product.id);
                            }}
                            className="cursor-pointer text-gray-700 font-bold text-lg hover:scale-110 transition"
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
