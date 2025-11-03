"use client";
import Image from "next/image";
import GroceryCategories from "./GroceryCategories";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { addToCart, increaseQty, decreaseQty } from "@/app/redux/CartSlice";

type Product = {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
  category: string;
  description: string;
};

export default function Hero() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const getQuantity = (id: number) => {
    const item = cartItems.find((item) => item.id === id);
    return item ? item.quantity : 0;
  };

  const handleAdd = (product: Product) => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        description: product.description,
      })
    );
  };

  const handleIncrease = (id: number) => dispatch(increaseQty(id));
  const handleDecrease = (id: number) => dispatch(decreaseQty(id));

  const fadeZoomIn = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0 },
  };

  return (
    <>
      {/* 🛒 Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeZoomIn}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ clipPath: "ellipse(150% 90% at 50% 0%)" }}
        className="bg-[#074E46] select-none mt-5 text-white mx-2 sm:mx-4 md:mx-8 lg:mx-12 xl:mx-18 rounded-t-4xl flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 md:px-12 lg:px-20 py-8 sm:py-10 md:py-16 relative overflow-hidden"
      >
        {/* Left Text */}
        <motion.div
          variants={fadeZoomIn}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative z-10 w-full md:w-1/2 space-y-3 sm:space-y-4 text-center md:text-left"
        >
          <h1
            className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-extrabold leading-snug"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            We bring the store <br className="hidden sm:block" /> to your door
          </h1>
          <p
            className="text-white/80 text-xs sm:text-sm md:text-base max-w-md mx-auto md:mx-0"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            Get organic produce and sustainably sourced groceries delivered at up
            to <span className="font-semibold text-white">4% off grocery</span>.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ fontFamily: "var(--font-fredoka)" }}
            className="cursor-pointer bg-[#C7F464] text-[#074E46] px-5 sm:px-6 py-2 rounded-lg font-semibold hover:bg-[#b9ec5d] transition text-sm sm:text-base"
          >
            Shop now
          </motion.button>
        </motion.div>

        {/* Right Image */}
        <motion.div
          variants={fadeZoomIn}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative z-10 mt-6 sm:mt-8 md:mt-0 w-full md:w-1/2 flex justify-center"
        >
          <Image
            src="/images/mainhero.png"
            alt="Grocery bag"
            width={600}
            height={600}
            className="object-contain w-[80%] sm:w-[70%] md:w-[90%] xl:w-[80%]"
          />
        </motion.div>
      </motion.section>

      {/* 🥦 Grocery Categories */}
      <GroceryCategories />

      {/* 🧺 Product Cards */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-20 py-8 sm:py-10 select-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex justify-between items-center mb-4 sm:mb-6"
        >
          <h2
            className="text-2xl sm:text-3xl font-bold text-gray-800"
            style={{ fontFamily: "var(--font-fredoka)" }}
          >
            You might need
          </h2>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4 sm:gap-6">
          {loading ? (
            <div className="flex flex-col items-center col-span-full text-gray-600 text-lg min-h-[50vh] justify-center">
              <LoaderCircle
                size={60}
                className="animate-spin text-[#074E46]"
              />
              <p className="mt-4 text-xl sm:text-2xl font-bold text-[#074E46]">
                Loading...
              </p>
            </div>
          ) : (
            products.slice(0, 20).reverse().map((product, index) => {
              const quantity = getQuantity(product.id);
              return (
                <motion.div
                  key={product.id}
                  variants={fadeZoomIn}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg- rounded-t-xl rounded-b-[10%] hover:shadow-md transition flex flex-col items-center pb-5 sm:pb-6 w-full max-w-[200px] sm:max-w-none mx-auto"
                  style={{ clipPath: "ellipse(150% 97% at 50% 0%)" }}
                >
                  <Link
                    href={`/product/${product.id}`}
                    className="relative w-full flex justify-center items-start cursor-pointer"
                  >
                    <Image
                      src={product.thumbnail}
                      alt={product.title}
                      width={180}
                      height={180}
                      draggable={false}
                      className="object-contain rounded-xl"
                    />
                  </Link>

                  <h3
                    className="text-center font-semibold text-gray-800 text-xs sm:text-sm md:text-base mb-1 truncate px-1"
                    style={{ fontFamily: "var(--font-fredoka)" }}
                  >
                    {product.title.length > 30
                      ? product.title.slice(0, 20) + "..."
                      : product.title}
                  </h3>
                  <p
                    className="text-gray-500 text-center mb-1 capitalize text-xs sm:text-sm"
                    style={{ fontFamily: "var(--font-fredoka)" }}
                  >
                    {product.category}
                  </p>
                  <span
                    className="text-xl sm:text-2xl font-bold text-gray-800 mb-3"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    ${product.price}
                  </span>

                  {/* Add / Counter */}
                  <div className="flex justify-center w-full">
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
                          className="cursor-pointer bg-[#F0F4EA] px-8 sm:px-12 md:px-16 py-2 sm:py-3 hover:bg-gray-200 transition-colors rounded-lg flex items-center justify-center font-semibold text-gray-700"
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
                          className="cursor-pointer bg-[#B9EC5D] px-6 sm:px-10 py-2 sm:py-3 flex items-center justify-center gap-3 sm:gap-4 rounded-lg"
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDecrease(product.id);
                            }}
                            className="text-gray-700 font-bold text-sm sm:text-lg hover:scale-110 transition"
                          >
                            <Minus />
                          </button>
                          <span className="text-gray-800 font-semibold text-sm sm:text-base">
                            {quantity}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleIncrease(product.id);
                            }}
                            className="text-gray-700 font-bold text-sm sm:text-lg hover:scale-110 transition"
                          >
                            <Plus />
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </section>
    </>
  );
}
