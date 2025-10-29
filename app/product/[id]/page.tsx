"use client";
import React, { useEffect, useState, JSX } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package,
  Tag,
  Truck,
  Star,
  Shield,
  RotateCcw,
  Ruler,
  Weight,
  Layers,
  ShoppingBag,
  Plus,
  Minus,
  LoaderCircle,
} from "lucide-react";
import Navbar from "@/component/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { addToCart, increaseQty, decreaseQty } from "@/app/redux/CartSlice";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  availabilityStatus: string;
  weight: number;
  dimensions: { width: number; height: number; depth: number };
  shippingInformation: string;
  warrantyInformation: string;
  returnPolicy: string;
  stock: number;
};

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartItem = cartItems.find((item) => item.id === Number(id));
  const quantity = cartItem ? cartItem.quantity : 0;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
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

  const increase = () => dispatch(increaseQty(Number(id)));
  const decrease = () => dispatch(decreaseQty(Number(id)));

  if (loading)
    return (
      <div className="flex text-2xl justify-center items-center h-screen font-bold text-gray-500">
        <LoaderCircle
          size={50}
          color="#074E46"
          className="animate-spin font-bold"
        />
        <span
          style={{ fontFamily: "var(--font-fredoka)" }}
          className="text-4xl text-[#074E46]"
        >
          Fetching Product
        </span>
      </div>
    );

  if (!product)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Product not found
      </div>
    );

  return (
    <>
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="min-h-screen bg-gray-50 pb-32 mt-4 px-6 md:px-16 lg:px-18 relative"
      >
        {/* Header Section */}
        <section
          style={{ clipPath: "ellipse(150% 100% at 80% 0%)" }}
          className="bg-[#074E46] text-white rounded-t-4xl flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-20 py-10 md:py-16 mb-10"
        >
          <div className="relative z-10 md:w-1/2 space-y-4">
            <h1
              className="text-3xl md:text-5xl font-extrabold leading-snug"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              {product.title}
            </h1>
            <p
              className="text-white/80 text-sm md:text-base max-w-md"
              style={{ fontFamily: "var(--font-fredoka)" }}
            >
              {product.description}
            </p>
            <p className="text-lg font-semibold mt-2 text-[#C7F464]">
              {product.availabilityStatus}
            </p>
          </div>

          <div className="relative z-10 mt-10 md:mt-0 md:w-1/2 flex justify-center">
            <Image
              src={product.thumbnail}
              alt={product.title}
              width={400}
              height={400}
              className="rounded-2xl object-contain bg-white p-4 shadow-lg"
            />
          </div>
        </section>

        {/* Product Details */}
        <div className="bg-white rounded-3xl shadow-md p-8 md:p-12 max-w-5xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h2
                className="text-3xl font-bold text-gray-800"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                ${product.price}
                <span className="text-base text-gray-500 font-normal ml-2">
                  (-{product.discountPercentage}%)
                </span>
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <Star color="#FACC15" fill="#FACC15" size={20} />
              <span className="text-gray-700 font-medium">
                {product.rating.toFixed(1)} / 5
              </span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700">
            <Detail icon={<Tag />} label="Brand" value={product.brand} />
            <Detail icon={<Layers />} label="Category" value={product.category} />
            <Detail
              icon={<Truck />}
              label="Shipping"
              value={product.shippingInformation}
            />
            <Detail
              icon={<Shield />}
              label="Warranty"
              value={product.warrantyInformation}
            />
            <Detail
              icon={<RotateCcw />}
              label="Return Policy"
              value={product.returnPolicy}
            />
            <Detail
              icon={<Package />}
              label="Stock"
              value={`${product.stock} items`}
            />
            <Detail
              icon={<Weight />}
              label="Weight"
              value={`${product.weight} kg`}
            />
            <Detail
              icon={<Ruler />}
              label="Dimensions"
              value={`${product.dimensions.width}×${product.dimensions.height}×${product.dimensions.depth} cm`}
            />
          </div>
        </div>

        {/* Floating Cart Controls */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-0 left-0 w-full bg-white border-t-2 border-gray-300 shadow-xl py-5 md:px-16 flex justify-center gap-10 items-center z-10"
        >
          <div className="flex items-center gap-4">
            <AnimatePresence mode="wait">
              {quantity === 0 ? (
                <motion.button
                  key="add"
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  onClick={handleAddToCart}
                  className="bg-[#C7F464] hover:bg-[#b9ec5d] text-[#074E46] px-8 py-3 rounded-xl font-semibold flex items-center gap-2"
                >
                  <ShoppingBag size={20} /> Add to Cart
                </motion.button>
              ) : (
                <motion.div
                  key="counter"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="flex items-center gap-3 bg-[#F0F4EA] px-5 py-3 rounded-xl"
                >
                  <button
                    onClick={decrease}
                    className="bg-[#074E46] text-white rounded-full p-2"
                  >
                    <Minus size={16} />
                  </button>
                  <motion.span
                    key={quantity}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="font-semibold text-gray-700 text-lg w-6 text-center"
                  >
                    {quantity}
                  </motion.span>
                  <button
                    onClick={increase}
                    className="bg-[#074E46] text-white rounded-full p-2"
                  >
                    <Plus size={16} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className="bg-[#074E46] hover:bg-[#063d38] text-white px-8 py-3 rounded-xl font-semibold"
          >
            Buy Now
          </motion.button>
        </motion.div>
      </motion.div>
    </>
  );
}

const Detail = ({
  icon,
  label,
  value,
}: {
  icon: JSX.Element;
  label: string;
  value: string | number;
}) => (
  <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition">
    <span className="text-[#074E46] mt-1">{icon}</span>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  </div>
);
