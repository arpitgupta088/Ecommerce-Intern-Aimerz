const mongoose = require("mongoose");

const returnRequestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  reason: { type: String, required: true },
  status: {type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
}, {timestamps: true });

module.exports = mongoose.model("ReturnRequest", returnRequestSchema);
