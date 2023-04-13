const express = require("express");
const cookieParser = require("cookie-parser");
const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");
const productReviewRouter = require("./routes/productReviewsRoutes");
const orderRouter = require("./routes/orderRoutes");
const payment = require("./routes/paymentRoutes");
const app = express();
//Razor pay

const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(fileUpload());
// app.use(express.json({ limit: "50mb" })); app.use(express.urlencoded({ limit: "50mb", extended: true }));



//product routes
app.use("/api/v1", productRouter);

//user routes
app.use("/api/v1", userRouter);

//product Reviews Router
app.use("/api/v1", productReviewRouter);

//product Reviews Router
app.use("/api/v1", orderRouter);

//payment process Router
app.use("/api/v1", payment);

module.exports = app;
