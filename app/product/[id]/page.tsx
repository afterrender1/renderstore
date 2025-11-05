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

/* -------------------- Product Type -------------------- */
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

/* -------------------- Fruits -------------------- */

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

// toys

const toys: Product[] = [
  {
    id: "toy-1",
    title: "Building Blocks Set",
    thumbnail: "/images/toys/blocks.png",
    price: 14.99,
    category: "toys",
    description:
      "Colorful interlocking building blocks to boost creativity and imagination.",
    stock: 60,
    weight: 1.2,
    dimensions: { width: 25, height: 20, depth: 10 },
    availabilityStatus: "In Stock",
    shippingInformation: "Ships in 1-2 days",
    warrantyInformation: "N/A",
    returnPolicy: "10 days return",
    rating: 4.6,
    brand: "PlaySmart",
  },
  {
    id: "toy-2",
    title: "Remote Control Car",
    thumbnail: "/images/toys/remotecontrolcar.png",
    price: 29.99,
    category: "electronics",
    description:
      "High-speed RC car with rechargeable battery and durable design.",
    stock: 40,
    weight: 2,
    dimensions: { width: 30, height: 15, depth: 15 },
    availabilityStatus: "In Stock",
    shippingInformation: "Ships in 2-3 days",
    warrantyInformation: "6 months warranty",
    returnPolicy: "15 days return",
    rating: 4.7,
    brand: "RacerPro",
  },
  {
    id: "toy-3",
    title: "Teddy Bear",
    thumbnail: "/images/toys/bear.png",
    price: 18.49,
    category: "soft toys",
    description:
      "Soft, cuddly teddy bear that brings comfort and joy to kids of all ages.",
    stock: 75,
    weight: 0.8,
    dimensions: { width: 20, height: 25, depth: 15 },
    availabilityStatus: "In Stock",
    shippingInformation: "Ships in 1-2 days",
    warrantyInformation: "N/A",
    returnPolicy: "10 days return",
    rating: 4.8,
    brand: "CuddleWorld",
  },
  {
    id: "toy-4",
    title: "LEGO Classic Kit",
    thumbnail: "/images/toys/kit.png",
    price: 39.99,
    category: "construction",
    description: "Classic LEGO set for endless building fun and creativity.",
    stock: 50,
    weight: 1.5,
    dimensions: { width: 35, height: 25, depth: 10 },
    availabilityStatus: "In Stock",
    shippingInformation: "Ships in 2-3 days",
    warrantyInformation: "1 year warranty",
    returnPolicy: "15 days return",
    rating: 4.9,
    brand: "LEGO",
  },
  {
    id: "toy-5",
    title: "Toy Train Set",
    thumbnail: "/images/toys/trainset.png",
    price: 24.99,
    category: "vehicles",
    description:
      "Electric train set with tracks, lights, and realistic sounds.",
    stock: 45,
    weight: 2.5,
    dimensions: { width: 40, height: 15, depth: 20 },
    availabilityStatus: "In Stock",
    shippingInformation: "Ships in 2-3 days",
    warrantyInformation: "6 months warranty",
    returnPolicy: "15 days return",
    rating: 4.6,
    brand: "TrackMaster",
  },
  {
    id: "toy-6",
    title: "Action Figure Hero",
    thumbnail: "/images/toys/hero.png",
    price: 12.99,
    category: "collectibles",
    description:
      "Detailed superhero action figure with poseable limbs and accessories.",
    stock: 80,
    weight: 0.4,
    dimensions: { width: 10, height: 20, depth: 5 },
    availabilityStatus: "In Stock",
    shippingInformation: "Ships in 1-2 days",
    warrantyInformation: "N/A",
    returnPolicy: "7 days return",
    rating: 4.5,
    brand: "HeroVerse",
  },
  {
    id: "toy-7",
    title: "Doll House",
    thumbnail: "/images/toys/dollhouse.png",
    price: 49.99,
    category: "role play",
    description:
      "Beautiful wooden dollhouse with furniture and mini dolls included.",
    stock: 35,
    weight: 3,
    dimensions: { width: 50, height: 40, depth: 25 },
    availabilityStatus: "In Stock",
    shippingInformation: "Ships in 3-4 days",
    warrantyInformation: "1 year warranty",
    returnPolicy: "15 days return",
    rating: 4.8,
    brand: "DreamHouse",
  },
  {
    id: "toy-8",
    title: "Puzzle Set 1000 Pieces",
    thumbnail: "/images/toys/puzzleset.png",
    price: 15.99,
    category: "puzzles",
    description:
      "Challenging 1000-piece puzzle for kids and adults to enhance focus.",
    stock: 70,
    weight: 0.9,
    dimensions: { width: 30, height: 20, depth: 5 },
    availabilityStatus: "In Stock",
    shippingInformation: "Ships in 1-2 days",
    warrantyInformation: "N/A",
    returnPolicy: "10 days return",
    rating: 4.4,
    brand: "PuzzleTime",
  },
  {
    id: "toy-9",
    title: "Stuffed Animal Dog",
    thumbnail: "/images/toys/dog.png",
    price: 17.99,
    category: "soft toys",
    description:
      "Adorable stuffed puppy toy made with premium soft plush fabric.",
    stock: 65,
    weight: 0.7,
    dimensions: { width: 20, height: 20, depth: 10 },
    availabilityStatus: "In Stock",
    shippingInformation: "Ships in 1-2 days",
    warrantyInformation: "N/A",
    returnPolicy: "10 days return",
    rating: 4.7,
    brand: "CuddleWorld",
  },
  {
    id: "toy-10",
    title: "Kids Musical Keyboard",
    thumbnail: "/images/toys/kidskeyboard.png",
    price: 34.99,
    category: "music",
    description:
      "Interactive mini piano keyboard for kids to explore music and rhythm.",
    stock: 50,
    weight: 1.8,
    dimensions: { width: 40, height: 10, depth: 20 },
    availabilityStatus: "In Stock",
    shippingInformation: "Ships in 2-3 days",
    warrantyInformation: "6 months warranty",
    returnPolicy: "15 days return",
    rating: 4.6,
    brand: "MiniMelody",
  },
];


// daily products

const dailyProducts: Product[] = [
  {
    id: "daily-1",
    title: "Detergent Powder",
    thumbnail: "/images/dailyproducts/tide.png",
    price: 6.99,
    category: "daily products",
    description: "Powerful detergent for fresh and clean clothes.",
    stock: 80,
    weight: 1,
    dimensions: { width: 15, height: 10, depth: 5 },
    availabilityStatus: "In Stock",
    shippingInformation: "Ships in 1-2 days",
    warrantyInformation: "N/A",
    returnPolicy: "10 days return",
    rating: 4.6,
    brand: "Tide",
  },
  {
    id: "daily-2",
    title: "Toothpaste",
    thumbnail: "/images/dailyproducts/colgate.png",
    price: 3.49,
    category: "daily products",
    description: "Fluoride toothpaste for strong and healthy teeth.",
    stock: 100,
    weight: 0.3,
    dimensions: { width: 12, height: 4, depth: 4 },
    availabilityStatus: "In Stock",
    shippingInformation: "Ships in 1 day",
    warrantyInformation: "N/A",
    returnPolicy: "7 days return",
    rating: 4.7,
    brand: "Colgate",
  },
  {
    id: "daily-3",
    title: "Bath Soap",
    thumbnail: "/images/dailyproducts/dove.png",
    price: 2.99,
    category: "daily products",
    description: "Refreshing bath soap with natural oils and fragrance.",
    stock: 90,
    weight: 0.25,
    dimensions: { width: 10, height: 3, depth: 5 },
    availabilityStatus: "In Stock",
    shippingInformation: "Ships in 1 day",
    warrantyInformation: "N/A",
    returnPolicy: "7 days return",
    rating: 4.8,
    brand: "Dove",
  },
  {
    id: "daily-4",
    title: "Shampoo",
    thumbnail: "/images/dailyproducts/sunslik.png",
    price: 5.99,
    category: "daily products",
    description: "Gentle shampoo for soft and shiny hair.",
    stock: 70,
    weight: 0.5,
    dimensions: { width: 8, height: 20, depth: 6 },
    availabilityStatus: "In Stock",
    shippingInformation: "Ships in 1-2 days",
    warrantyInformation: "N/A",
    returnPolicy: "10 days return",
    rating: 4.6,
    brand: "Sunsilk",
  },
  {
    id: "daily-5",
    title: "Handwash",
    thumbnail: "/images/dailyproducts/handwash.png",
    price: 4.49,
    category: "daily products",
    description: "Antibacterial handwash for clean and germ-free hands.",
    stock: 85,
    weight: 0.4,
    dimensions: { width: 8, height: 18, depth: 6 },
    availabilityStatus: "In Stock",
    shippingInformation: "Ships in 1 day",
    warrantyInformation: "N/A",
    returnPolicy: "7 days return",
    rating: 4.5,
    brand: "Lifebuoy",
  },
  {
    id: "daily-6",
    title: "Toilet Cleaner",
    thumbnail: "/images/dailyproducts/toilet.png",
    price: 7.99,
    category: "daily products",
    description: "Strong cleaning formula for sparkling toilets.",
    stock: 60,
    weight: 1,
    dimensions: { width: 10, height: 25, depth: 8 },
    availabilityStatus: "In Stock",
    shippingInformation: "Ships in 2 days",
    warrantyInformation: "N/A",
    returnPolicy: "10 days return",
    rating: 4.7,
    brand: "Harpic",
  },
  {
    id: "daily-7",
    title: "Dishwashing Liquid",
    thumbnail: "/images/dailyproducts/dishwashing.png",
    price: 5.29,
    category: "daily products",
    description: "Tough on grease, gentle on hands dishwashing liquid.",
    stock: 75,
    weight: 0.7,
    dimensions: { width: 10, height: 22, depth: 6 },
    availabilityStatus: "In Stock",
    shippingInformation: "Ships in 1-2 days",
    warrantyInformation: "N/A",
    returnPolicy: "10 days return",
    rating: 4.6,
    brand: "Vim",
  },
  {
    id: "daily-8",
    title: "Paper Towels",
    thumbnail: "/images/dailyproducts/paper.png",
    price: 3.99,
    category: "daily products",
    description: "Highly absorbent paper towels for everyday cleaning.",
    stock: 120,
    weight: 0.5,
    dimensions: { width: 20, height: 25, depth: 10 },
    availabilityStatus: "In Stock",
    shippingInformation: "Ships in 1 day",
    warrantyInformation: "N/A",
    returnPolicy: "7 days return",
    rating: 4.4,
    brand: "SoftTouch",
  },
  {
    id: "daily-9",
    title: "Deodorant Spray",
    thumbnail: "/images/dailyproducts/spray.png",
    price: 6.49,
    category: "daily products",
    description: "Long-lasting fragrance to keep you fresh all day.",
    stock: 65,
    weight: 0.3,
    dimensions: { width: 6, height: 18, depth: 6 },
    availabilityStatus: "In Stock",
    shippingInformation: "Ships in 1-2 days",
    warrantyInformation: "N/A",
    returnPolicy: "7 days return",
    rating: 4.5,
    brand: "Axe",
  },
  {
    id: "daily-10",
    title: "Laundry Softener",
    thumbnail: "/images/dailyproducts/laundry.png",
    price: 8.99,
    category: "daily products",
    description: "Gives clothes a soft feel and pleasant fragrance.",
    stock: 55,
    weight: 1.5,
    dimensions: { width: 15, height: 25, depth: 10 },
    availabilityStatus: "In Stock",
    shippingInformation: "Ships in 2 days",
    warrantyInformation: "N/A",
    returnPolicy: "10 days return",
    rating: 4.7,
    brand: "Comfort",
  },
];


// electronics 

const electronics: Product[] = [
  {
    id: "elec-1",
    title: "Wireless Headphones",
    thumbnail: "/images/electronics/wirelessheadphones.png",
    price: 59.99,
    category: "electronics",
    description: "Noise-cancelling wireless headphones with deep bass.",
    stock: 60,
    weight: 0.3,
    dimensions: { width: 18, height: 20, depth: 8 },
    availabilityStatus: "In Stock",
    shippingInformation: "Ships in 1-2 days",
    warrantyInformation: "1 year warranty",
    returnPolicy: "15 days return",
    rating: 4.7,
    brand: "SoundBeats",
  },
  {
    id: "elec-2",
    title: "17 Pro Max",
    thumbnail: "/images/electronics/promax.png",
    price: 799.99,
    category: "electronics",
    description: "Next-gen smartphone with powerful performance and camera.",
    stock: 35,
    weight: 0.5,
    dimensions: { width: 8, height: 16, depth: 0.9 },
    availabilityStatus: "In Stock",
    shippingInformation: "Ships in 1-3 days",
    warrantyInformation: "1 year warranty",
    returnPolicy: "15 days return",
    rating: 4.8,
    brand: "NovaTech",
  },
  {
    id: "elec-3",
    title: "Bluetooth Speaker",
    thumbnail: "/images/electronics/speaker.png",
    price: 89.99,
    category: "electronics",
    description: "Portable waterproof speaker with crisp sound.",
    stock: 50,
    weight: 0.8,
    dimensions: { width: 20, height: 10, depth: 10 },
    availabilityStatus: "In Stock",
    shippingInformation: "Ships in 2 days",
    warrantyInformation: "1 year warranty",
    returnPolicy: "10 days return",
    rating: 4.6,
    brand: "BoomSound",
  },
  {
    id: "elec-4",
    title: "Smartwatch Ultra",
    thumbnail: "/images/electronics/smartwatch.png",
    price: 199.99,
    category: "electronics",
    description: "Advanced smartwatch with heart rate monitor and GPS.",
    stock: 45,
    weight: 0.2,
    dimensions: { width: 5, height: 5, depth: 1.5 },
    availabilityStatus: "In Stock",
    shippingInformation: "Ships in 1-2 days",
    warrantyInformation: "2 years warranty",
    returnPolicy: "15 days return",
    rating: 4.9,
    brand: "TimeX",
  },
  {
    id: "elec-5",
    title: "Gaming Mouse",
    thumbnail: "/images/electronics/mouse.png",
    price: 49.99,
    category: "electronics",
    description: "Ergonomic RGB gaming mouse with adjustable DPI.",
    stock: 75,
    weight: 0.25,
    dimensions: { width: 7, height: 12, depth: 4 },
    availabilityStatus: "In Stock",
    shippingInformation: "Ships in 1 day",
    warrantyInformation: "6 months warranty",
    returnPolicy: "7 days return",
    rating: 4.5,
    brand: "HyperClick",
  },
  {
    id: "elec-6",
    title: "Mechanical Keyboard",
    thumbnail: "/images/electronics/keyboard.png",
    price: 119.99,
    category: "electronics",
    description: "RGB backlit mechanical keyboard with blue switches.",
    stock: 65,
    weight: 1.2,
    dimensions: { width: 45, height: 5, depth: 15 },
    availabilityStatus: "In Stock",
    shippingInformation: "Ships in 2 days",
    warrantyInformation: "1 year warranty",
    returnPolicy: "15 days return",
    rating: 4.8,
    brand: "KeyPro",
  },
  {
    id: "elec-7",
    title: "Laptop Stand",
    thumbnail: "/images/electronics/laptopstand.png",
    price: 34.99,
    category: "electronics",
    description: "Adjustable aluminum stand for laptops and tablets.",
    stock: 80,
    weight: 0.7,
    dimensions: { width: 25, height: 30, depth: 20 },
    availabilityStatus: "In Stock",
    shippingInformation: "Ships in 1-2 days",
    warrantyInformation: "6 months warranty",
    returnPolicy: "10 days return",
    rating: 4.4,
    brand: "FlexGear",
  },
  {
    id: "elec-8",
    title: "Power Bank 20000mAh",
    thumbnail: "/images/electronics/powerbank.png",
    price: 39.99,
    category: "electronics",
    description: "Fast-charging power bank for mobile and tablets.",
    stock: 90,
    weight: 0.5,
    dimensions: { width: 8, height: 15, depth: 2 },
    availabilityStatus: "In Stock",
    shippingInformation: "Ships in 1-2 days",
    warrantyInformation: "1 year warranty",
    returnPolicy: "15 days return",
    rating: 4.7,
    brand: "ChargeMax",
  },
  {
    id: "elec-9",
    title: "HD Webcam",
    thumbnail: "/images/electronics/hdwebcam.png",
    price: 69.99,
    category: "electronics",
    description: "1080p webcam with built-in microphone for streaming.",
    stock: 70,
    weight: 0.25,
    dimensions: { width: 8, height: 5, depth: 5 },
    availabilityStatus: "In Stock",
    shippingInformation: "Ships in 2 days",
    warrantyInformation: "1 year warranty",
    returnPolicy: "15 days return",
    rating: 4.6,
    brand: "StreamVision",
  },
  {
    id: "elec-10",
    title: "Wireless Charger Pad",
    thumbnail: "/images/electronics/wirelesscharger.png",
    price: 24.99,
    category: "electronics",
    description: "Fast wireless charging pad compatible with all Qi devices.",
    stock: 100,
    weight: 0.3,
    dimensions: { width: 10, height: 1, depth: 10 },
    availabilityStatus: "In Stock",
    shippingInformation: "Ships in 1 day",
    warrantyInformation: "1 year warranty",
    returnPolicy: "10 days return",
    rating: 4.5,
    brand: "PowerLink",
  },
];
/* -------------------- Component -------------------- */
export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const cartItem = cartItems.find((item) => item.id.toString() === id?.toString());
  const quantity = cartItem ? cartItem.quantity : 0;

  /* -------------------- Fetch Logic -------------------- */
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const fruitProduct = fruits.find((f) => f.id.toString() === id?.toString());
        const toyProduct = toys.find((t) => t.id.toString() === id?.toString());
        const electricProduct = electronics.find((e) => e.id.toString() === id?.toString());
        const dailyProduct = dailyProducts.find((d) => d.id.toString() === id?.toString());

        if (fruitProduct) setProduct(fruitProduct);
        else if (toyProduct) setProduct(toyProduct);
        else if (electricProduct) setProduct(electricProduct);
        else if (dailyProduct) setProduct(dailyProduct);
        else {
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

  /* -------------------- Cart Handlers -------------------- */
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

  /* -------------------- Loading -------------------- */
  if (loading)
    return (
      <div className="flex flex-col gap-4 justify-center items-center h-screen font-bold text-gray-500 text-center p-4">
        <LoaderCircle size={50} color="#074E46" className="animate-spin" />
        <span className="text-2xl sm:text-4xl text-[#074E46]">
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

  /* -------------------- UI -------------------- */
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
            {product.availabilityStatus && (
              <p className="text-[#C7F464] font-semibold mt-2">
                {product.availabilityStatus}
              </p>
            )}
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <Image
              src={product.thumbnail}
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
            <h2 className="text-3xl font-bold">
              ${product.price}
              {product.discountPercentage && (
                <span className="text-gray-500 text-base font-normal ml-2">
                  (-{product.discountPercentage}%)
                </span>
              )}
            </h2>
            <div className="flex items-center gap-2">
              <Star color="#FACC15" fill="#FACC15" size={20} />
              <span>{product.rating?.toFixed(1)} / 5</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            <Detail icon={<Tag />} label="Brand" value={product.brand || "N/A"} />
            <Detail icon={<Layers />} label="Category" value={product.category} />
            <Detail
              icon={<Truck />}
              label="Shipping"
              value={product.shippingInformation || "N/A"}
            />
            <Detail
              icon={<Shield />}
              label="Warranty"
              value={product.warrantyInformation || "N/A"}
            />
            <Detail
              icon={<RotateCcw />}
              label="Return Policy"
              value={product.returnPolicy || "N/A"}
            />
            <Detail
              icon={<Package />}
              label="Stock"
              value={`${product.stock ?? 0} items`}
            />
            <Detail
              icon={<Weight />}
              label="Weight"
              value={`${product.weight ?? 0} kg`}
            />
            <Detail
              icon={<Ruler />}
              label="Dimensions"
              value={`${product.dimensions?.width ?? 0}×${product.dimensions?.height ?? 0}×${product.dimensions?.depth ?? 0} cm`}
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

/* -------------------- Detail Component -------------------- */
//@ts-ignore
const Detail = ({ icon, label, value }: { icon: JSX.Element; label: string; value: string | number }) => (
  <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition">
    <span className="text-[#074E46] mt-1">{icon}</span>
    <div>
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  </div>
);
