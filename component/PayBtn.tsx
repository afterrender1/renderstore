"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { motion, number } from "framer-motion";


export default function CheckoutButton({ totalp: total }: { totalp: number } , {checkAuth : check} : {checkAuth : string}) {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const itemsForStripe = cartItems.map(item => ({
      id: item.id,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
    }));

    try {
      const res = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: itemsForStripe }),
      });
      const data = await res.json();

      if (data?.url) {
        // redirect user to Stripe Checkout
        window.location.href = data.url;
      } else {
        console.error("Checkout failed", data);
        alert("Checkout failed. See console.");
      }
    } catch (err) {
      console.error("Error creating checkout session", err);
      alert("Something went wrong.");
    }
  };

  return (
       <div className="p-4 sm:p-6 border-t bg-white shadow-inner">
              <div className="flex justify-between mb-3 sm:mb-4 text-lg sm:text-xl font-bold text-gray-800">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleCheckout}
                className="w-full bg-[#074E46] text-white py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-[#0a5a4f] transition"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                Proceed to Checkout →
              </motion.button>
            </div>
  );
}
