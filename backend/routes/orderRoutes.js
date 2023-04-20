const express = require("express");
const { createOrder, getSingleOrder, myOrders, getAllOrder, updateOrder, deleteOrder } = require("../controllers/orderController");
const router = express.Router();
const { authentication, authRoles } = require("../Authentication/auth");

//create order
router.route("/createOrder").post(authentication,createOrder)

//get single order details for user
router.route("/getOrder/:orderId").get(authentication,getSingleOrder)

//my order
router.route("/AllOrders").get(authentication,myOrders)

//get all orders
router.route("/admin/getAllOrders").get(authentication,authRoles("admin"),getAllOrder)


//update order
router.route("/admin/updateOrder/:orderId").put(authentication,authRoles("admin"),updateOrder)

//delete order
router.route("/admin/deleteOrder/:orderId").delete(authentication,authRoles("admin"),deleteOrder)

module.exports = router