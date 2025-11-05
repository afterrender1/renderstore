"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setOpen(false);
      return;
    }

    setLoading(true);

    // Debounce: wait 400ms after user stops typing
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
        const data = await res.json();
        setResults(data.products.slice(0, 6)); // limit results
        setOpen(true);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 0);
  }, [query]);

  // Close dropdown when clicked outside
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full md:w-[90%] lg:w-full" ref={wrapperRef}>
      {/* Search Input */}
      <div
        className="
          bg-white text-gray-800 rounded-full
          px-3 py-2 flex items-center shadow-sm
          focus-within:ring-2 focus-within:ring-[#BBEB75]
          transition
        "
      >
        <input
          type="text"
          placeholder="Search for products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent text-sm sm:text-base outline-none px-2 placeholder-gray-500"
        />
        {loading ? (
          <Loader2 className="animate-spin text-gray-500" size={18} />
        ) : (
          <Search className="text-gray-500" size={18} />
        )}
      </div>

      {/* Dropdown Results */}
      <AnimatePresence>
        {open && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="absolute top-full left-0 w-full bg-white mt-2 rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50"
          >
            <ul className="divide-y divide-gray-100">
              {results.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`/product/${item.id}`}
                    onClick={() => {
                      setOpen(false);
                      setQuery("");
                    }}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 transition"
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-10 h-10 object-cover rounded-md border"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-500">${item.price}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* No results */}
        {open && !loading && results.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-white mt-2 rounded-xl shadow border border-gray-100 text-center py-3 text-sm text-gray-500 z-50"
          >
            No results found.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
