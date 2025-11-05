"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import React, { useState } from "react";
import Navbar from "@/component/Navbar";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 2500);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-slate-50 flex flex-col items-center py-16 px-4 sm:px-6 md:px-12 lg:px-20 2xl:px-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl w-full bg-white shadow-md rounded-2xl border border-slate-100 p-8 sm:p-10"
        >
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
              Contact Us
            </h1>
            <p className="text-slate-600 max-w-lg mx-auto">
              Have a question, feedback, or partnership inquiry? We’d love to hear from you.
            </p>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left: Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-slate-50 border border-slate-100 rounded-xl p-6 sm:p-8 flex flex-col justify-center"
            >
              <h2 className="text-xl font-semibold text-[#074E46] mb-4">
                Get in touch
              </h2>
              <p className="text-slate-600 mb-6">
                Our support team is here to help you 7 days a week. Reach out to us anytime.
              </p>

              <ul className="space-y-4 text-slate-700">
                <li className="flex items-center gap-3">
                  <Mail className="text-[#074E46]" />
                  <span>support@renderstore.com</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="text-[#074E46]" />
                  <span>+1 (800) 555-0199</span>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="text-[#074E46]" />
                  <span>124 Greenway Plaza, Suite 230, San Francisco, CA</span>
                </li>
              </ul>
            </motion.div>

            {/* Right: Form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#074E46] transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#074E46] transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#074E46] transition resize-none"
                />
              </div>

              <motion.button
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={sent}
                className={`w-full flex items-center justify-center gap-2 bg-[#074E46] text-white font-semibold py-3 rounded-lg transition ${
                  sent ? "opacity-75 cursor-not-allowed" : "hover:bg-[#056B5A]"
                }`}
              >
                {sent ? (
                  "Message Sent!"
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </motion.button>
            </motion.form>
          </div>
        </motion.div>
      </section>
    </>
  );
}
