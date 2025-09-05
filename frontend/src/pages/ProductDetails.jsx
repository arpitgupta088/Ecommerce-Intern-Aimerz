import { useParams, Link } from "react-router-dom";
import products from "../data/products";


export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return <h2 className="text-center mt-10">Product Not Found</h2>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-6 card">
        <img src={product.image} alt={product.name} className="img-shadow" />
        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-lg text-blue-700 font-semibold">₹{product.price}</p>
          <button className="btn btn-primary mt-4">
            Add to Cart
          </button>
          <h2 className="mt-6 font-semibold">Product Details</h2>
          <p className="text-gray-600 mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel sapien at odio tristique.
          </p>
        </div>
      </div>

      {/* Related Products */}
      <h2 className="mt-10 section-title text-lg">Related Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {products.slice(0, 4).map((p) => (
          <Link key={p.id} to={`/product/${p.id}`}>
            <div className="grid-item p-3 text-center">
              <img src={p.image} alt={p.name} className="w-full h-32 object-cover img-shadow" />
              <p className="mt-2 font-semibold text-blue-700">₹{p.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
