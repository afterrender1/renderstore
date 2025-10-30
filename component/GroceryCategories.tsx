'use client';

import {
  Carrot,
  Cookie,
  Apple,
  Drumstick,
  Milk,
  ArrowRightCircle,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function GroceryCategories() {
  const categories = [
    {
      title: 'Vegetable',
      subtitle: 'Local market',
      icon: Carrot,
      color: 'text-green-600',
      image: '/images/vegetable.png',
    },
    {
      title: 'Snacks & Breads',
      subtitle: 'In store delivery',
      icon: Cookie,
      color: 'text-amber-700',
      image: '/images/snaks.png',
    },
    {
      title: 'Fruits',
      subtitle: 'Chemical free',
      icon: Apple,
      color: 'text-orange-600',
      image: '/images/fruits.png',
    },
    {
      title: 'Chicken legs',
      subtitle: 'Frozen meal',
      icon: Drumstick,
      color: 'text-blue-600',
      image: '/images/lags.png',
    },
    {
      title: 'Milk & Dairy',
      subtitle: 'Processed food',
      icon: Milk,
      color: 'text-yellow-600',
      image: '/images/milk.png',
    },
  ];

  // 🪄 Motion Variants for consistent zoom animation
  const fadeZoomIn = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ staggerChildren: 0.1 }}
      className="mx-40 py-7 select-none"
      style={{ fontFamily: 'var(--font-fredoka)' }}
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-6 items-stretch">
        {/* Category cards */}
        {categories.map((cat, index) => (
          <motion.div
            key={cat.title}
            variants={fadeZoomIn}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-between bg-white rounded-xl transition p-5 w-full cursor-pointer hover:shadow-md"
          >
            {/* Left text */}
            <div className="flex flex-col items-start whitespace-nowrap">
              <h3 className="text-base font-semibold text-gray-800 leading-tight">
                {cat.title}
              </h3>
              <p className="text-sm text-gray-700">{cat.subtitle}</p>
            </div>

            {/* Right image or icon */}
            <div className="flex items-end justify-center mt-2">
              {cat.image ? (
                <Image
                  src={cat.image}
                  alt={cat.title}
                  width={70}
                  height={70}
                  className="object-contain relative top-2"
                />
              ) : (
                <cat.icon className={`w-10 h-10 ${cat.color}`} />
              )}
            </div>
          </motion.div>
        ))}

        {/* See All Card */}
        <motion.div
          variants={fadeZoomIn}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
        >
          <Link
            href="/categories"
            className="flex flex-col items-center justify-center bg-[#BDEA6F] text-[#074E46] rounded-l-2xl hover:brightness-95 transition cursor-pointer py-6 h-full"
          >
            <div className="bg-white rounded-full flex items-center justify-center p-2 mb-2 shadow-sm">
              <ArrowRightCircle className="w-8 h-8" />
            </div>
            <span className="text-base font-semibold">See All</span>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
