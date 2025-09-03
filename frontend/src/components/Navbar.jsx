// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold">GADGET-WALA</h1>

      {/* Search Bar */}
      <div className="hidden md:flex items-center bg-gray-800 rounded-lg px-3 py-1">
        <input
          type="text"
          placeholder="Search products..."
          className="bg-transparent outline-none text-sm px-2"
        />
      </div>

      <div className="flex gap-4 items-center">
        <Link
          to="/login"
          className="hover:text-gray-400 transition"
        >
          Login
        </Link>
        <button className="relative">
          🛒
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
            2
          </span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
