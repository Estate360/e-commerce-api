// const express = require("express");

// const reviewControllers = require("../controllers/reviewController");
// const authController = require("../controllers/authController");

// const router = express.Router();

// router.use(authController.protect);

// router
//   .route("/")
//   .get(reviewControllers.getAllReviews)
//   .post(
//     authController.restrictTo("user"),
//     reviewControllers.setTourUserId,
//     reviewControllers.createReview
//   );

// router
//   .route("/:id")
//   .get(reviewControllers.getParticularReview)
//   .delete(
//     authController.restrictTo("user", "admin"),
//     reviewControllers.deleteReview
//   )
//   .patch(
//     authController.restrictTo("user", "admin"),
//     reviewControllers.updateReview
//   );

// module.exports = router;
