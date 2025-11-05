"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/component/Navbar";
import { Plus, Minus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { addToCart, increaseQty, decreaseQty } from "@/app/redux/CartSlice";
import Link from "next/link";

type Product = {
  id: string;
  title: string;
  image: string;
  price: number;
  category: string;
  description: string;
};

// ✅ Combine product arrays
const electronics: Product[] = [
  { id: "elec-1", title: "Wireless Headphones", image: "/images/electronics/wirelessheadphones.png", price: 59.99, category: "electronics", description: "Noise-cancelling wireless headphones with deep bass." },
  { id: "elec-2", title: "17 Pro Max", image: "/images/electronics/promax.png", price: 799.99, category: "electronics", description: "Next-gen smartphone with powerful performance and camera." },
  { id: "elec-3", title: "Bluetooth Speaker", image: "/images/electronics/speaker.png", price: 89.99, category: "electronics", description: "Portable waterproof speaker with crisp sound." },
  { id: "elec-4", title: "Smartwatch Ultra", image: "/images/electronics/smartwatch.png", price: 199.99, category: "electronics", description: "Advanced smartwatch with heart rate monitor and GPS." },
  { id: "elec-5", title: "Gaming Mouse", image: "/images/electronics/mouse.png", price: 49.99, category: "electronics", description: "Ergonomic RGB gaming mouse with adjustable DPI." },
  { id: "elec-6", title: "Mechanical Keyboard", image: "/images/electronics/keyboard.png", price: 119.99, category: "electronics", description: "RGB backlit mechanical keyboard with blue switches." },
  { id: "elec-7", title: "Laptop Stand", image: "/images/electronics/laptopstand.png", price: 34.99, category: "electronics", description: "Adjustable aluminum stand for laptops and tablets." },
  { id: "elec-8", title: "Power Bank 20000mAh", image: "/images/electronics/powerbank.png", price: 39.99, category: "electronics", description: "Fast-charging power bank for mobile and tablets." },
  { id: "elec-9", title: "HD Webcam", image: "/images/electronics/hdwebcam.png", price: 69.99, category: "electronics", description: "1080p webcam with built-in microphone for streaming." },
  { id: "elec-10", title: "Wireless Charger Pad", image: "/images/electronics/wirelesscharger.png", price: 24.99, category: "electronics", description: "Fast wireless charging pad compatible with all Qi devices." },
];

const fruits: Product[] = [
  { id: "fruit-1", title: "Fresh Mango", image: "/images/fruits/mango.png", price: 4.99, category: "groceries", description: "Juicy ripe mangoes packed with natural sweetness." },
  { id: "fruit-2", title: "Banana Bunch", image: "/images/fruits/banana.png", price: 3.29, category: "groceries", description: "Naturally sweet bananas perfect for breakfast and smoothies." },
  { id: "fruit-3", title: "Organic Apple", image: "/images/fruits/apple.png", price: 5.49, category: "groceries", description: "Crisp organic apples grown without synthetic fertilizers." },
  { id: "fruit-4", title: "Watermelon", image: "/images/fruits/watermelon.png", price: 9.99, category: "groceries", description: "Large, juicy watermelon perfect for hot days." },
  { id: "fruit-5", title: "Strawberries", image: "/images/fruits/straw.png", price: 6.49, category: "groceries", description: "Sweet, red strawberries full of vitamin C." },
  { id: "fruit-6", title: "Pineapple", image: "/images/fruits/pineapple.png", price: 7.99, category: "groceries", description: "Golden pineapples rich in tropical flavor." },
  { id: "fruit-7", title: "Blueberries", image: "/images/fruits/blueberry.png", price: 5.99, category: "groceries", description: "Fresh, antioxidant-rich blueberries." },
  { id: "fruit-8", title: "Oranges", image: "/images/fruits/orange.png", price: 4.49, category: "groceries", description: "Vitamin C-rich oranges, juicy and sweet." },
  { id: "fruit-9", title: "Grapes", image: "/images/fruits/grapes.png", price: 5.29, category: "groceries", description: "Seedless grapes with natural sweetness." },
  { id: "fruit-10", title: "Papaya", image: "/images/fruits/papaya.png", price: 6.79, category: "groceries", description: "Tropical papayas rich in vitamins A and C." },
];

const dailyProducts: Product[] = [
  { id: "daily-1", title: "Detergent Powder", image: "/images/dailyproducts/tide.png", price: 6.99, category: "daily products", description: "Powerful detergent for fresh and clean clothes." },
  { id: "daily-2", title: "Toothpaste", image: "/images/dailyproducts/colgate.png", price: 3.49, category: "daily products", description: "Fluoride toothpaste for strong and healthy teeth." },
  { id: "daily-3", title: "Bath Soap", image: "/images/dailyproducts/dove.png", price: 2.99, category: "daily products", description: "Refreshing bath soap with natural oils and fragrance." },
  { id: "daily-4", title: "Shampoo", image: "/images/dailyproducts/sunslik.png", price: 5.99, category: "daily products", description: "Gentle shampoo for soft and shiny hair." },
  { id: "daily-5", title: "Handwash", image: "/images/dailyproducts/handwash.png", price: 4.49, category: "daily products", description: "Antibacterial handwash for clean and germ-free hands." },
  { id: "daily-6", title: "Toilet Cleaner", image: "/images/dailyproducts/toilet.png", price: 7.99, category: "daily products", description: "Strong cleaning formula for sparkling toilets." },
  { id: "daily-7", title: "Dishwashing Liquid", image: "/images/dailyproducts/dishwashing.png", price: 5.29, category: "daily products", description: "Tough on grease, gentle on hands dishwashing liquid." },
  { id: "daily-8", title: "Paper Towels", image: "/images/dailyproducts/paper.png", price: 3.99, category: "daily products", description: "Highly absorbent paper towels for everyday cleaning." },
  { id: "daily-9", title: "Deodorant Spray", image: "/images/dailyproducts/spray.png", price: 6.49, category: "daily products", description: "Long-lasting fragrance to keep you fresh all day." },
  { id: "daily-10", title: "Laundry Softener", image: "/images/dailyproducts/laundry.png", price: 8.99, category: "daily products", description: "Gives clothes a soft feel and pleasant fragrance." },
];

const toys: Product[] = [
  { id: "toy-1", title: "Building Blocks Set", image: "/images/toys/blocks.png", price: 14.99, category: "toys", description: "Colorful interlocking building blocks to boost creativity." },
  { id: "toy-2", title: "Remote Control Car", image: "/images/toys/remotecontrolcar.png", price: 29.99, category: "electronics", description: "High-speed RC car with rechargeable battery." },
  { id: "toy-3", title: "Teddy Bear", image: "/images/toys/bear.png", price: 18.49, category: "soft toys", description: "Soft, cuddly teddy bear that brings comfort to kids." },
  { id: "toy-4", title: "LEGO Classic Kit", image: "/images/toys/kit.png", price: 39.99, category: "construction", description: "Classic LEGO set for endless building fun." },
  { id: "toy-5", title: "Toy Train Set", image: "/images/toys/trainset.png", price: 24.99, category: "vehicles", description: "Electric train set with lights and realistic sounds." },
  { id: "toy-6", title: "Action Figure Hero", image: "/images/toys/hero.png", price: 12.99, category: "collectibles", description: "Detailed superhero action figure with poseable limbs." },
  { id: "toy-7", title: "Doll House", image: "/images/toys/dollhouse.png", price: 49.99, category: "role play", description: "Beautiful wooden dollhouse with mini dolls." },
  { id: "toy-8", title: "Puzzle Set 1000 Pieces", image: "/images/toys/puzzleset.png", price: 15.99, category: "puzzles", description: "Challenging 1000-piece puzzle for all ages." },
  { id: "toy-9", title: "Stuffed Animal Dog", image: "/images/toys/dog.png", price: 17.99, category: "soft toys", description: "Adorable stuffed puppy made of soft plush fabric." },
  { id: "toy-10", title: "Kids Musical Keyboard", image: "/images/toys/kidskeyboard.png", price: 34.99, category: "music", description: "Interactive mini piano keyboard for kids." },
];

const allProducts: Product[] = [...electronics, ...fruits, ...dailyProducts, ...toys];

export default function AllProductsPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const getQuantity = (id: string) => {
    // @ts-ignore
    const item = cartItems.find((item) => item.id === id);
    return item ? item.quantity : 0;
  };

  const handleAdd = (product: Product) => {
    // @ts-ignore
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.image,
      description: product.description,
    }));
  };

  const handleIncrease = (id: string) => dispatch(increaseQty(id));
  const handleDecrease = (id: string) => dispatch(decreaseQty(id));

  const fadeZoomIn = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0 },
  };

  return (
    <>
      <Navbar />

      {/* Header Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeZoomIn}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-[#074E46] mt-5 text-white rounded-t-4xl mx-2 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32 2xl:mx-48 flex flex-col items-center justify-center px-4 sm:px-6 py-10"
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-fredoka">All Products</h1>
        <p className="text-white/80 mt-3 font-fredoka text-center max-w-2xl text-sm sm:text-base md:text-lg">
          Explore all categories in one place — electronics, fruits, toys, and daily essentials.
        </p>
      </motion.section>

      {/* Products Grid */}
      <section className="px-3 sm:px-6 md:px-10 lg:px-16 xl:px-24 2xl:px-32 py-10">
        <div
          className="
            grid gap-4 sm:gap-6 md:gap-8 
            grid-cols-2 
            sm:grid-cols-3 
            md:grid-cols-4 
            lg:grid-cols-5 
            xl:grid-cols-5
            2xl:grid-cols-5 
            3xl:grid-cols-7
          "
        >
          {allProducts.map((product, index) => {
            const quantity = getQuantity(product.id);
            return (
              <motion.div
                key={product.id}
                variants={fadeZoomIn}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-white select-none rounded-t-xl rounded-b-[10%] hover:shadow-lg transition flex flex-col items-center justify-between 
                  pb-4 sm:pb-5 pt-4 h-[300px] xs:h-[300px] sm:h-[340px] md:h-[360px] lg:h-[380px] xl:h-[400px]"
                style={{ clipPath: 'ellipse(150% 97% at 50% 0%)' }}
              >
                {/* Product Image */}
                <div className="relative w-full flex justify-center items-center h-[150px] sm:h-[180px] md:h-[200px]">
                  <Link
                  
                                    href={`/product/${product.id}`}
>
                  
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={180}
                    height={180}
                    className="object-contain rounded-xl"
                  />
                  </Link>

                </div>

                {/* Product Info */}
                <div className="flex flex-col items-center justify-between h-[120px]">
                  <h3 className="text-center font-semibold text-gray-800 text-sm sm:text-base md:text-lg mb-1 truncate w-[90%]">
                    {product.title}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm capitalize">{product.category}</p>
                  <span className="text-lg sm:text-xl font-bold text-gray-800 mb-2">${product.price}</span>
                </div>

                {/* Add to Cart / Counter */}
                <div className="flex justify-center  w-full">
                  <AnimatePresence mode="wait">
                    {quantity === 0 ? (
                      <motion.button
                        key="add"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAdd(product);
                        }}
                        style={{ clipPath: "ellipse(130% 90% at 50% 0%)" }}
                        className="cursor-pointer bg-[#F0F4EA] px-6 sm:px-8 md:px-10 lg:px-12 py-2 hover:bg-gray-200 
                          transition-colors rounded-lg flex items-center justify-center font-semibold text-gray-700 text-xs sm:text-sm md:text-base"
                      >
                        <Plus />
                      </motion.button>
                    ) : (
                      <motion.div
                        key="counter"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ clipPath: "ellipse(130% 90% at 50% 0%)" }}
                        className="cursor-pointer bg-[#B9EC5D] px-4 sm:px-6 md:px-8 py-2 flex items-center justify-center gap-2 sm:gap-3 rounded-lg"
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDecrease(product.id);
                          }}
                          className="text-gray-700 font-bold hover:scale-110 transition"
                        >
                          <Minus />
                        </button>
                        <span className="text-gray-800 font-semibold text-xs sm:text-sm md:text-base">{quantity}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleIncrease(product.id);
                          }}
                          className="text-gray-700 font-bold hover:scale-110 transition"
                        >
                          <Plus />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </>
  );
}
