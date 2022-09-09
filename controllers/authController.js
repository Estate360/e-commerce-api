const jwt = require("jsonwebtoken");
// const { promisify } = require("util");
const User = require("../models/userModel");
const catchAsyncErr = require("../utilities/catchAsyncErr");
const AppError = require("../utilities/AppError");

const signToken = function (id) {
  return jwt.sign({ id }, process.env.JWT_PRIVATE_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const sendJWTrespons = (user, statusCode, res, err) => {
  const token = signToken(user._id);
  user.password = undefined;
  // console.log(token);
  res.status(statusCode).json({
    status: "successfully",
    token,
    data: {
      user,
    },
  });
};

exports.register = catchAsyncErr(async (req, res, next) => {
  const newUser = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    passwordComfirm: req.body.passwordComfirm,
  });

  //Send token if all properties are credible
  sendJWTrespons(newUser, 201, res);
});

exports.login = catchAsyncErr(async (req, res, next) => {
  const { email, password } = req.body;
  //Check if email and password is inputed
  // if (!email || !password) {
  //   return next(new AppError("Please provide your email and password", 400));
  // }
  if (!email) {
    next(new AppError("Please provide your email ", 400));
  }
  if (!password) {
    return next(new AppError("Please provide your  password", 400));
  }
  //Check if user exist and password is correct

  //INSTANCE METHOD APPLIED (find this in the userModel).
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.checkCorrectPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  //If all is correct, then send token
  sendJWTrespons(user, 200, res);
});

// exports.protect = catchAsyncErr(async (req, res, next) => {
//   // 1) Get token and check if it exist
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     token = req.headers.authorization.split(" ")[1];
//   } else {
//     return next(
//       new AppError("You are not logged in, please login to get access", 401)
//     );
//     console.log(token);
//     //2) Verification token

//     const decoded= jwt.verify =>{
//       token,
//         process.env.JWT_PRIVATE_KEY
//       }
//   }
// });
