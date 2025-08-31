import React from "react";

const categories = [
  { id: 1, name: "Mobiles", image: "" },
  { id: 2, name: "Laptops", image: "" },
  { id: 3, name: "Audio", image: "" },
  { id: 4, name: "Accessories", image: "" },
];

const Categories = () => {
  return (
    <section className="py-10 px-6">
      <h2 className="text-2xl font-bold mb-6">Shop by Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className="border rounded-lg p-4 shadow hover:shadow-lg text-center">
            <img src={cat.image} alt={cat.name} className="w-full h-32 object-cover rounded" />
            <h3 className="mt-2 font-semibold">{cat.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
