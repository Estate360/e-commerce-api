const User = require("../models/userModel");
const factoryControl = require("./generalFactoryController");

exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error!",
    message: "This route is not defined!, please use /register",
  });
};
exports.getAllUsers = factoryControl.getAllAction(User);
exports.getParticularUser = factoryControl.getOneAction(User);
exports.updateUser = factoryControl.updateAction(User);
exports.deleteUser = factoryControl.deleteAction(User);
