const Order = require("../models/Order");

// Place order
exports.placeOrder = async (req, res) => {
  try {
    const order = new Order({ ...req.body, user: req.user.id });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get user orders
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate("products.product");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
