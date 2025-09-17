const Order = require("../models/Order");
const Cart = require("../models/Cart");

// Place order
exports.placeOrder = async (req, res) => {
  try {
    const { paymentMethod, shippingAddress } = req.body;
    const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const totalAmount = cart.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    const order = new Order({
      user: req.user.id,
      items: cart.items.map((i) => ({ product: i.product._id, quantity: i.quantity })),
      totalAmount,
      paymentMethod,
      shippingAddress,
    });

    await order.save();

    // Clear the cart order place hone k baad
    cart.items = [];
    await cart.save();

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get user orders
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate("items.product");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
