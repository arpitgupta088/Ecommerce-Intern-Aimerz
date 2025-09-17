import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AuthForm() {
  const [isSignup, setIsSignup] = useState(false);
  const [role, setRole] = useState("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isSignup) {
        // Signup API call
        await axios.post("http://localhost:5000/api/auth/signup", {
          email,
          password,
          role,
        });
        alert("Signup successful! Please login.");
        setIsSignup(false);
      } else {
        // Login API call
        const res = await axios.post("http://localhost:5000/api/auth/login", {
          email,
          password,
          role,
        });
console.log("Login response:", res.data);

        localStorage.setItem("token", res.data.token);
        console.log("Token saved:", res.data.token);
        console.log(localStorage.getItem("token"));
        localStorage.setItem("role", role);

        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white shadow-2xl rounded-xl p-8">
      
      <div className="flex justify-center mb-6">
        <button
          className={`px-4 py-2 font-semibold ${
            !isSignup ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"
          }`}
          onClick={() => setIsSignup(false)}
        >
          Login
        </button>
        <button
          className={`px-4 py-2 font-semibold ${
            isSignup ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"
          }`}
          onClick={() => setIsSignup(true)}
        >
          Signup
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Role Selection */}
        <div>
          <label className="block mb-1 font-semibold">Login as</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border p-2 rounded focus:ring focus:ring-blue-200"
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded focus:ring focus:ring-blue-200"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded focus:ring focus:ring-blue-200"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white p-2 rounded-lg hover:opacity-90 transition"
        >
          {isSignup ? "Signup" : "Login"}
        </button>
      </form>
    </div>
  );
}

export default AuthForm;
