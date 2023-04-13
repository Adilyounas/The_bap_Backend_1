
//router file in routes
const express = require("express")
const router = express.Router()
const {authentication} = require("../Authentication/auth")
const {processPayment, paymentVerification, sendAPiKEY, placeOrder} = require("../controllers/paymentController")

router.route("/payment/process").post(authentication,processPayment)
router.route("/paymentVerification").post(authentication,paymentVerification)
router.route("/razorApiKey").get(authentication,sendAPiKEY)
router.route("/placeOrder").put(authentication,placeOrder)



module.exports = router