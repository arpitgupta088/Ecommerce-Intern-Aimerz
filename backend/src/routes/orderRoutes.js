const express = require("express");
const router = express.Router();
const { placeOrder, getMyOrders } = require("../controllers/orderController");
const { verifyUser } = require("../middleware/auth");

router.post("/", verifyUser, placeOrder);
router.get("/myorders", verifyUser, getMyOrders);

module.exports = router;
