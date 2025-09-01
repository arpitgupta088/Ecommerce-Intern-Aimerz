import { useState } from "react";

function AuthForm() {
  const [role, setRole] = useState("customer");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Role:", role);
    // yahan baad me backend ke sath api call add hoga
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

      {/* Role Selection */}
      <label className="block mb-2 font-semibold">Login as</label>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full border p-2 rounded mb-4"
      >
        <option value="customer">Customer</option>
        <option value="admin">Admin</option>
      </select>

      {/* Email */}
      <input
        type="email"
        placeholder="Email"
        className="w-full border p-2 rounded mb-4"
        required
      />

      {/* Password */}
      <input
        type="password"
        placeholder="Password"
        className="w-full border p-2 rounded mb-4"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Login
      </button>
    </form>
  );
}

export default AuthForm;
