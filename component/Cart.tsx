"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, BaggageClaim, Plus, Minus } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { increaseQty, decreaseQty, removeFromCart } from "@/app/redux/CartSlice";

type CartProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Cart({ isOpen, onClose }: CartProps) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white z-50 shadow-2xl flex flex-col rounded-l-4xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b bg-[#074E46] text-white">
              <h2
                className="text-2xl font-bold tracking-wide flex justify-center items-center gap-3"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                             <BaggageClaim color="#BBEB75" />
 Your Cart 
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 transition cursor-pointer"
              >
                <X className="w-7 h-7" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto scrollbar-hidden p-6 space-y-6">

              {cartItems.length === 0 ? (
          <div className="text-gray-500 mt-20 text-lg flex flex-col justify-center h-80">
  <div
    className="text-3xl flex justify-center font-medium"
    style={{ fontFamily: "var(--font-fredoka)" }}
  >
    Your cart is empty
  </div>

  <div className="flex justify-center items-center mt-4">
    <Image
      height={200}
      width={200}
      alt="Empty cart illustration"
      src="/images/emptycart.png"
    />
  </div>
</div>

              ) : (
                cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-between bg-gray-50 rounded-2xl p-4 shadow-sm hover:shadow-md transition "
                  >
                    <div className="flex items-start gap-4">
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        width={90}
                        height={90}
                        className="rounded-xl object-cover"
                      />
                      <div className="flex flex-col ">
                        <h3 className="font-bold text-gray-800 text-lg leading-tight">
                          {item.title}
                        </h3>
                        <p className="text-gray-500 text-sm mt-1 line-clamp-2 max-w-[200px]">
                          {item.description || "No description available."}
                        </p>
                        <p className="text-gray-800 mt-2 font-semibold text-base">
                          ${item.price} × {item.quantity}
                        </p>
                      </div>
                    </div>

<div className="flex flex-col items-end gap-3">
  <AnimatePresence mode="wait">
    <motion.div
      key="counter"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{ clipPath: "ellipse(130% 90% at 50% 0%)" }}
      className="cursor-pointer bg-[#B9EC5D] px-8 py-2 flex items-center justify-center gap-4 rounded-lg shadow-sm"
    >
      {/* Decrease */}
      <button
        onClick={() => dispatch(decreaseQty(item.id))}
        className="cursor-pointer text-gray-700 font-bold text-lg hover:scale-110 transition"
      >
        <Minus />
      </button>

      {/* Quantity */}
      <span className="text-gray-800 font-semibold min-w-6 text-center">
        {item.quantity}
      </span>

      {/* Increase */}
      <button
        onClick={() => dispatch(increaseQty(item.id))}
        className="cursor-pointer text-gray-700 font-bold text-lg hover:scale-110 transition"
      >
        <Plus />
      </button>
    </motion.div>
  </AnimatePresence>

  {/* Remove Button */}
  <motion.button
    onClick={() => dispatch(removeFromCart(item.id))}
    whileTap={{ scale: 0.9 }}
    className="cursor-pointer text-red-500 hover:text-red-600 text-sm flex items-center gap-1 mt-1"
  >
    <Trash2 className="w-4 h-4" /> Remove
  </motion.button>
</div>

                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t bg-white shadow-inner">
              <div className="flex justify-between mb-4 text-xl font-bold text-gray-800">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="w-full bg-[#074E46] text-white py-4 cursor-pointer rounded-xl font-semibold text-lg hover:bg-[#0a5a4f] transition"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                Proceed to Checkout →
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
