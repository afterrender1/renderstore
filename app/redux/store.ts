import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/app/redux/CartSlice";

// 🔹 Load cart from localStorage
const loadCartState = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Failed to load cart:", err);
    return undefined;
  }
};

// 🔹 Save cart to localStorage
const saveCartState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state.cart);
    localStorage.setItem("cart", serializedState);
  } catch (err) {
    console.error("Failed to save cart:", err);
  }
};

// 🛒 Configure store with preloaded state
const preloadedState = {
  cart: loadCartState() || { items: [] },
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState,
});

// 🧠 Persist whenever store updates
store.subscribe(() => {
  saveCartState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
