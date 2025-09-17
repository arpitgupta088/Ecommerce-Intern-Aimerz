import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="navbar flex items-center justify-between px-6 py-4 mb-8">
      <Link to="/" className="text-2xl font-bold tracking-wide">
        GADGET-WALA
      </Link>

      <div className="flex gap-6 items-center">
        {!token ? (
          <Link to="/login" className="hover:text-blue-300 font-semibold transition">
            Login
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="hover:text-blue-300 font-semibold transition"
          >
            Logout ({role})
          </button>
        )}

        <Link to="/cart" className="relative hover:text-blue-300 transition">
          🛒
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
