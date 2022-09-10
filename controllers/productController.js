const Product = require("../models/productModel");
const factoryControl = require("./generalFactoryController");

exports.createProduct = factoryControl.createAction(Product);
exports.getAllProducts = factoryControl.getAllAction(Product);
exports.getParticularProduct = factoryControl.getOneAction(Product);
exports.updateProduct = factoryControl.updateAction(Product);
exports.deleteProduct = factoryControl.deleteAction(Product);
