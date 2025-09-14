import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart } from "../api/cartApi";
import { placeOrder } from "../api/orderApi";

export default function Checkout({ token }) {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [subtotal, setSubtotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    pincode: "",
  });

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart(token);
        console.log("CART RESPONSE:", data);

        if (data && data.items) {
          setCart(data); // ✅ cart ko state me store karo
          const totalAmount = data.items.reduce(
            (acc, item) => acc + item.product.price * item.quantity,
            0
          );
          setSubtotal(totalAmount);
        } else {
          console.log("⚠️ Cart is empty ya wrong response format:", data);
          setCart({ items: [] }); // empty cart safe fallback
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
        setCart({ items: [] }); // error case me bhi fallback
      }
    };

    fetchCart();
  }, [token]);

  const handleChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    try {
      if (!shippingAddress.fullName || !shippingAddress.address) {
        alert("Please fill in shipping details");
        return;
      }

      await placeOrder({ paymentMethod, shippingAddress }, token);

      alert("Order placed successfully!");
      navigate("/myorders");
    } catch (err) {
      console.error(err);
      alert("Failed to place order");
    }
  };

  if (!cart) return <p>Loading...</p>; // jab tak cart load ho raha hai

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="section-title mb-6 text-center">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Shipping Address */}
        <div className="card">
          <h2 className="font-semibold mb-4">Shipping Address</h2>
          <form className="space-y-3">
            <input
              type="text"
              name="fullName"
              value={shippingAddress.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="input w-full"
            />
            <input
              type="text"
              name="address"
              value={shippingAddress.address}
              onChange={handleChange}
              placeholder="Address"
              className="input w-full"
            />
            <input
              type="text"
              name="city"
              value={shippingAddress.city}
              onChange={handleChange}
              placeholder="City"
              className="input w-full"
            />
            <input
              type="text"
              name="pincode"
              value={shippingAddress.pincode}
              onChange={handleChange}
              placeholder="Pincode"
              className="input w-full"
            />
          </form>
        </div>

        {/* Order Summary */}
        <div className="card">
          <h2 className="font-semibold mb-4">Order Summary</h2>
          {cart.items.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.items.map((item) => (
              <div
                key={item.product._id}
                className="flex items-center border p-3 rounded img-shadow bg-gray-50 mb-3"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 rounded img-shadow"
                />
                <div className="ml-4">
                  <p>{item.product.name}</p>
                  <p className="font-semibold">
                    ₹{item.product.price} × {item.quantity}
                  </p>
                </div>
              </div>
            ))
          )}

          <div className="mt-4 space-y-2">
            <p className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </p>
            <p className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{subtotal}</span>
            </p>
          </div>

          {/* Payment Option */}
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Payment Method</h3>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>Cash on Delivery (COD)</span>
            </label>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="btn btn-primary w-full mt-6"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
