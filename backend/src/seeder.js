require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");
const connectDB = require("./config/db");

connectDB();

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany([
      {
        name: "Samsung Galaxy M30s",
        price: 13999,
        image:
          "https://www.xparts.in/wp-content/uploads/2024/12/Samsung-Galaxy-M30s-Back-Housing-3-1-600x600.png",
      },
      {
        name: "iPhone 14",
        price: 79999,
        image: "",
      },
      {
        name: "OnePlus Nord",
        price: 29999,
        image: "xyz",
      },
    ]);
    console.log("Products Seeded");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedProducts();
