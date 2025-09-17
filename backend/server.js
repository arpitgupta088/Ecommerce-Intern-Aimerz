require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("./src/config/passport");
const session = require("express-session");
const connectDB = require("./src/config/db");
const cartRoutes = require("./src/routes/cartRoutes");




const app = express();

// ------------------- MIDDLEWARES -------------
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// ------------------- ROUTES ------------------
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", require("./src/routes/authRoutes"));
app.use("/api/returns", require("./src/routes/returnsRoutes"));
app.use("/api/cart", cartRoutes);
app.use("/api/products", require("./src/routes/productRoutes"));
app.use("/api/orders", require("./src/routes/orderRoutes"));




// Database and server connect kiya
connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// ------------------- ERROR HANDLER ------------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something broke!" });
});

