"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, BaggageClaim, Plus, Minus , LoaderCircle } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { increaseQty, decreaseQty, removeFromCart } from "@/app/redux/CartSlice";
import AuthModal from "@/app/auth/AuthModel";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/app/firebaseConfig";

type CartProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Cart({ isOpen, onClose }: CartProps) {
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const [loading , setLoading] = useState(false)

  // ✅ Firebase auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // ✅ Close auth modal when user logs in
  useEffect(() => {
    if (user) setShowAuthModal(false);
  }, [user]);

  // ✅ Checkout handler
  const handleCheckout = async () => {
        setLoading(true)
    
    if (!user) {
        setLoading(true)

      setShowAuthModal(true);
        setLoading(false)

      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const itemsForStripe = cartItems.map((item) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
    }));

    try {
      const res = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: itemsForStripe }),
      });

      const data = await res.json();

      if (data?.url) {
        window.location.href = data.url;
      } else {
        console.error("Checkout failed:", data);
        alert("Checkout failed. See console.");
      }
    } catch (err) {
      console.error("Error creating checkout session", err);
      alert("Something went wrong.");
    }
  };

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
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-[1px]"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="fixed top-0 right-0 h-full w-[95%] sm:w-[450px] md:w-[480px] bg-white z-50 shadow-2xl flex flex-col rounded-l-3xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-6 border-b bg-[#074E46] text-white">
              <h2
                className="text-2xl font-bold flex items-center gap-3"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                <BaggageClaim color="#BBEB75" /> Your Cart
              </h2>
              <button onClick={onClose} className="p-2 cursor-pointer rounded-full hover:bg-white/10 transition">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cartItems.length === 0 ? (
                <div className="text-gray-500 mt-20 text-lg flex flex-col justify-center items-center text-center">
                  <p className="text-3xl font-medium mb-4" style={{ fontFamily: "var(--font-fredoka)" }}>
                    Your cart is empty
                  </p>
                  <Image height={200} width={200} alt="Empty cart" src="/images/emptycart.png" className="mx-auto" />
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
                    className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 rounded-2xl p-4 shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex items-start gap-4">
                      <Image
                        src={item.thumbnail}
                        alt={item.title}
                        width={90}
                        height={90}
                        className="rounded-xl object-cover w-[90px] h-[90px]"
                      />
                      <div className="flex flex-col">
                        <h3 className="font-bold text-gray-800 text-base leading-tight">
                          {item.title.length > 30 ? item.title.slice(0, 12) + "..." : item.title}
                        </h3>
                        <p className="text-gray-500 text-sm mt-1 line-clamp-2 max-w-[220px]">
                          {item.description
                            ? item.description.length > 30
                              ? item.description.slice(0, 18) + "..."
                              : item.description
                            : "No description available."}
                        </p>
                        <p className="text-gray-800 mt-2 font-semibold text-base">
                          ${item.price} × {item.quantity}
                        </p>
                      </div>
                    </div>

                    {/* Qty + Remove */}
                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between gap-3 mt-3 sm:mt-0">
                      <motion.div
                        key="counter"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="bg-[#B9EC5D] px-6 py-2 flex items-center justify-center gap-4 rounded-lg shadow-sm"
                      >
                        <button onClick={() => dispatch(decreaseQty(item.id))} className="text-gray-700 hover:scale-110 transition">
                          <Minus size={18} />
                        </button>

                        <span className="text-gray-800 font-semibold min-w-5 text-center text-base">
                          {item.quantity}
                        </span>

                        <button onClick={() => dispatch(increaseQty(item.id))} className="text-gray-700 hover:scale-110 transition">
                          <Plus size={18} />
                        </button>
                      </motion.div>

                      <motion.button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        whileTap={{ scale: 0.9 }}
                        className="text-red-500 hover:text-red-600 text-sm flex items-center gap-1"
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
                onClick={handleCheckout}
                className="w-full bg-[#074E46] text-white flex justify-center cursor-pointer py-4 rounded-xl font-semibold text-lg hover:bg-[#0a5a4f] transition"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                Proceed to Checkout → {loading && <LoaderCircle className="animate-spin ml-2"/>}
              </motion.button>
            </div>
          </motion.div>

          {/* Auth Modal */}
          <AnimatePresence>
            {showAuthModal && <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}
