import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar flex items-center justify-between px-6 py-4 mb-8">
      <Link to="/" className="text-2xl font-bold tracking-wide">
        GADGET-WALA
      </Link>

      {/* Search Bar */}
      <div className="hidden md:flex items-center bg-gray-800 rounded-lg px-3 py-1 ml-8">
        <input
          type="text"
          placeholder="Search products..."
          className="input bg-transparent outline-none text-sm px-2 text-white placeholder-gray-300"
        />
      </div>

      <div className="flex gap-6 items-center">
        <Link to="/login" className="hover:text-blue-300 font-semibold transition">
          Login
        </Link>

        <Link to="/cart" className="relative hover:text-blue-300 transition">
          🛒
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
            2
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
