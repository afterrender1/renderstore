"use client";
import React, { useEffect, useState } from "react";
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

// Product type
type Product = {
  id: string | number;
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
  rating?: number;
  brand?: string;
  category: string;
  thumbnail: string;
  images?: string[];
  availabilityStatus?: string;
  weight?: number;
  dimensions?: { width: number; height: number; depth: number };
  shippingInformation?: string;
  warrantyInformation?: string;
  returnPolicy?: string;
  stock?: number;
};

// Static fruits
const fruits: Product[] = [
  {
    id: "fruit-1",
    title: "Fresh Mango",
    thumbnail: "/images/fruits/mango.png",
    price: 4.99,
    category: "fruits",
    description: "Juicy ripe mangoes packed with natural sweetness.",
    stock: 50,
    weight: 1,
    dimensions: { width: 10, height: 10, depth: 10 },
    availabilityStatus: "In Stock",
    shippingInformation: "Ships in 1-2 days",
    warrantyInformation: "N/A",
    returnPolicy: "7 days return",
    rating: 4.5,
    brand: "Organic Farm",
  },
  {
    id: "fruit-2",
    title: "Banana Bunch",
    thumbnail: "/images/fruits/banana.png",
    price: 3.29,
    category: "fruits",
    description: "Naturally sweet bananas perfect for breakfast and smoothies.",
    stock: 60,
    weight: 1,
    dimensions: { width: 15, height: 5, depth: 5 },
    availabilityStatus: "In Stock",
    shippingInformation: "Ships in 1-2 days",
    warrantyInformation: "N/A",
    returnPolicy: "7 days return",
    rating: 4.3,
    brand: "Organic Farm",
  },
  {
    id: "fruit-3",
    title: "Organic Apple",
    thumbnail: "/images/fruits/apple.png",
    price: 5.49,
    category: "fruits",
    description: "Crisp organic apples grown without synthetic fertilizers.",
    stock: 40,
    weight: 0.5,
    dimensions: { width: 8, height: 8, depth: 8 },
    availabilityStatus: "In Stock",
    shippingInformation: "Ships in 1-2 days",
    warrantyInformation: "N/A",
    returnPolicy: "7 days return",
    rating: 4.6,
    brand: "Organic Farm",
  },
  {
    id: "fruit-4",
    title: "Watermelon",
    thumbnail: "/images/fruits/watermelon.png",
    price: 9.99,
    category: "fruits",
    description: "Large, juicy watermelon perfect for hot days.",
    stock: 20,
    weight: 5,
    dimensions: { width: 25, height: 20, depth: 20 },
    availabilityStatus: "In Stock",
    shippingInformation: "Ships in 2-3 days",
    warrantyInformation: "N/A",
    returnPolicy: "7 days return",
    rating: 4.7,
    brand: "Tropical Farm",
  },
  {
    id: "fruit-5",
    title: "Strawberries",
    thumbnail: "/images/fruits/straw.png",
    price: 6.49,
    category: "fruits",
    description: "Sweet, red strawberries full of vitamin C.",
    stock: 35,
    weight: 0.3,
    dimensions: { width: 5, height: 5, depth: 5 },
    availabilityStatus: "In Stock",
    shippingInformation: "Ships in 1-2 days",
    warrantyInformation: "N/A",
    returnPolicy: "7 days return",
    rating: 4.8,
    brand: "Berry Farm",
  },
  {
    id: "fruit-6",
    title: "Pineapple",
    thumbnail: "/images/fruits/pineapple.png",
    price: 7.99,
    category: "fruits",
    description: "Golden pineapples rich in tropical flavor.",
    stock: 25,
    weight: 2,
    dimensions: { width: 15, height: 25, depth: 15 },
    availabilityStatus: "In Stock",
    shippingInformation: "Ships in 2-3 days",
    warrantyInformation: "N/A",
    returnPolicy: "7 days return",
    rating: 4.4,
    brand: "Tropical Farm",
  },
  {
    id: "fruit-7",
    title: "Blueberries",
    thumbnail: "/images/fruits/blueberry.png",
    price: 5.99,
    category: "fruits",
    description: "Fresh, antioxidant-rich blueberries.",
    stock: 50,
    weight: 0.2,
    dimensions: { width: 4, height: 4, depth: 4 },
    availabilityStatus: "In Stock",
    shippingInformation: "Ships in 1-2 days",
    warrantyInformation: "N/A",
    returnPolicy: "7 days return",
    rating: 4.5,
    brand: "Berry Farm",
  },
  {
    id: "fruit-8",
    title: "Oranges",
    thumbnail: "/images/fruits/orange.png",
    price: 4.49,
    category: "fruits",
    description: "Vitamin C-rich oranges, juicy and sweet.",
    stock: 45,
    weight: 0.6,
    dimensions: { width: 8, height: 8, depth: 8 },
    availabilityStatus: "In Stock",
    shippingInformation: "Ships in 1-2 days",
    warrantyInformation: "N/A",
    returnPolicy: "7 days return",
    rating: 4.6,
    brand: "Citrus Farm",
  },
  {
    id: "fruit-9",
    title: "Grapes",
    thumbnail: "/images/fruits/grapes.png",
    price: 5.29,
    category: "fruits",
    description: "Seedless grapes with natural sweetness.",
    stock: 55,
    weight: 0.4,
    dimensions: { width: 6, height: 6, depth: 6 },
    availabilityStatus: "In Stock",
    shippingInformation: "Ships in 1-2 days",
    warrantyInformation: "N/A",
    returnPolicy: "7 days return",
    rating: 4.7,
    brand: "Vineyard Farm",
  },
  {
    id: "fruit-10",
    title: "Papaya",
    thumbnail: "/images/fruits/papaya.png",
    price: 6.79,
    category: "fruits",
    description: "Tropical papayas rich in vitamins A and C.",
    stock: 30,
    weight: 2,
    dimensions: { width: 12, height: 25, depth: 12 },
    availabilityStatus: "In Stock",
    shippingInformation: "Ships in 2-3 days",
    warrantyInformation: "N/A",
    returnPolicy: "7 days return",
    rating: 4.5,
    brand: "Tropical Farm",
  },
];

export default function ProductPage() {
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
        const fruitProduct = fruits.find((f) => f.id.toString() === id?.toString());
        if (fruitProduct) {
          setProduct(fruitProduct);
        } else {
          const res = await fetch(`https://dummyjson.com/products/${id}`);
          const data = await res.json();
          setProduct({
            id: data.id,
            title: data.title,
            description: data.description,
            price: data.price,
            discountPercentage: data.discountPercentage,
            rating: data.rating,
            brand: data.brand,
            category: data.category,
            thumbnail: data.thumbnail,
            images: data.images,
            availabilityStatus: data.stock > 0 ? "In Stock" : "Out of Stock",
            stock: data.stock,
            weight: 1,
            dimensions: { width: 10, height: 10, depth: 10 },
            shippingInformation: "Ships in 1-3 days",
            warrantyInformation: "1 year warranty",
            returnPolicy: "7 days return",
          });
        }
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
//@ts-ignore
  const increase = () => dispatch(increaseQty(id!));
  
//@ts-ignore

  const decrease = () => dispatch(decreaseQty(id!));

  if (loading)
    return (
      <div className="flex flex-col gap-4 justify-center items-center h-screen font-bold text-gray-500 text-center p-4">
        <LoaderCircle size={50} color="#074E46" className="animate-spin" />
        <span className="text-2xl sm:text-4xl text-[#074E46]">Fetching Product</span>
      </div>
    );

  if (!product)
    return <div className="flex justify-center items-center h-screen text-red-500">Product not found</div>;

  return (
    <>
      <Navbar />
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="min-h-screen bg-gray-50 pb-32 mt-4 px-3 sm:px-6 md:px-12 lg:px-16 xl:px-24 relative">
        {/* Header */}
        <section className="bg-[#074E46] text-white rounded-t-4xl flex flex-col-reverse md:flex-row items-center justify-between px-8 py-10 mb-10" style={{ clipPath: "ellipse(150% 100% at 80% 0%)" }}>
          <div className="w-full md:w-1/2 space-y-4 text-center md:text-left">
            <h1 className="text-5xl font-extrabold">{product.title}</h1>
            <p className="text-white/80">{product.description}</p>
            {product.availabilityStatus && <p className="text-[#C7F464] font-semibold mt-2">{product.availabilityStatus}</p>}
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <Image src={product.thumbnail} alt={product.title} width={400} height={400} className="rounded-2xl object-contain bg-white p-4 shadow-lg" />
          </div>
        </section>

        {/* Details */}
        <div className="bg-white rounded-3xl shadow-md p-10 max-w-6xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold">${product.price}{product.discountPercentage && <span className="text-gray-500 text-base font-normal ml-2">(-{product.discountPercentage}%)</span>}</h2>
            <div className="flex items-center gap-2">
              <Star color="#FACC15" fill="#FACC15" size={20} />
              <span>{product.rating?.toFixed(1)} / 5</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            <Detail icon={<Tag />} label="Brand" value={product.brand || "N/A"} />
            <Detail icon={<Layers />} label="Category" value={product.category} />
            <Detail icon={<Truck />} label="Shipping" value={product.shippingInformation || "N/A"} />
            <Detail icon={<Shield />} label="Warranty" value={product.warrantyInformation || "N/A"} />
            <Detail icon={<RotateCcw />} label="Return Policy" value={product.returnPolicy || "N/A"} />
            <Detail icon={<Package />} label="Stock" value={`${product.stock ?? 0} items`} />
            <Detail icon={<Weight />} label="Weight" value={`${product.weight ?? 0} kg`} />
            <Detail icon={<Ruler />} label="Dimensions" value={`${product.dimensions?.width ?? 0}×${product.dimensions?.height ?? 0}×${product.dimensions?.depth ?? 0} cm`} />
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
            key={quantity} // ✅ key ensures framer-motion sees a change
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
//@ts-ignore
const Detail = ({ icon, label, value }: { icon: JSX.Element; label: string; value: string | number }) => (
  <div className="flex items-start gap-3  bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition">
    <span className="text-[#074E46] mt-1">{icon}</span>
    <div>
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  </div>
);
