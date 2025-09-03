import React from "react";
import products from "../data/products";
import ProductCard from "./ProductCard";

const ProductsGrid = () => {
  return (
    <section className="py-10 px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductsGrid;
