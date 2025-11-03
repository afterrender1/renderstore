"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartItem = {
  id: string | number; // ✅ string or number
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
  description?: string;
};

type CartState = {
  items: CartItem[];
};

// ✅ Load cart safely (only in browser)
const loadCart = (): CartItem[] => {
  if (typeof window !== "undefined") {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      console.error("Error loading cart from localStorage", err);
      return [];
    }
  }
  return [];
};

// ✅ Save cart safely (only in browser)
const saveCart = (cart: CartItem[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

const initialState: CartState = {
  items: loadCart(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Omit<CartItem, "quantity">>) => {
      const existingItem = state.items.find(
        (i) => i.id.toString() === action.payload.id.toString()
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      saveCart(state.items);
    },
    removeFromCart: (state, action: PayloadAction<string | number>) => {
      state.items = state.items.filter((i) => i.id.toString() !== action.payload.toString());
      saveCart(state.items);
    },
    increaseQty: (state, action: PayloadAction<string | number>) => {
      const item = state.items.find((i) => i.id.toString() === action.payload.toString());
      if (item) item.quantity += 1;
      saveCart(state.items);
    },
    decreaseQty: (state, action: PayloadAction<string | number>) => {
      const item = state.items.find((i) => i.id.toString() === action.payload.toString());
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter((i) => i.id.toString() !== action.payload.toString());
      }
      saveCart(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveCart([]);
    },
  },
});

export const { addToCart, removeFromCart, increaseQty, decreaseQty, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
