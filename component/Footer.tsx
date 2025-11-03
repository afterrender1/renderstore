"use client";

import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#074E46] text-white mt-10 relative overflow-hidden mx-5 rounded-t-4xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        {/* Logo & About */}
        <div className="space-y-4">
          <h2
            className="text-3xl font-extrabold"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            RenderStore
          </h2>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Your one-stop online grocery store delivering fresh and organic produce right to your door.  
            Fresh, healthy, and delivered fast.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="font-bold text-white text-xl">Quick Links</h3>
          <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
            <li>
              <Link href="/" className="hover:text-[#C7F464] transition-all">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-[#C7F464] transition-all">
                Products
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-[#C7F464] transition-all">
                Cart
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#C7F464] transition-all">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div className="space-y-4">
          <h3 className="font-bold text-white text-xl">Categories</h3>
          <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
            <li>
              <Link href="#" className="hover:text-[#C7F464] transition-all">
                Fruits
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#C7F464] transition-all">
                Vegetables
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#C7F464] transition-all">
                Dairy
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#C7F464] transition-all">
                Snacks
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-4">
          <h3 className="font-bold text-white text-xl">Contact Us</h3>
          <p className="flex items-center gap-2 text-gray-300 text-sm sm:text-base">
            <Mail size={16} /> support@renderstore.com
          </p>
          <p className="flex items-center gap-2 text-gray-300 text-sm sm:text-base">
            <Phone size={16} /> +1 234 567 890
          </p>
          <div className="flex items-center gap-4 mt-4 text-gray-300">
            <Link href="#" className="hover:text-[#C7F464] transition-all">
              <Facebook size={20} />
            </Link>
            <Link href="#" className="hover:text-[#C7F464] transition-all">
              <Instagram size={20} />
            </Link>
            <Link href="#" className="hover:text-[#C7F464] transition-all">
              <Twitter size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-green-200 text-center py-6 text-gray-300 text-sm sm:text-base">
        &copy; {new Date().getFullYear()} AfterRender. All rights reserved.
      </div>

      {/* Decorative Modern Background */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-20 bg-linear-to-t from-[#074E46] to-[#0a5a4f] rounded-t-[5rem]"></div>
    </footer>
  );
}
