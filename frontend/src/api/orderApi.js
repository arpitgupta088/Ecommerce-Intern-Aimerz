import axios from "axios";

const API_URL = "http://localhost:5000/api/orders";


// Place order
export const placeOrder = async (orderData, token) => {
  const res = await axios.post(
    "http://localhost:5000/api/orders",
    orderData, // yaha ab {paymentMethod, shippingAddress} jayega
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};


// Get user orders
export const getMyOrders = async (token) => {
  const res = await axios.get(`${API_URL}/myorders`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
