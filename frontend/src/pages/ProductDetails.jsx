import { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom";
import axios from "axios";
import productsData from "../data/products";
import { addToCart } from "../api/cartApi";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const role = localStorage.getItem("role"); // added

  useEffect(() => {
    const fetchProduct = async () => {
      let found = productsData.find((p) => String(p.id) === String(id));
      if (found) {
        setProduct(found);
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (role === "admin") return; // Admin cannot add to cart

    try {
      if (!product._id && product.id) {
        let localCart = JSON.parse(localStorage.getItem("localCart")) || [];
        const exists = localCart.find((item) => item.id === product.id);

        if (exists) {
          exists.quantity += 1;
        } else {
          localCart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem("localCart", JSON.stringify(localCart));
        alert("Item added to cart");
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to add items to cart!");
        return;
      }

      const res = await addToCart(product._id, 1, token);
      alert("Item added to cart");
    } catch (err) {
      console.error("AddToCart Error:", err.response?.data || err.message);
      alert("Failed to add item to cart.");
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;
  if (!product) return <p className="p-6">Product not found</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-8 card shadow-2xl bg-white/90 backdrop-blur-lg">
        <div className="flex flex-col items-center">
          <img
            src={product.image}
            alt={product.name}
            className="img-shadow w-full max-w-xs h-80 object-cover rounded-xl mb-4"
          />
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full shadow mt-2">
            #{product.category || "Gadget"}
          </span>
        </div>

        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-extrabold mb-2 text-blue-800">
            {product.name}
          </h1>
          <p className="text-2xl text-blue-600 font-bold mb-4">
            ₹{product.price}
          </p>
          <p className="mb-6 text-gray-700">
            {product.description || "Experience the best quality and latest technology with this amazing gadget. Perfect for your needs and lifestyle."}
          </p>

          {/* Only show for customer */}
          {role !== "admin" && (
            <button
              onClick={handleAddToCart}
              className="btn btn-primary px-8 py-3 text-lg rounded-full shadow-lg hover:scale-105 hover:bg-blue-700 transition-all duration-200"
            >
              Add to Cart
            </button>
          )}

          <div className="mt-8">
            <h2 className="font-semibold text-lg mb-2 text-blue-700">
              Product Details
            </h2>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>High quality &amp; durable</li>
              <li>1 year warranty</li>
              <li>Fast delivery</li>
              <li>Easy returns</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
