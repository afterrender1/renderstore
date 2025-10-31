"use client";

import { signOut, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/app/firebaseConfig";
import { motion, AnimatePresence } from "framer-motion";
import { User as UserIcon, ShoppingBag, Heart, Settings, LogOut, X } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import AuthModal from "@/app/auth/AuthModel";

export default function Sidebar({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // ✅ Watch Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // ✅ Automatically close AuthModal after login
  useEffect(() => {
    if (user) setShowAuthModal(false);
  }, [user]);

  // ✅ Logout logic
  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("User");
      setUser(null);
      alert("Logged out successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  const links = [
    { name: "Profile", icon: UserIcon, href: "/profile" },
    { name: "My Orders", icon: ShoppingBag, href: "/orders" },
    { name: "Wishlist", icon: Heart, href: "/wishlist" },
    { name: "Settings", icon: Settings, href: "/settings" },
  ];

  // ✅ Handle click for each menu link
  const handleLinkClick = (href: string) => {
    if (!user) {
      // Not logged in → show Auth modal
      setShowAuthModal(true);
    } else {
      // Logged in → navigate and close sidebar
      setIsOpen(false);
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
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black z-40"
          />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="fixed top-0 left-0 h-full w-full sm:w-[380px] bg-[#F4F6F6] z-50 shadow-2xl flex flex-col rounded-r-4xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b bg-[#074E46] text-white">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <UserIcon /> My Account
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-white/10"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* User Info */}
            {user ? (
              <div className="flex flex-col items-center py-6 bg-white shadow-sm border-b">
                <img
                  src={user.photoURL || "https://i.pravatar.cc/80"}
                  alt="User Avatar"
                  className="w-20 h-20 rounded-full border-4 border-[#BDEA6F]"
                />
                <h3 className="mt-3 font-semibold text-lg text-gray-800">
                  Hello, {user.displayName || user.email}
                </h3>
              </div>
            ) : (
              <div className="flex flex-col items-center py-6 bg-white shadow-sm border-b">
                <img
                  src="https://i.pravatar.cc/80"
                  alt="Guest Avatar"
                  className="w-20 h-20 rounded-full border-4 border-gray-300"
                />
                <h3 className="mt-3 font-semibold text-lg text-gray-800">
                  Welcome, Guest 👋
                </h3>
              </div>
            )}

            {/* Menu Links */}
            <div className="flex-1 overflow-y-auto">
              {links.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.href)}
                  className="flex items-center w-full text-left gap-3 px-6 py-4 bg-white hover:bg-[#BDEA6F] hover:text-[#074E46] border-b text-gray-800 transition"
                >
                  <link.icon size={22} />
                  {link.name}
                </button>
              ))}

              {/* ✅ Conditional Button */}
              {user ? (
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 px-6 py-4 bg-white hover:bg-red-100 text-red-600 border-t transition"
                >
                  <LogOut size={22} />
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="flex w-full items-center gap-3 px-6 py-4 bg-white hover:bg-[#BDEA6F] text-[#074E46] border-t transition font-semibold"
                >
                  <UserIcon size={22} />
                  Login / Sign Up
                </button>
              )}
            </div>
          </motion.aside>

          {/* 🟢 Auth Modal */}
          <AnimatePresence>
            {showAuthModal && <AuthModal />}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}
