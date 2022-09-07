const User = require("../models/userModel");
const catchAsync = require("../utilities/catchAsyncErr");
const jwt = require("jsonwebtoken");

const signToken = function (id) {
  return jwt.sign({ id }, process.env.JWT_PRIVATE_KEY);
};

const sendJWTrespons = (user, statusCode, res, err) => {
  const token = signToken(user._id);
  user.password = undefined;

  res.status(statusCode).json({
    status: "successfully",
    token,
    data: {
      user,
    },
  });
};

exports.register = catchAsync(async (req, res, next) => {
  const newUser = User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordComfirm: req.body.passwordComfirm,
    passwordReset: req.body.passwordReset,
    role: req.body.role,
  });
  //Send token if all properties are credible
  sendJWTrespons(newUser, 201, res);
});

exports.login = catchAsyncErr(async (req, res, next) => {
  const { email, password } = req.body;
  //Check if email and password exist
  if (!email || !password) {
    return next("Please provide your email and password", 400);
  }
  //Check if user exist and password is correct

  //   const user = await User.findOne({ email });
  //   if (!user) {
  //     return next("User not found", 404);
  //   }
  //INSTANCE METHOD APPLIED INSTADE.
  const user = await User.findOne({ email }).select("+password");
  if (
    !passwordMatch ||
    !(await user.checkCorrectPassword(password, user.password))
  ) {
    return next("Incorrect email or password", 4011);
  }

  //If all is correct, then send token
  sendJWTrespons(user, 200, res);
});
