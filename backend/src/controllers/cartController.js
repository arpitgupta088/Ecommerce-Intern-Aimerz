const Cart = require("../models/Cart");

// Get cart of logged-in user
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.json({ items: [] });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const { id, name, price, image, quantity } = req.body;

    if (!id || !name) {
      return res.status(400).json({ message: "Product data is required" });
    }

    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = new Cart({ user: req.user.id, items: [] });
    }

    // check agar product already cart me hai
    const itemIndex = cart.items.findIndex(i => i.productId === id);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity || 1;
    } else {
      cart.items.push({
        productId: id,
        name,
        price,
        image,
        quantity: quantity || 1,
      });
    }

    await cart.save();

    console.log("Cart saved:", cart);
    res.status(201).json(cart);
  } catch (err) {
    console.error("Error in addToCart:", err);
    res.status(500).json({ message: err.message });
  }
};


// Remove item
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body; // dummy productId bhejna hoga
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(i => i.productId !== productId);

    await cart.save();
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

    const itemIndex = cart.items.findIndex(i => i.productId === productId);
    if (itemIndex === -1) return res.status(404).json({ message: "Item not in cart" });

    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
