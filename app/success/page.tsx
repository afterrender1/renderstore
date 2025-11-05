"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Package, Truck, Home, ShoppingBag, Sparkles } from "lucide-react";

// Enhanced confetti function
const triggerConfetti = () => {
  const colors = ["#10B981", "#34D399", "#6EE7B7", "#A7F3D0", "#D1FAE5", "#FBBF24", "#F59E0B"];
  for (let i = 0; i < 150; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.animationDuration = Math.random() * 3 + 2 + "s";
    confetti.style.animationDelay = Math.random() * 0.5 + "s";
    const size = Math.random() * 12 + 4;
    confetti.style.width = size + "px";
    confetti.style.height = size + "px";
    document.body.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 6000);
  }
};

const SuccessPage = () => {
  const [orderNumber] = useState(() => Math.floor(Math.random() * 900000) + 100000);

  useEffect(() => {
    triggerConfetti();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-10 left-1/2 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-2xl w-full bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-2xl text-center relative z-10 border border-white/20"
      >
        {/* Success Icon with Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="relative mx-auto mb-6 w-24 h-24"
        >
          <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping"></div>
          <div className="relative bg-gradient-to-br from-green-400 to-emerald-600 rounded-full w-24 h-24 flex items-center justify-center shadow-lg">
            <CheckCircle2 className="w-14 h-14 text-white" strokeWidth={2.5} />
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute -top-2 -right-2"
          >
            <Sparkles className="w-8 h-8 text-yellow-400 fill-yellow-400" />
          </motion.div>
        </motion.div>

        {/* Success Message */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3"
        >
          Payment Successful!
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 text-lg mb-2"
        >
          Thank you for your purchase! Your order has been confirmed.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-8"
        >
          Order #{orderNumber}
        </motion.div>

        {/* Order Timeline */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          <TimelineStep icon={<Package />} label="Order Placed" active />
          <TimelineStep icon={<ShoppingBag />} label="Processing" />
          <TimelineStep icon={<Truck />} label="On the way" />
        </motion.div>

        {/* Info Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 mb-8 border border-green-100"
        >
          <p className="text-gray-700 text-sm mb-2">
            <strong>What's next?</strong>
          </p>
          <p className="text-gray-600 text-sm">
            We've sent a confirmation email with order details. Your items will be shipped within 2-3 business days.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/" className="flex-1">
            <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-2">
              <Home size={20} />
              Back to Home
            </button>
          </Link>
          <Link href="/orders" className="flex-1">
            <button className="w-full bg-white text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-50 transition border-2 border-gray-200 hover:border-gray-300 transform hover:scale-[1.02] flex items-center justify-center gap-2">
              <Package size={20} />
              Track Order
            </button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Enhanced Confetti CSS */}
      <style>{`
        .confetti {
          position: fixed;
          top: -10px;
          z-index: 9999;
          opacity: 0.9;
          border-radius: 50%;
          animation: confetti-fall linear forwards;
          pointer-events: none;
        }
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

const TimelineStep = ({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) => (
  <div className="flex flex-col items-center gap-2">
    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
      active 
        ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg" 
        : "bg-gray-100 text-gray-400"
    }`}>
      {icon}
    </div>
    <span className={`text-xs font-medium ${active ? "text-green-600" : "text-gray-400"}`}>
      {label}
    </span>
  </div>
);

export default SuccessPage;