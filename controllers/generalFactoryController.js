const catchAsyncErr = require("../utilities/catchAsyncErr");

//This returns all the function for individual controller modules.

exports.deleteAction = (Model) =>
  catchAsyncErr(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next("No document found with that ID", 404);
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  });

exports.updateAction = (Model) =>
  catchAsyncErr(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next("No document found with that ID", 404);
    }
    // console.log(req.body);
    res.status(200).json({
      status: "successfully updated",
      message: "This route is still under process",
      data: {
        data: doc,
      },
    });
  });

exports.createAction = (Model) =>
  catchAsyncErr(async (req, res, next) => {
    const newDoc = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      message: "This route is still under process",
      data: {
        data: newDoc,
      },
    });
  });

exports.getOneAction = (Model) =>
  catchAsyncErr(async (req, res, next) => {
    const doc = Model.findById(req.params.id);

    if (!doc) {
      return next("No document found with that ID", 404);
    }

    res.status(200).json({
      status: "success",
      message: "This route is still under process",
      data: {
        data: doc,
      },
    });
  });

exports.getAllAction = (Model) =>
  catchAsyncErr(async (req, res, next) => {
    const doc = await Model.find();

    //SEND RESPONDS
    res.status(200).json({
      status: "success",
      result: doc.length,
      data: {
        data: doc,
      },
    });
  });
