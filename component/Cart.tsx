"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2 } from "lucide-react";
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
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-50 shadow-2xl flex flex-col rounded-l-3xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b bg-[#074E46] text-white">
              <h2
                className="text-xl font-bold"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                Your Cart
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/10 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cartItems.length === 0 ? (
                <p className="text-center text-gray-500 mt-20">
                  Your cart is empty 🛒
                </p>
              ) : (
                cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-between bg-gray-50 rounded-xl p-3"
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        width={60}
                        height={60}
                        className="rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-800 text-sm">
                          {item.title}
                        </h3>
                        <p className="text-gray-500 text-xs">
                          ${item.price} × {item.quantity}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => dispatch(decreaseQty(item.id))}
                          className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span className="text-gray-700 font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => dispatch(increaseQty(item.id))}
                          className="px-2 py-1 bg-[#C7F464] text-[#074E46] rounded-md hover:bg-[#b9ec5d]"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        className="text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-5 border-t bg-white shadow-inner">
              <div className="flex justify-between mb-4 text-lg font-semibold text-gray-800">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="w-full bg-[#074E46] text-white py-3 rounded-lg font-semibold hover:bg-[#0a5a4f] transition"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                Checkout →
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
