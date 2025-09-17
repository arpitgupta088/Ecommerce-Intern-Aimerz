import axios from "axios";

const API_URL = "http://localhost:5000/api/cart";  

// Add product to cart
export const addToCart = async (productId, quantity = 1, token) => {
  const res = await axios.post(
    `${API_URL}/add`,
    { productId, quantity },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};

// Get user cart
export const getCart = async (token) => {
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Remove product from cart (backend)
export const removeFromCart = async (productId, token) => {
  const res = await axios.delete(`${API_URL}/remove/${productId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// ------------- Place Order (Dummy) ---
export const placeOrder = async ({ paymentMethod, shippingAddress }, token) => {
  // Get current cart from localStorage
  const localCart = JSON.parse(localStorage.getItem("localCart")) || [];

  if (localCart.length === 0) {
    throw new Error("Cart is empty");
  }

  // Create dummy order object
  const order = {
    id: Date.now(), 
    items: localCart,
    paymentMethod,
    shippingAddress,
    status: "placed",
    placedAt: new Date().toISOString(),
  };

  console.log("✅ Order Placed:", order);

  // local cart clear krna
  localStorage.removeItem("localCart");

  return order;
};
