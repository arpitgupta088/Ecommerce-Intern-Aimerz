import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import ProductsGrid from "./components/ProductsGrid";
import Login from "./pages/Login";


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Categories />
                <section className="max-w-7xl mx-auto px-4 py-12">
                  <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
                  <ProductsGrid />
                </section>
              </>
            }
          />

          {/* Login Page */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
