import React from "react";
import products from "../data/products";

const ProductsGrid = () => {
  return (
    <section className="py-10 px-6">
      {/* <h2 className="text-2xl font-bold mb-6">Featured Products</h2> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-xl p-4 shadow hover:shadow-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg"
            />
            <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
            <p className="text-gray-700">₹{product.price}</p>
            <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductsGrid;
