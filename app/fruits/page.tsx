"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/component/Navbar";
import { Plus, Minus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { addToCart, increaseQty, decreaseQty } from "@/app/redux/CartSlice";
import Link from "next/link";

// 🍎 Sample Fruit Data (10)
const fruits = [
  {
    id: "fruit-1",
    title: "Fresh Mango",
    image: "/images/fruits/mango.png",
    price: 4.99,
    category: "groceries",
    description: "Juicy ripe mangoes packed with natural sweetness.",
  },
  {
    id: "fruit-2",
    title: "Banana Bunch",
    image: "/images/fruits/banana.png",
    price: 3.29,
    category: "groceries",
    description: "Naturally sweet bananas perfect for breakfast and smoothies.",
  },
  {
    id: "fruit-3",
    title: "Organic Apple",
    image: "/images/fruits/apple.png",
    price: 5.49,
    category: "groceries",
    description: "Crisp organic apples grown without synthetic fertilizers.",
  },
  {
    id: "fruit-4",
    title: "Watermelon",
    image: "/images/fruits/watermelon.png",
    price: 9.99,
    category: "groceries",
    description: "Large, juicy watermelon perfect for hot days.",
  },
  {
    id: "fruit-5",
    title: "Strawberries",
    image: "/images/fruits/straw.png",
    price: 6.49,
    category: "groceries",
    description: "Sweet, red strawberries full of vitamin C.",
  },
  {
    id: "fruit-6",
    title: "Pineapple",
    image: "/images/fruits/pineapple.png",
    price: 7.99,
    category: "groceries",
    description: "Golden pineapples rich in tropical flavor.",
  },
  {
    id: "fruit-7",
    title: "Blueberries",
    image: "/images/fruits/blueberry.png",
    price: 5.99,
    category: "groceries",
    description: "Fresh, antioxidant-rich blueberries.",
  },
  {
    id: "fruit-8",
    title: "Oranges",
    image: "/images/fruits/orange.png",
    price: 4.49,
    category: "groceries",
    description: "Vitamin C-rich oranges, juicy and sweet.",
  },
  {
    id: "fruit-9",
    title: "Grapes",
    image: "/images/fruits/grapes.png",
    price: 5.29,
    category: "groceries",
    description: "Seedless grapes with natural sweetness.",
  },
  {
    id: "fruit-10",
    title: "Papaya",
    image: "/images/fruits/papaya.png",
    price: 6.79,
    category: "groceries",
    description: "Tropical papayas rich in vitamins A and C.",
  },
];


export default function FruitsPage() {
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

  const handleAdd = (fruit: any) => {
    dispatch(
      addToCart({
        id: fruit.id,
        title: fruit.title,
        price: fruit.price,
        thumbnail: fruit.image,
        description: fruit.description,
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

      {/* 🍇 Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeZoomIn}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ clipPath: "ellipse(150% 90% at 50% 0%)" }}
        className="bg-[#074E46] select-none mt-5 text-white 
        rounded-t-4xl flex flex-col-reverse md:flex-row items-center justify-between 
        px-3 xs:px-4 sm:px-6 md:px-12 lg:px-20 2xl:px-32 
        py-6 xs:py-8 sm:py-10 md:py-16 mx-2 sm:mx-4 md:mx-8 lg:mx-12 xl:mx-18 2xl:mx-18 relative overflow-hidden"
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
            Explore Fresh & Juicy Fruits
          </h1>
          <p
            className="text-white/80 text-xs xs:text-sm sm:text-base max-w-md mx-auto md:mx-0"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Pick from our premium organic fruits and healthy grocery collection.
          </p>
        </motion.div>

        <motion.div
          variants={fadeZoomIn}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-10 mt-8 md:mt-0 w-full md:w-1/2 flex justify-center"
        >
          <div className="relative w-[220px] xs:w-[300px] sm:w-[400px] md:w-[500px] lg:w-[550px] 2xl:w-[650px] h-40 xs:h-[220px] sm:h-[280px] md:h-[340px] lg:h-[380px] 2xl:h-[420px]">
            <Image
              src="/images/fruitshero.png"
              alt="Fruit Hero"
              fill
              className="object-contain rounded-2xl"
              priority
            />
          </div>
        </motion.div>
      </motion.section>

      {/* 🛍️ Fruits Grid */}
      <section className="px-3 xs:px-4 sm:px-6 md:px-12 lg:px-20 2xl:px-32 py-10 select-none">
        <h2
          className="text-xl xs:text-2xl sm:text-3xl font-bold text-gray-800 text-center sm:text-left mb-6"
          style={{ fontFamily: "var(--font-fredoka)" }}
        >
          Featured Fruits
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
       {fruits.map((fruit, index) => {
  const quantity = getQuantity(fruit.id);
  return (
    <motion.div
      key={fruit.id}
      variants={fadeZoomIn}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="bg-white select-none rounded-t-xl rounded-b-[10%] 
                 hover:shadow-md transition flex flex-col items-center justify-between 
                 pb-4 sm:pb-6 pt-4 h-[300px] xs:h-[320px] sm:h-[360px] md:h-[380px] w-full"
      style={{ clipPath: "ellipse(150% 97% at 50% 0%)" }}
    >
      {/* Product Image with Link */}
      <Link href={`/product/${fruit.id}`} className="relative w-full flex justify-center items-center cursor-pointer h-[130px] xs:h-[150px] sm:h-[180px]">
        <Image
          src={fruit.image}
          alt={fruit.title}
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
          title={fruit.title}
        >
          {fruit.title}
        </h3>
        <p
          className="text-gray-500 text-center mb-1 capitalize text-xs sm:text-sm"
          style={{ fontFamily: "var(--font-fredoka)" }}
        >
          {fruit.category}
        </p>
        <span
          className="text-lg xs:text-xl sm:text-2xl font-bold text-gray-800 mb-2"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          ${fruit.price}
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
              onClick={() => handleAdd(fruit)}
              style={{ clipPath: "ellipse(130% 90% at 50% 0%)" }}
              className="cursor-pointer bg-[#F0F4EA] 
                         px-8 xs:px-10 sm:px-12 md:px-16 py-2 hover:bg-gray-200 
                         transition-colors rounded-lg flex items-center justify-center font-semibold text-gray-700 text-xs xs:text-sm sm:text-base"
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
                         px-4 xs:px-6 sm:px-8 py-2 flex items-center justify-center gap-2 xs:gap-3 sm:gap-4 rounded-lg"
            >
              <button onClick={() => handleDecrease(fruit.id)}>
                <Minus />
              </button>
              <span className="font-semibold">{quantity}</span>
              <button onClick={() => handleIncrease(fruit.id)}>
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
