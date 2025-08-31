import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import ProductsGrid from "./components/ProductsGrid";



function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <Hero />

      <Categories />

      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        {/* <ProductsGrid />  */} {/* Uncomment this line when ProductsGrid is ready */}
      </section>

      {/* Login/Signup Section */}
      <section className="max-w-md mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Login / Signup</h2>
        
      </section>
      
    </div>
  );
}

export default App;
