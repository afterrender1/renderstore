// app/firebaseConfig.ts
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDSYu7V6KAwSeQHNKtCeThz6Je0QDBuFtg",
  authDomain: "renderstore-7d08c.firebaseapp.com",
  projectId: "renderstore-7d08c",
  storageBucket: "renderstore-7d08c.appspot.com", // ✅ FIXED
  messagingSenderId: "629366006565",
  appId: "1:629366006565:web:0b91793c5de6946f9130cc"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Instances
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
