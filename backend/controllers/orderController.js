const Order = require("../models/orderModel");
const Product = require("../models/productModel");

//create order
const createOrder = async (req, res) => {
  try {
    // const order = await Order.create({
    //   user: req.user._id, //done
    //   orderItems: req.body.orderItems, //done
    //   paidAt: Date.now(), //done
    //   shippingInfo: req.body.shippingInfo,//done
    //   subTotal:req.body.subTotal, //done
    //   tax:req.body.tax,
    //   shippingTax:req.body.shippingTax,
    //   total:req.body.Total,
    //   razorpay_order_id
    //   razorpay_payment_id
    //   razorpay_signature
    // });
    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//get single order
const getSingleOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate(
      "user",
      "name email"
    );
    if (!order) {
      return res.status(400).json({
        success: false,
        message: `order is not found with this Id`,
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//my orders
const myOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    if (!orders) {
      return res.status(400).json({
        success: false,
        message: `orders is not found with this Id`,
      });
    }

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//get All orders  --admin
const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find();

    if (!orders) {
      return res.status(400).json({
        success: false,
        message: `orders is not found with this Id`,
      });
    }
    let totalAmount = 0;
    orders.forEach((order) => {
      totalAmount += order.total;
    });

    res.status(200).json({
      success: true,
      totalAmount,
      length: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

//update order  --admin
const updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate(
      "user",
      "name email"
    );

    if (!order) {
      return res.status(400).json({
        success: false,
        message: `order is not found with this Id`,
      });
    }

    if (order.orderStatus === "Delivered") {
      return res.status(400).json({
        success: false,
        message: `order is already Delivered`,
      });
    }

    if (req.body.status === "Shipped") {
      order.orderItems.forEach(async (order) => {
        await stockUpdate(order._id, order.quantity);
      });
      order.orderStatus = req.body.status;

    }

    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
      order.orderStatus = req.body.status;
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      message: "Order is updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

async function stockUpdate(productId, quantity) {
  let product = await Product.findById(productId);
  if (!product) {
  return  console.log("Product not found");
  }
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

//delete order --admin
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.status(400).json({
        success: false,
        message: `orders is not found with this Id`,
      });
    }

    await order.deleteOne({_id:req.params.orderId})

    res.status(200).json({
      success: true,
      message: "order is deleted permanently",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getSingleOrder,
  myOrders,
  getAllOrder,
  updateOrder,
  deleteOrder,
};
