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
      title: 'Kids Toys',
      href: '/toys',
      subtitle: 'Local market',
      icon: Carrot,
      color: 'text-green-600',
      image: '/images/car.png',
    },
    {
      title: 'Daily Products',
      href: '/dailyproducts',
      subtitle: 'In store delivery',
      icon: Cookie,
      color: 'text-amber-700',
      image: '/images/daily.png',
    },
    {
      title: 'Fruits',
      href: '/fruits',
      subtitle: 'Chemical free',
      icon: Apple,
      color: 'text-orange-600',
      image: '/images/fruits.png',
    },
    {
      title: 'Electronics',
      href: '/electronics',
      subtitle: 'Tech products',
      icon: Drumstick,
      color: 'text-blue-600',
      image: '/images/electronics.png',
    },
    {
      title: 'Wearing',
      href: '/wearing',
      subtitle: 'Style, Clothes',
      icon: Milk,
      color: 'text-yellow-600',
      image: '/images/wearing.png',
    },
  ];

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
      className="mx-2 sm:mx-4 md:mx-10 lg:mx-20 xl:mx-32 2xl:mx-40 py-6 sm:py-8 select-none overflow-hidden"
      style={{ fontFamily: 'var(--font-fredoka)' }}
    >
      {/* Responsive grid container */}
      <div
        className="
          grid grid-cols-2 
          xs:grid-cols-2 
          sm:grid-cols-3 
          md:grid-cols-4 
          lg:grid-cols-5 
          xl:grid-cols-6 
          2xl:grid-cols-6
          gap-3 sm:gap-5 md:gap-6 
          items-stretch w-full
        "
      >
        {categories.map((cat, index) => (
          <Link key={index} href={cat.href ?? '#'}>
            <motion.div
              key={cat.title}
              variants={fadeZoomIn}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="
                flex items-center justify-between 
                bg-white rounded-xl transition-all 
                p-3 sm:p-4 md:p-5 lg:p-6 
                cursor-pointer 
                h-[110px] sm:h-[125px] md:h-[130px] lg:h-[140px]
                hover:shadow-md
              "
            >
              {/* Left side text */}
              <div className="flex flex-col items-start whitespace-nowrap overflow-hidden">
                <h3 className="text-sm sm:text-base font-semibold text-gray-800 leading-tight truncate">
                  {cat.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 truncate">
                  {cat.subtitle}
                </p>
              </div>

              {/* Right side image or icon */}
              <div className="flex items-end justify-center mt-1 sm:mt-2">
                {cat.image ? (
                  <div className="relative w-[50px] h-[50px] sm:w-[65px] sm:h-[65px] md:w-20 md:h-20 lg:w-[85px] lg:h-[85px]">
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 50px, (max-width: 768px) 65px, (max-width: 1024px) 80px, 85px"
                    />
                  </div>
                ) : (
                  <cat.icon className={`w-8 sm:w-10 h-8 sm:h-10 ${cat.color}`} />
                )}
              </div>
            </motion.div>
          </Link>
        ))}

        {/* "See All" Card */}
        <motion.div
          variants={fadeZoomIn}
          transition={{ duration: 0.6, delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          className="col-span-2 sm:col-span-1"
        >
          <Link
            href="/allproducts"
            className="flex flex-col items-center justify-center bg-[#BDEA6F] text-[#074E46] rounded-xl hover:brightness-95 transition cursor-pointer py-6 sm:py-7 h-full"
          >
            <div className="bg-white rounded-full flex items-center justify-center p-2 mb-2 shadow-sm">
              <ArrowRightCircle className="w-6 sm:w-8 h-6 sm:h-8" />
            </div>
            <span className="text-sm sm:text-base font-semibold">See All</span>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
