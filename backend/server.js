const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// env config kiya h
dotenv.config();

// database connect kiya h
connectDB();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// test route banaya
app.get("/", (req, res) => {
  res.send("API is running...");
});

// app.use("/api/users", require("./routes/userRoutes"));
// app.use("/api/products", require("./routes/productRoutes"));
// app.use("/api/orders", require("./routes/orderRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
