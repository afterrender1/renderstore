"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/app/firebaseConfig";

export default function AuthModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState<User | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const fadeZoom = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        if (userCredential.user) {
          await updateProfile(userCredential.user, { displayName: formData.fullName });
          await setDoc(doc(db, "users", userCredential.user.uid), {
            displayName: formData.fullName,
            email: formData.email,
            createdAt: serverTimestamp(),
            cart: [],
            orders: [],
          });
        }
      }
      setIsOpen(false);
      setFormData({ fullName: "", email: "", password: "" });
    } catch (err: any) {
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
      setIsOpen(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Trigger Buttons */}
      <div className="flex flex-wrap gap-4 justify-center mt-10 px-4">
        <button
          className="bg-[#C7F464] text-[#074E46] px-6 py-2 rounded-full font-semibold hover:bg-[#b9ec5d] shadow-md transition w-full sm:w-auto"
          onClick={() => {
            setIsOpen(true);
            setIsLogin(true);
          }}
        >
          Login
        </button>
        <button
          className="bg-[#C7F464] text-[#074E46] px-6 py-2 rounded-full font-semibold hover:bg-[#b9ec5d] shadow-md transition w-full sm:w-auto"
          onClick={() => {
            setIsOpen(true);
            setIsLogin(false);
          }}
        >
          Signup
        </button>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-2 sm:p-6"
          >
            {/* Modal Box */}
            <motion.div
              variants={fadeZoom}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="bg-white text-gray-800 rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl relative mx-auto"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl font-bold transition"
              >
                &times;
              </button>

              <h2
                className="text-2xl sm:text-3xl font-bold mb-4 text-[#074E46] text-center"
                style={{ fontFamily: "var(--font-fredoka)" }}
              >
                {isLogin ? "Login" : "Sign Up"}
              </h2>

              {error && <p className="text-red-500 text-center mb-3 text-sm sm:text-base">{error}</p>}

              <form className="space-y-4" onSubmit={handleSubmit}>
                {!isLogin && (
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C7F464] transition placeholder-gray-400 text-sm sm:text-base"
                    required
                  />
                )}
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C7F464] transition placeholder-gray-400 text-sm sm:text-base"
                  required
                />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C7F464] transition placeholder-gray-400 text-sm sm:text-base"
                  required
                />

                <button
                  type="submit"
                  className="w-full bg-[#C7F464] text-[#074E46] py-3 rounded-xl font-semibold hover:bg-[#b9ec5d] shadow-md transition text-base sm:text-lg"
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
                  className="text-[#C7F464] font-semibold hover:text-[#86f36b] transition"
                >
                  {isLogin ? "Sign Up" : "Login"}
                </button>
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleGoogleSignIn}
                  className="flex-1 bg-[#074E46] text-white py-2 rounded-xl font-semibold hover:bg-[#0b5c51] transition shadow-sm text-sm sm:text-base"
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
