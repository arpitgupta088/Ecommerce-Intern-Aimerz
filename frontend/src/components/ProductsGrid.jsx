import { Link } from "react-router-dom";
import products from "../data/products";

export default function ProductsGrid() {
  return (
    <section className="py-10 px-6">
      <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 shadow">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded" />
            <h3 className="mt-2 font-semibold">{product.name}</h3>
            <p className="text-blue-600 font-bold">₹{product.price}</p>

            <Link to={`/product/${product.id}`}>
              <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
