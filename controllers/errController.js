const sendErrInDevelopment = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    err: err,
    message: err.message,
    stack: err.stack,
  });
};

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error!";

  if (process.env.NODE_ENV === "development") {
    sendErrInDevelopment(err, res);
  }
};

module.exports = globalErrorHandler;
