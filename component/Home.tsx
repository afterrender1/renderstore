"use client";
import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";

const Home = () => {
  return (
    <main className="w-full min-h-screen overflow-x-hidden bg-white">
      {/* Navbar - fully responsive already */}
      <Navbar />

      {/* Hero + Categories + Products - fully responsive */}
      <Hero />
    </main>
  );
};

export default Home;
