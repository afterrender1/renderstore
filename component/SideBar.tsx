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
          {/* Sidebar */}
          <motion.aside
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -250, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 150,   // Faster spring
              damping: 18,      // Less bounce
              duration: 0.25,   // Quick entry
            }}
            className="fixed top-0 left-0 rounded-r-4xl h-full w-90 bg-[#074E46] text-white flex flex-col items-center shadow-lg z-40"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 p-2 cursor-pointer bg-white/10 hover:bg-white/20 rounded-full transition"
            >
              <X />
            </button>

            {/* User Info */}
            <div className="w-full flex flex-col items-center py-8 border-b border-white/10">
              <h3 className="font-semibold text-lg">Hello, Sam</h3>
              <p className="text-sm text-white/70">Welcome back 👋</p>
            </div>

            {/* Links */}
            <nav className="mt-8 w-full">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-3 px-6 py-3 hover:bg-[#C7F464] hover:text-[#074E46] transition-colors"
                >
                  <link.icon size={20} />
                  <span className="text-base font-medium">{link.name}</span>
                </Link>
              ))}
            </nav>

            {/* Footer */}
            <div className="mt-auto mb-6 text-xs text-white/60 text-center px-4">
              © {new Date().getFullYear()} RenderStore
            </div>
          </motion.aside>

          {/* Overlay (less blur, faster fade) */}
          <motion.div
            onClick={() => setIsOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}  // less dark + faster
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 z-30"
          />
        </>
      )}
    </AnimatePresence>
  );
}
