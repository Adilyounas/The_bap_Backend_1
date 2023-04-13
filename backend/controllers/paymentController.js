const Razorpay = require("razorpay");
const instance = new Razorpay({
  key_id: "rzp_test_mFRPpL3UmG6jAw",
  key_secret: "Fqtl97MEgSMhlpJrz5RMqboq",
});
const crypto = require("crypto");
const Order = require("../models/orderModel");

//it is like make things ready
const processPayment = async (req, res) => {
  try {
    const options = {
      amount: req.body.amount, // amount in the smallest currency unit
      currency: "PKR",
    };
    const order = await instance.orders.create(options);
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

//sending key
const sendAPiKEY = async (req, res) => {
  res.status(200).json({
    success: true,
    key_secret: "rzp_test_mFRPpL3UmG6jAw",
  });
};

const paymentVerification = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", "Fqtl97MEgSMhlpJrz5RMqboq")
      .update(body.toString())
      .digest("hex");
    // razorpay_signature must = expectedSignature
    console.log("sig received ", razorpay_signature);
    console.log("sig generated ", expectedSignature);

    const Authenticated = razorpay_signature === expectedSignature;

    if (Authenticated) {
      const order = await Order.create({
        user: req.user._id, //done
        razorpay_order_id: razorpay_order_id,
        razorpay_payment_id: razorpay_payment_id,
        razorpay_signature: razorpay_signature,

        paidAt: Date.now(), //done
      });

      res
        .status(201)
        .redirect(
          `http://localhost:3000/paymentuccess?reference=${razorpay_payment_id}`
        );
    } else {
      res.status(400).json({
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

//place order
const placeOrder = async (req, res) => {
  try {
    const {orderItems, shippingInfo,subTotal,tax,shippingTax,total,referenceNum } = await req.body
    
    const order = await Order.findOne( {razorpay_payment_id:referenceNum } );
    if (!order) {
      return res.status(400).json({
        success: false,
        message: "Order not found",
        
      });
    }


    const updataOrder = await Order.findByIdAndUpdate(order._id,{ orderItems,shippingInfo,subTotal,tax,shippingTax,total}
    );
    res.status(200).json({
      success: true,
      updataOrder
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

module.exports = {
  processPayment,
  paymentVerification,
  sendAPiKEY,
  placeOrder,
};
