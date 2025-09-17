const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Get cart of logged-in user
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");
    if (!cart) return res.json({ items: [] });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if(!productId){
      return res.status(400).json({message:" Product ID is required"});
    }

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }

    const itemIndex = cart.items.findIndex(i => i.product.toString() === productId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity || 1;
    } else {
      cart.items.push({ product: productId, quantity: quantity || 1 });
    }

    await cart.save();
    await cart.populate("items.product"); 

    console.log("saved cart", cart);
    res.status(201).json(cart);
  } catch (err) {
    console.error("Error in addToCart:", err);
    res.status(500).json({ message: err.message });
  }
};

//  Remove item
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(i => i.product.toString() !== productId);

    await cart.save();
    await cart.populate("items.product");
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update quantity
exports.updateQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex(i => i.product.toString() === productId);
    if (itemIndex === -1) return res.status(404).json({ message: "Item not in cart" });

    cart.items[itemIndex].quantity = quantity;
    await cart.save();
    await cart.populate("items.product");

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
