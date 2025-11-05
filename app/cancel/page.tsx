"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { XCircle, Home } from "lucide-react";

export default function CancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <motion.main
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-md border border-slate-100 p-8 text-center"
      >
        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 rounded-full bg-red-100 text-red-600 flex items-center justify-center shadow-sm">
            <XCircle className="w-9 h-9" strokeWidth={2.2} />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-semibold text-slate-900 mb-2">
          Payment Canceled
        </h1>
        <p className="text-slate-600 mb-6">
          Your payment was not completed. You can retry or return to the home
          page to continue shopping.
        </p>

        {/* Button */}
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition"
          aria-label="Back to Shop"
        >
          <Home size={16} />
          Back to Shop
        </Link>

        {/* Subtext */}
        <p className="mt-4 text-xs text-slate-500">
          If this was an error, no charges were made to your account.
        </p>
      </motion.main>
    </div>
  );
}
