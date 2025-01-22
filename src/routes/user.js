const express = require("express");
const userRouter = express.Router();
const User = require("../config/models/user");
const { userAuth } = require("../utils/helper");
const ConnectionRequestModel = require("../config/models/connectionRequest");

//get all the pending connection requests
userRouter.get("/requests/received", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const requests = await ConnectionRequestModel.find({
      receiver: user._id,
      status: "interested",
    })
      .populate("sender", ["firstName", "lastName", "emailId"])
      .populate("receiver", ["firstName", "lastName", "emailId"]);

    res.json({
      message: "Received requests",
      data: requests,
    });
  } catch (err) {
    res.status(400).send("Something went wrong: " + err);
  }
});

//get all the connection requests
userRouter.get("/connections", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const requests = await ConnectionRequestModel.find({
      $or: [{ sender: user._id }, { receiver: user._id }],
      status: "accepted",
    })
      .populate("sender", ["firstName", "lastName", "emailId"])
      .populate("receiver", ["firstName", "lastName", "emailId"]);

    res.json({
      message: "your connections",
      data: requests,
    });
  } catch (err) {
    res.status(400).send("Something went wrong: " + err);
  }
});

module.exports = userRouter;
