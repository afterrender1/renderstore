"use client";
import { Menu, Search, ShoppingCart, BaggageClaim, Zap } from "lucide-react";
import Cart from "./Cart";
import { useState } from "react";
import Link from "next/link";


export default function Navbar() {
    const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
    return (
        <header className=" bg-[#074E46] mt-4 mx-18 text-white py-4 px-8 flex items-center justify-between shadow-md rounded-xl">
            {/* Left: Logo + Menu */}
           
           
            <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-white/10 rounded-full">
                    <Menu size={22} />
                </button>
                <Link href={"/"}>
                <div className="flex items-center gap-1">
                    <span className="text-xl">
                        <BaggageClaim color="#BBEB75" />
                    </span>
                    <span className="text-lg font-semibold">RenderStore</span>
                </div>
               </Link>
            </div>

            {/* Middle: Search bar */}
            <div className="flex items-center mr-20 bg-white text-gray-800 rounded-full w-[40%] px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-[#BBEB75]">
                <input
                    type="text"
                    placeholder="Search for Grocery, Stores, Vegetable or Meat"
                    className="w-full mx-3 outline-none bg-transparent placeholder-gray-500 text-sm p-1"
                />
                <Search className="text-gray-500 mr-2" size={18} />

            </div>

            {/* Right: Promo + Icons */}
            <div className="flex items-center gap-4">
                <p className="text-sm flex items-center gap-1">
                    <Zap color="#BBEB75" size={18} />
                    <span>Order now and get it within</span>
                    <span className="text-yellow-300 font-semibold">15 min!</span>
                </p>

                {/* Cart */}
  <button
  onClick={() => setIsCartOpen(true)}
  className="relative bg-white text-black p-3 rounded-full shadow-md transition-all hover:text-gray-800 hover:bg-[#b2d16f] cursor-pointer duration-300 flex items-center justify-center"
>
  <ShoppingCart size={20} />

  {/* Cart count badge */}
  {cartItems.length > 0 && (
    <span className="absolute -top-1 -right-1 bg-[#074E46] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
      {cartItems.length}
    </span>
  )}
</button>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onIncrease={(id) => console.log("Increase", id)}
        onDecrease={(id) => console.log("Decrease", id)}
        onRemove={(id) => console.log("Remove", id)}
      />

                {/* User avatar */}
                <img
                    src="https://i.pravatar.cc/40"
                    alt="user"
                    className="w-8 h-8 rounded-full border border-white"
                />
            </div>
        </header>
    );
}
