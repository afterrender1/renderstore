"use client";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebaseConfig";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);

      // Redirect logic
      const pathname = window.location.pathname;
      if (firebaseUser && pathname === "/login") router.push("/dashboard");
      if (!firebaseUser && pathname.startsWith("/dashboard")) router.push("/login");
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
