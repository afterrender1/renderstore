"use client";
import React, { JSX, useEffect, useState } from "react";
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
  id: string | number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating?: { rate: number; count: number };
};

export default function WearProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartItem = cartItems.find((item) => item.id.toString() === id?.toString());
  const quantity = cartItem ? cartItem.quantity : 0;

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        // ✅ Fetch all products
        const response = await fetch("https://fakestoreapi.com/products");
        const data: Product[] = await response.json();

        // ✅ Find product by ID from API
        const found = data.find((p) => p.id.toString() === id?.toString());
        if (found) {
          setProduct(found);
        } else {
          setProduct(null);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setProduct(null);
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
        thumbnail: product.image,
        description: product.description,
      })
    );
  };

  //@ts-ignore
  const increase = () => dispatch(increaseQty(id!));
  //@ts-ignore
  const decrease = () => dispatch(decreaseQty(id!));

  if (loading)
    return (
      <div className="flex flex-col gap-4 justify-center items-center h-screen font-bold text-gray-500 text-center p-4">
        <LoaderCircle size={50} color="#074E46" className="animate-spin" />
        <span className="text-2xl sm:text-4xl text-[#074E46]">
          Loading Product...
        </span>
      </div>
    );

  if (!product)
    return (
      <div className="flex justify-center items-center h-screen text-red-500 font-semibold">
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
        className="min-h-screen bg-gray-50 pb-32 mt-4 px-3 sm:px-6 md:px-12 lg:px-16 xl:px-24 relative"
      >
        {/* Header */}
        <section
          className="bg-[#074E46] text-white rounded-t-4xl flex flex-col-reverse md:flex-row items-center justify-between px-8 py-10 mb-10"
          style={{ clipPath: "ellipse(150% 100% at 80% 0%)" }}
        >
          <div className="w-full md:w-1/2 space-y-4 text-center md:text-left">
            <h1 className="text-5xl font-extrabold">{product.title}</h1>
            <p className="text-white/80">{product.description}</p>
            <p className="text-[#C7F464] font-semibold mt-2">
              {product.category.toUpperCase()}
            </p>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <Image
              src={product.image}
              alt={product.title}
              width={400}
              height={400}
              className="rounded-2xl object-contain bg-white p-4 shadow-lg"
            />
          </div>
        </section>

        {/* Details */}
        <div className="bg-white rounded-3xl shadow-md p-10 max-w-6xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold">${product.price}</h2>
            {product.rating && (
              <div className="flex items-center gap-2">
                <Star color="#FACC15" fill="#FACC15" size={20} />
                <span>{product.rating.rate.toFixed(1)} / 5</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            <Detail icon={<Layers />} label="Category" value={product.category} />
            <Detail
              icon={<Package />}
              label="Stock"
              value={`${product.rating?.count ?? 0} items`}
            />
            <Detail
              icon={<Truck />}
              label="Shipping"
              value="Ships within 2-3 days"
            />
            <Detail
              icon={<Shield />}
              label="Warranty"
              value="1 year limited warranty"
            />
            <Detail
              icon={<RotateCcw />}
              label="Return Policy"
              value="7-day return available"
            />
            <Detail
              icon={<Weight />}
              label="Weight"
              value="1.2 kg (approx.)"
            />
          </div>
        </div>

        {/* Cart Controls */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="z-10 fixed bottom-0 left-0 w-full bg-white border-t-2 border-gray-300 shadow-xl py-4 px-8 flex justify-center items-center gap-4"
        >
          <AnimatePresence mode="wait">
            {quantity === 0 ? (
              <motion.button
                key="add"
                onClick={handleAddToCart}
                whileTap={{ scale: 0.95 }}
                className="bg-[#C7F464] hover:bg-[#b9ec5d] text-[#074E46] px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
              >
                <ShoppingBag size={20} /> Add to Cart
              </motion.button>
            ) : (
              <motion.div
                key="counter"
                className="flex items-center gap-3 bg-[#F0F4EA] px-4 py-3 rounded-xl"
              >
                <button
                  onClick={decrease}
                  className="bg-[#074E46] text-white rounded-full p-2"
                >
                  <Minus size={16} />
                </button>

                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={quantity}
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="font-semibold text-gray-700 w-6 text-center"
                  >
                    {quantity}
                  </motion.span>
                </AnimatePresence>

                <button
                  onClick={increase}
                  className="bg-[#074E46] text-white rounded-full p-2"
                >
                  <Plus size={16} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  );
}

/* 🧩 Detail Component */
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
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  </div>
);
