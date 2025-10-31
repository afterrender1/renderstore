"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/app/firebaseConfig";

export default function AuthModal() {
  const [isOpen, setIsOpen] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const fadeZoom = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        // LOGIN
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        console.log("Login successful");
        router.push("/");
        
       
      } else {
        // SIGNUP
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        const createdUser = userCredential.user;

        await updateProfile(createdUser, { displayName: formData.fullName });

        await setDoc(doc(db, "users", createdUser.uid), {
          displayName: formData.fullName,
          email: formData.email,
          createdAt: serverTimestamp(),
          cart: [],
          orders: [],
        });

        localStorage.setItem("User", JSON.stringify(createdUser));
        console.log("Account created successfully");
      }

      setIsOpen(false);
      setFormData({ fullName: "", email: "", password: "" });
    } catch (err: any) {
      console.log("Auth error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);
      if (!docSnap.exists()) {
        await setDoc(userRef, {
          displayName: user.displayName || "Anonymous",
          email: user.email,
          createdAt: serverTimestamp(),
          cart: [],
          orders: [],
        });
      }

      console.log("Signed in with Google");
      setIsOpen(false);
    } catch (err: any) {
      console.log("Google Sign-in error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Trigger Buttons */}
      <div className="flex gap-4 justify-center mt-10">
        <button
          className="bg-[#C7F464] text-[#074E46] px-6 py-2 rounded-full font-semibold hover:bg-[#b9ec5d] shadow-md transition"
          onClick={() => {
            setIsOpen(true);
            setIsLogin(true);
          }}
        >
          Login
        </button>
        <button
          className="bg-[#C7F464] text-[#074E46] px-6 py-2 rounded-full font-semibold hover:bg-[#b9ec5d] shadow-md transition"
          onClick={() => {
            setIsOpen(true);
            setIsLogin(false);
          }}
        >
          Signup
        </button>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          >
            <motion.div
              variants={fadeZoom}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="bg-white text-gray-800 rounded-3xl p-8 w-11/12 max-w-md shadow-2xl relative"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl font-bold transition"
              >
                &times;
              </button>

              <h2 className="text-3xl font-bold mb-4 text-[#074E46] text-center">
                {isLogin ? "Login" : "Sign Up"}
              </h2>

              {error && <p className="text-red-500 text-center mb-3">{error}</p>}

              <form className="space-y-4" onSubmit={handleSubmit}>
                {!isLogin && (
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#C7F464]"
                    required
                  />
                )}
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#C7F464]"
                  required
                />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#C7F464]"
                  required
                />

                <button
                  type="submit"
                  className="w-full bg-[#C7F464] text-[#074E46] py-3 rounded-xl font-semibold hover:bg-[#b9ec5d]"
                  disabled={loading}
                >
                  {loading
                    ? isLogin
                      ? "Logging in..."
                      : "Signing up..."
                    : isLogin
                    ? "Login"
                    : "Sign Up"}
                </button>
              </form>

              <p className="text-center mt-4 text-gray-600 text-sm">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-[#C7F464] font-semibold hover:text-[#86f36b]"
                >
                  {isLogin ? "Sign Up" : "Login"}
                </button>
              </p>

              <div className="mt-6 flex gap-4 justify-center">
                <button
                  onClick={handleGoogleSignIn}
                  className="flex-1 bg-[#074E46] text-white py-2 rounded-xl font-semibold hover:bg-[#0b5c51]"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Continue with Google"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
