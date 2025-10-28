"use client";
import { Menu, Search, ShoppingCart , BaggageClaim , Zap } from "lucide-react";

export default function Navbar() {
  return (
    <header className=" bg-[#074E46] mt-4 mx-10 text-white py-4 px-8 flex items-center justify-between shadow-md rounded-xl">
      {/* Left: Logo + Menu */}
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-white/10 rounded-full">
          <Menu size={22} />
        </button>
        <div className="flex items-center gap-1">
          <span className="text-xl">
            <BaggageClaim color="#BBEB75"/>
          </span>
          <span className="text-lg font-semibold">RenderStore</span>
        </div>
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
                      <Zap color="#BBEB75" size={18}/>
 <span>Order now and get it within</span>
          <span className="text-yellow-300 font-semibold">15 min!</span>
        </p>

        {/* Cart */}
        <button className="relative p-2 cursor-pointer rounded-full bg-white/90">
          <ShoppingCart size={22} color="black"/>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            9
          </span>
        </button>

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
