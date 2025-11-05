"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Package, Truck, Home, ShoppingBag } from "lucide-react";
import { useDispatch, UseDispatch } from "react-redux";
import {clearCart} from "@/app/redux/CartSlice"

/**
 * Clean, classic Success page — simplified UI, minimal animation, accessible
 */




const TimelineStep = ({
  label,
  active = false,
  icon,
}: {
  label: string;
  active?: boolean;
  icon: React.ReactNode;
}) => (
  <div className="flex flex-col items-center gap-2">
    <div
      aria-hidden
      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
        active ? "bg-[#074E46] text-white shadow" : "bg-slate-100 text-slate-400"
      }`}
    >
      {icon}
    </div>
    <span className={`text-xs ${active ? "text-slate-800 font-medium" : "text-slate-500"}`}>{label}</span>
  </div>
);

export default function SuccessPage() {
  const [orderNumber] = useState(() => Math.floor(Math.random() * 900000) + 100000);
  const [step, setStep] = useState<number>(1);
  const dispatch = useDispatch()

  // subtle simulated progress: move from placed -> processing -> shipping
  useEffect(() => {
    const t1 = setTimeout(() => setStep(2), 1200);
    const t2 = setTimeout(() => setStep(3), 3200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
 dispatch(clearCart())
}, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <motion.main
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32 }}
        className="w-full max-w-2xl bg-white rounded-2xl shadow-md border border-slate-100 p-8"
        role="main"
        aria-labelledby="success-heading"
      >
        {/* icon + heading */}
        <div className="flex items-center gap-4">
          <div className="shrink-0">
            <div className="w-16 h-16 rounded-full bg-[#074E46] text-white flex items-center justify-center shadow">
              <CheckCircle2 className="w-8 h-8" strokeWidth={2.2} />
            </div>
          </div>

          <div>
            <h1 id="success-heading" className="text-2xl font-semibold text-slate-900">
              Payment Successful
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Thank you — your order has been confirmed.
            </p>
            <div className="mt-2 inline-flex items-center gap-2 bg-slate-100 text-slate-800 text-sm px-3 py-1 rounded-full">
              <strong>Order</strong>
              <span className="font-mono text-sm">#{orderNumber}</span>
            </div>
          </div>
        </div>

        {/* subtle divider */}
        <div className="my-6 border-t border-slate-100" />

        {/* timeline / progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <TimelineStep icon={<Package size={18} />} label="Placed" active={step >= 1} />
            <div className="flex-1 h-0.5 mx-3 bg-slate-100 relative">
              <div
                className="h-0.5 bg-[#074E46] transition-all"
                style={{ width: `${Math.min(100, ((step - 1) / 2) * 100)}%` }}
                aria-hidden
              />
            </div>
            <TimelineStep icon={<ShoppingBag size={18} />} label="Processing" active={step >= 2} />
            <div className="flex-1 h-0.5 mx-3 bg-slate-100 relative">
              <div
                className="h-0.5 bg-[#074E46] transition-all"
                style={{ width: `${Math.min(100, ((step - 2) / 1) * 100)}%` }}
                aria-hidden
              />
            </div>
            <TimelineStep icon={<Truck size={18} />} label="On the way" active={step >= 3} />
          </div>
          <p className="mt-3 text-sm text-slate-500">
            We'll send tracking details to your email when the order ships. Typical dispatch: <strong>2–3 business days</strong>.
          </p>
        </div>

        {/* info box */}
        <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 text-sm text-slate-700 mb-6">
          <p className="mb-1"><strong>Summary:</strong></p>
          <ul className="list-none text-slate-600 space-y-1">
            <li>Order number: <span className="font-mono">#{orderNumber}</span></li>
            <li>Payment status: <strong>Paid</strong></li>
            <li>Estimated shipping: 2–3 business days</li>
          </ul>
        </div>

        {/* actions */}
   {/* actions */}
<div className="flex flex-col sm:flex-row gap-3">
  <Link
    href="/"
    className="flex-1 inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-[#074E46] text-white font-medium hover:opacity-94 transition"
    aria-label="Back to Home"
  >
    <Home size={16} />
    Back to Home
  </Link>


</div>


        {/* footer note */}
        <p className="mt-4 text-xs text-slate-500">
          If you need help, reply to the confirmation email or contact support.
        </p>
      </motion.main>
    </div>
  );
}
