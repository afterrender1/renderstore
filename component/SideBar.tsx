"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  ShoppingBag,
  Heart,
  Settings,
  LogOut,
  X,
  
} from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Sidebar({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const links = [
    { name: "Profile", icon: User, href: "/profile" },
    { name: "My Orders", icon: ShoppingBag, href: "/orders" },
    { name: "Wishlist", icon: Heart, href: "/wishlist" },
    { name: "Settings", icon: Settings, href: "/settings" },
    { name: "Logout", icon: LogOut, href: "/logout" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background overlay (same as Cart) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black z-40"
          />

          {/* Sidebar Drawer */}
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="fixed top-0 left-0 h-full w-full sm:w-[380px] bg-[#F4F6F6] z-50 shadow-2xl flex flex-col rounded-r-4xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b bg-[#074E46] text-white">
              <h2
                className="text-2xl font-bold tracking-wide flex justify-center items-center gap-2"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                <User/> My Account
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 transition cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* User Info */}
            <div className="flex flex-col items-center py-6 bg-white shadow-sm border-b border-gray-100">
              <img
                src="https://i.pravatar.cc/80"
                alt="User Avatar"
                className="w-20 h-20 rounded-full border-4 border-[#BDEA6F] shadow-md"
              />
              <h3
                className="mt-3 font-semibold text-lg text-gray-800"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                Hello, Sam 👋
              </h3>
              <p className="text-sm text-gray-600">Welcome back!</p>
            </div>

            {/* Links (Scrollable section) */}
            <div className="flex-1 overflow custom-scrollbar bg-[#F4F6F6]">
              {links.map((link) => (
                <motion.div
                  key={link.name}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-3 px-6 py-4 bg-white hover:bg-[#BDEA6F] hover:text-[#074E46] text-gray-800 transition-colors border-b border-gray-100"
                  >
                    <link.icon size={22} />
                    <span className="text-base font-medium">{link.name}</span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-6 bg-[#F4F6F6] text-center text-xs text-gray-600 border-t">
              © {new Date().getFullYear()} RenderStore — All rights reserved.
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
