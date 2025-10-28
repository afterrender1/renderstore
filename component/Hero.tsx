"use client"
import Image from "next/image";
import GroceryCategories from "./GroceryCategories";

export default function Hero() {
  return (
<>
    <section className=" bg-[#074E46] mt-5 mx-18 text-white rounded-b-[30%] rounded-t-4xl flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-20 py-10 md:py-16 relative overflow-hidden">
      
      {/* Background pattern (optional subtle shapes) */}


      {/* Left text */}
      <div className="relative z-10 md:w-1/2 space-y-4">
        <h1 className="text-3xl md:text-6xl font-extrabold leading-snug"  style={{ fontFamily: "var(--font-fredoka)" }}>
          We bring the store <br /> to your door
        </h1>
        <p className="text-white/80 text-sm md:text-base max-w-md" style={{ fontFamily: "var(--font-fredoka)" }}>
          Get organic produce and sustainably sourced groceries delivered at up to{" "}
          <span className="font-semibold text-white">4% off grocery</span>.
        </p>
        <button  style={{ fontFamily: "var(--font-fredoka)" }} className="cursor-pointer bg-[#C7F464] text-[#074E46] px-6 py-2 rounded-lg font-semibold hover:bg-[#b9ec5d] transition">
          Shop now
        </button>
      </div>

      {/* Right image */}
      <div className="relative z-10 mt-10 md:mt-0 md:w-1/2 flex justify-center">
        <Image
          src="/images/fruitsbag.png"
          alt="Grocery bag"
          width={500}
          height={500}
          className="object-cover"
        />
      </div>
    </section>

<GroceryCategories/>
    
</>
  );
}
