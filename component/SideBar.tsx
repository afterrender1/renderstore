"use client";

import { signOut, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/app/firebaseConfig";
import { motion, AnimatePresence } from "framer-motion";
import {
  User as UserIcon,
  ShoppingBag,
  Heart,
  Settings,
  LogOut,
  X,
} from "lucide-react";
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) setShowAuthModal(false);
  }, [user]);

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

  const handleLinkClick = (href: string) => {
    if (!user) {
      setShowAuthModal(true);
    } else {
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
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-[1px]"
          />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 110, damping: 18 }}
            className="
              fixed top-0 left-0 h-full 
              w-[90%] sm:w-[380px] md:w-[420px] 
              bg-[#F4F6F6] z-50 shadow-2xl flex flex-col 
              rounded-r-3xl overflow-hidden
            "
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 sm:p-6 border-b bg-[#074E46] text-white">
              <h2 className="text-lg sm:text-2xl font-bold flex items-center gap-2">
                <UserIcon className="w-5 h-5 sm:w-6 sm:h-6" /> My Account
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-white/10"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* User Info */}
            <div className="flex flex-col items-center py-5 sm:py-6 bg-white shadow-sm border-b">
              <img
                src={
                  user?.photoURL ||
                  (user
                    ? "https://i.pravatar.cc/80"
                    : "https://i.pravatar.cc/80?img=12")
                }
                alt="User Avatar"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-[#BDEA6F] object-cover"
              />
              <h3 className="mt-3 font-semibold text-base sm:text-lg text-gray-800 text-center px-2">
                {user
                  ? `Hello, ${user.displayName || user.email}`
                  : "Welcome, Guest 👋"}
              </h3>
            </div>

            {/* Menu Links */}
            <div className="flex-1 overflow-y-auto">
              {links.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.href)}
                  className="
                    flex items-center w-full text-left gap-3 
                    px-5 sm:px-6 py-4 sm:py-4.5 
                    bg-white hover:bg-[#BDEA6F]/90 hover:text-[#074E46] 
                    border-b text-gray-800 transition-all text-sm sm:text-base
                  "
                >
                  <link.icon size={22} />
                  {link.name}
                </button>
              ))}

              {/* Auth / Logout */}
              {user ? (
                <button
                  onClick={handleLogout}
                  className="
                    flex w-full items-center gap-3 
                    px-5 sm:px-6 py-4 sm:py-4.5 
                    bg-white hover:bg-red-100 text-red-600 
                    border-t font-medium transition-all text-sm sm:text-base
                  "
                >
                  <LogOut size={22} />
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="
                    flex w-full items-center gap-3 
                    px-5 sm:px-6 py-4 sm:py-4.5 
                    bg-white hover:bg-[#BDEA6F]/90 text-[#074E46] 
                    border-t font-semibold transition-all text-sm sm:text-base
                  "
                >
                  <UserIcon size={22} />
                  Login / Sign Up
                </button>
              )}
            </div>
          </motion.aside>

          {/* Auth Modal */}
          <AnimatePresence>
            {showAuthModal && (
              <AuthModal
                isOpen={showAuthModal}
                onClose={() => setShowAuthModal(false)}
              />
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}
