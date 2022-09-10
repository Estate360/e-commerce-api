const express = require("express");
const productController = require("../controllers/productController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(productController.getAllProducts)
  .post(authController.protect, productController.createProduct);

router
  .route("/:id")
  .get(productController.getParticularProduct)
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    productController.updateProduct
  )
  .delete(
    authController.productController,
    authController.restrictTo("admin"),
    productController.deleteProduct
  );

module.exports = router;
