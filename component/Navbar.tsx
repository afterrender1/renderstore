"use client";

import { motion } from "framer-motion";
import { Menu, Search, ShoppingCart, BaggageClaim, Zap } from "lucide-react";
import Cart from "./Cart";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import Sidebar from "./SideBar";
import SearchBar from "./SearchBar";

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cartCount = isMounted ? cartItems.length : 0;

  return (
    <motion.header
      initial={{ opacity: 0, scale: 0.9, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="
        bg-[#074E46] select-none mt-4 mx-2 sm:mx-4 md:mx-8 
        lg:mx-12 xl:mx-18 text-white 
        py-3 sm:py-4 px-4 sm:px-6 md:px-8 
        rounded-xl shadow-md 
        flex flex-col md:flex-row items-center md:justify-between gap-3 md:gap-4
      "
    >
      {/* 🔹 Top Row: Logo + Menu + Cart (mobile layout) */}
      <div className="w-full flex items-center justify-between md:w-auto">
        {/* Menu (mobile) */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 cursor-pointer hover:bg-white/10 rounded-full -shrink-0 "
        >
          <Menu size={22} />
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <BaggageClaim color="#BBEB75" className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className="text-base sm:text-lg font-semibold tracking-tight">
            RenderStore
          </span>
        </Link>

        {/* Cart (mobile) */}
        <div className="flex items-center gap-3 md:hidden">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsCartOpen(true)}
            className="relative bg-white text-black p-2 rounded-full shadow-md hover:bg-[#b2d16f] transition"
          >
            <ShoppingCart size={18} />
            <span className="absolute -top-1 -right-1 bg-[#074E46] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          </motion.button>
          <img
            src="https://i.pravatar.cc/40"
            alt="user"
            className="w-8 h-8 rounded-full border border-white"
          />
        </div>
      </div>

      {/* Sidebar Drawer */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* 🔹 Middle: Search Bar (full-width on mobile, centered on md+) */}
     {/* 🔹 Search Component */}
<div className="order-3 md:order-2 w-full md:w-[55%] lg:w-[40%]">
  <SearchBar />
</div>


      {/* 🔹 Right: Promo + Cart + Avatar (desktop only) */}
      <div
        className="
          hidden md:flex items-center gap-4 
          order-2 md:order-3
          w-full md:w-auto justify-end
        "
      >
        {/* Promo */}
        <p className="hidden lg:flex text-sm xl:text-base items-center gap-1 text-white/90">
          <Zap color="#BBEB75" size={18} />
          <span>Order now & get it in</span>
          <span className="text-yellow-300 font-semibold">15 min!</span>
        </p>

        {/* Cart */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsCartOpen(true)}
          className="relative cursor-pointer bg-white text-black p-3 rounded-full shadow-md hover:bg-[#b2d16f] transition"
        >
          <ShoppingCart size={20} />
          <span className="absolute -top-1 -right-1 bg-[#074E46] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {cartCount}
          </span>
        </motion.button>

        {/* Avatar */}
        <img  onClick={() => setIsSidebarOpen(true)}
          src="https://i.pravatar.cc/40"
          alt="user"
          className="w-9 cursor-pointer h-9 rounded-full border border-white object-cover"
        />
      </div>

      {/* Cart Drawer (global) */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </motion.header>
  );
}
