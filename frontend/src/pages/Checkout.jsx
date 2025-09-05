import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    alert("Order placed successfully!");
    navigate("/");
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="section-title mb-6 text-center">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Shipping */}
        <div className="card">
          <h2 className="font-semibold mb-4">Shipping Address</h2>
          <form className="space-y-3">
            <input
              type="text"
              placeholder="Full Name"
              className="input w-full"
            />
            <input
              type="text"
              placeholder="Address"
              className="input w-full"
            />
            <input
              type="text"
              placeholder="City"
              className="input w-full"
            />
            <input
              type="text"
              placeholder="Pincode"
              className="input w-full"
            />
          </form>
        </div>

        {/* Order Summary */}
        <div className="card">
          <h2 className="font-semibold mb-4">Order Summary</h2>
          <div className="flex items-center border p-3 rounded img-shadow bg-gray-50">
            <img
              src="https://via.placeholder.com/100"
              alt="product"
              className="w-20 h-20 rounded img-shadow"
            />
            <div className="ml-4">
              <p>Product Name</p>
              <p className="font-semibold">₹44999</p>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <p className="flex justify-between">
              <span>Subtotal</span>
              <span>₹44999</span>
            </p>
            <p className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </p>
            <p className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹44999</span>
            </p>
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
