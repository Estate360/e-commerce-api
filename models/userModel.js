const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please input your username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please input your email"],
      unique: true,
      lowercase: true,
      validate: [
        validator.isEmail,
        "Please provide a valid email, example@gmail.com",
      ],
    },
    password: {
      type: String,
      required: [true, "Please input your password"],
      minLength: 8,
      select: false,
    },
    passwordComfirm: {
      type: String,
      required: [true, "Please comfirm your password"],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Passwords are not the same",
      },
    },
    passwordResetAt: Date,
    photo: String,
    role: {
      type: String,
      enum: [],
      default: "user",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
  { timestamps: true }
);

//INSTANCE METHOD DEFINATION;
userSchema.methods.checkCorrectPassword = async function (
  inputedPassord,
  originalPassword
) {
  return await bcrypt.compare(inputedPassord, originalPassword);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
