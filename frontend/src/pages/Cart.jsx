import { Link } from "react-router-dom";

export default function Cart() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="section-title mb-6">Cart</h1>
      <div className="space-y-4">
        {/* Example Cart Item */}
        <div className="flex items-center justify-between card">
          <img
            src="https://via.placeholder.com/100"
            alt="product"
            className="w-20 h-20 rounded img-shadow"
          />
          <p className="flex-1 ml-4">Product Name</p>
          <div className="flex items-center space-x-2">
            <button className="btn btn-outline px-2">-</button>
            <span>1</span>
            <button className="btn btn-outline px-2">+</button>
          </div>
          <p className="font-semibold">₹999</p>
        </div>
      </div>

      <div className="mt-6 card">
        <p className="flex justify-between">
          <span>Subtotal</span>
          <span>₹1998</span>
        </p>
        <p className="flex justify-between">
          <span>Shipping</span>
          <span>Free</span>
        </p>
        <p className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>₹1998</span>
        </p>
      </div>

      <div className="flex justify-between mt-6">
        <Link to="/">
          <button className="btn btn-outline">Continue Shopping</button>
        </Link>
        <Link to="/checkout">
          <button className="btn btn-primary">Proceed to Checkout</button>
        </Link>
      </div>
    </div>
  );
}
