const express = require("express");
const morgan = require("morgan");

const AppError = require("./utilities/AppError");
const globalErrorHandler = require("./controllers/errController");
const userRouter = require("./routes/userRoutes");
// const productRouter = require("./routes/productRoutes");
// const reviewRouter = require("./routes/reviewRoutes");
// const orderRouter = require("./routes/orderRoutes");
// const cartRouter = require("./routes/cartRoutes");

const app = express();
app.use(express.json());

//Development Login
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString;
  //   console.log(req.headers);
  next();
});

app.use("/api/v1/users", userRouter);
// app.use("/api/v1/products", productRouter);
// app.use("/api/v1/reviews", reviewRouter);
// app.use("/api/v1/orders", orderRouter);
// app.use("/api/v1/carts", cartRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
