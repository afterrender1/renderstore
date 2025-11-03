"use client";

import React, { useEffect } from "react";
import Link from "next/link";

// Simple confetti function
const triggerConfetti = () => {
  const colors = ["#BBF7D0", "#34D399", "#22C55E", "#10B981", "#047857"];
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.animationDuration = Math.random() * 2 + 3 + "s";
    confetti.style.width = confetti.style.height = Math.random() * 10 + 5 + "px";
    document.body.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 5000);
  }
};

const SuccessPage = () => {
  useEffect(() => {
    triggerConfetti();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 relative overflow-hidden">
      <div className="max-w-md w-full bg-white p-10 rounded-2xl shadow-md text-center">
        <svg
          className="mx-auto mb-6 w-16 h-16 text-green-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
          Payment Successful!
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been confirmed.
        </p>

        <Link href="/">
          <button className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition">
            Continue Shopping
          </button>
        </Link>
      </div>

      {/* Confetti CSS */}
      <style>{`
        .confetti {
          position: fixed;
          top: 0;
          z-index: 9999;
          opacity: 0.8;
          border-radius: 50%;
          animation: confetti-fall linear forwards;
        }
        @keyframes confetti-fall {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(100vh) rotate(720deg); }
        }
      `}</style>
    </div>
  );
};

export default SuccessPage;
