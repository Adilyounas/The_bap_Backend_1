const express = require("express");
const {
  createProductReview, getProductReview, deleteReview,
} = require("../controllers/productReviewController");
const router = express.Router();
const { authentication, authRoles } = require("../Authentication/auth");


//create review
router.route("/create/Review").put(authentication,createProductReview )

//get single product review
router.route("/productReview").get(authRoles("admin"), authentication,getProductReview )

//delete single product review
router.route("/deleteReview").delete(authRoles("admin"), authentication,deleteReview )


module.exports = router