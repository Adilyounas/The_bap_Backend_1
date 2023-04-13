const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },

  orderItems: [
    {
      id: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
       
      },
      name: {
        type: String,
        required: true,
        default:"P",
      },
      price: {
        type: Number,
        required: true,
        default:0,
      },
      quantity: {
        type: Number,
        required: true,
        default:0,
      },
      image: {
        type: String,
        required: true,
        default:"P",
      },
    },
  ],
  subTotal: {
    type: Number,
    required: true,
    default:0,
  },
  tax: {
    type: Number,
    required: true,
    default:0,
  },
  shippingTax: {
    type: Number,
    required: true,
    default:0,
  },
  total: {
    type: Number,
    required: true,
    default:0,
  },
  razorpay_order_id:{
    type:String,
    required:true,
  },
  razorpay_payment_id:{
    type:String,
    required:true,
  },
  razorpay_signature:{
    type:String,
    required:true,
  },


  paidAt: {
    type: Date,
    required: true,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "Processing",
  },
  shippingInfo: {
    address: {
      type: String,
      required: true,
      default:"P",
    },
    country: {
      type: String,
      required: true,
      default:"P",
    },
    state: {
      type: String,
      required: true,
      default:"P",
    },
    city: {
      type: String,
      required: true,
      default:"P",
    },
    phone: {
      type: Number,
      required: true,
      default:0,
    },
    pinCode: {
      type: Number,
      required: true,
      default:0,
    },
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

module.exports = new mongoose.model("Order", orderSchema);
