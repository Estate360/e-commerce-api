const express = require("express");

const AppError = require("./utilities/AppError");
const globalErrorHandler = require("./controllers/errController");
const userRouter = require("./routes/userRoutes");

const app = express();
app.use(express.json());

app.use("/api/v1/users", userRouter);

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString;
  //   console.log(req.headers);
  next();
});

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
