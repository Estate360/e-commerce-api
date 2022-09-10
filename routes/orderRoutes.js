// const express = require("express");

// const orderController = require("../controllers/orderController");
// const authController = require("../controllers/authController");

// const router = express.Router();

// router
//   .route("/")
//   .get(
//     authController.protect,
//     authController.restrictTo("user", "admin"),
//     orderController.getAllOrder
//   )
//   .post(authController.protect, orderController.createOrder);

// router.route("/:id").get(orderController.getParticularOrder);
