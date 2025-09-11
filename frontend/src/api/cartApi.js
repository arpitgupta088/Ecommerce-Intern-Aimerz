import axios from "axios";

const API_URL = "http://localhost:5000/api/cart";  

// Add product to cart
export const addToCart = async (productId, quantity = 1, token) => {
  const res = await axios.post(
    API_URL,
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
