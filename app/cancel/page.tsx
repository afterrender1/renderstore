"use client";

import React from "react";
import Link from "next/link";

const CancelPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-md text-center">
        <svg
          className="mx-auto mb-6 w-16 h-16 text-red-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
          Payment Canceled
        </h1>

        <p className="text-gray-600 mb-6">
          Unfortunately, your payment was not completed. Please try again or continue shopping.
        </p>

        <Link href="/">
          <button className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition">
            Back to Shop
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CancelPage;
