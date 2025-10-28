'use client';

import {
  Carrot,
  Cookie,
  Apple,
  Drumstick,
  Milk,
} from 'lucide-react';
import Image from 'next/image';

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
    {
  title: 'Seafood',
  subtitle: 'Fresh from ocean',
  icon: Drumstick, 
  color: 'text-cyan-600',
  image: '/images/sea.png',
},


  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-6 mx-40 py-7" style={{ fontFamily: "var(--font-fredoka)" }}>
      {categories.map((cat) => (
        <div
          key={cat.title}
          className="flex items-center justify-between bg-white rounded-xl transition p-5 w-full cursor-pointer"
        >
          {/* Left text */}
          <div className="flex flex-col items-start whitespace-nowrap">
            <h3 className="text-base font-semibold text-gray-800 leading-tight">
              {cat.title}
            </h3>
            <p className="text-sm text-gray-700">{cat.subtitle}</p>
          </div>

          {/* Right image */}
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
        </div>
      ))}
    </div>
  );
}
