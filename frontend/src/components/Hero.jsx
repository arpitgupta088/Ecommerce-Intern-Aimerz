// src/components/Hero.jsx
import React from "react";

const Hero = () => {
  return (
    <section className="bg-blue-600 text-white text-center py-20">
      <h1 className="text-4xl md:text-5xl font-bold">Welcome to Gadget-Wala</h1>
      <p className="mt-4 text-lg">Best deals on latest electronics</p>
      <button className="mt-6 bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-200">
        Shop Now
      </button>
    </section>
  );
};

export default Hero;
