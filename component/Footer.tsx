"use client";

import React from "react";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();

  return (
    <footer className="relative bg-[#063D38] text-white mt-16 mx-4 sm:mx-6 md:mx-10 rounded-3xl overflow-hidden shadow-md">
      {/* Gradient Accent */}
      <div className="absolute inset-0 bg-linear-to-t from-[#063D38] to-[#0A5A4F] opacity-90"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-20 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h2
            className="text-3xl font-extrabold mb-3 tracking-tight"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            RenderStore
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
            Your trusted online store for premium, organic groceries and daily essentials.
            Freshly sourced and delivered straight to your door.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold text-[#C7F464] mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
            </li>
            <li>
              <Link href="/allproducts" className="hover:text-white transition-colors">Products</Link>
            </li>
            {/* <li>
              <Link href="/cart" className="hover:text-white transition-colors">Cart</Link>
            </li> */}
            <li
              className="cursor-pointer hover:text-white transition-colors"
              onClick={() => router.push("/contactus")}
            >
              Contact
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg font-semibold text-[#C7F464] mb-4">Shop Categories</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><Link href="#" className="hover:text-white transition-colors">Fruits</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Vegetables</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Dairy</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Snacks</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-[#C7F464] mb-4">Get in Touch</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={16} /> support@renderstore.com
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} /> +1 234 567 890
            </li>
          </ul>

          {/* Social Icons */}
          <div className="flex gap-4 mt-6">
            <Link href="#" className="hover:text-[#C7F464] transition-transform hover:scale-110">
              <Facebook size={20} />
            </Link>
            <Link href="#" className="hover:text-[#C7F464] transition-transform hover:scale-110">
              <Instagram size={20} />
            </Link>
            <Link href="#" className="hover:text-[#C7F464] transition-transform hover:scale-110">
              <Twitter size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* Divider Line */}
      <div className="border-t border-white/10"></div>

      {/* Bottom Bar */}
      <div className="relative z-10 text-center py-6 text-gray-300 text-sm tracking-wide">
        © {new Date().getFullYear()} <span className="font-semibold text-white">RenderStore</span>. All rights reserved.
      </div>
    </footer>
  );
}
