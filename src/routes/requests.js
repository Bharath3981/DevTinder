const express = require("express");
const requestRouter = express.Router();
const User = require("../config/models/user");
const { userAuth } = require("../utils/helper");
const ConnectionRequestModel = require("../config/models/connectionRequest");

requestRouter.post("/send/:status/:userId", userAuth, async (req, res) => {
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.userId;
    const status = req.params.status;
    // Check if the status is valid
    const allowedStatus = ["ignore", "interested"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid status",
        status: status,
      });
    }
    //Check if the user is trying to send request to himself
    if (fromUserId === toUserId) {
      return res.status(400).json({
        message: "You can't send request to yourself",
      });
    }
    // If there is a connection request already sent, then update the status
    const existingRequest = await ConnectionRequestModel.findOne({
      $or: [
        { sender: fromUserId, receiver: toUserId },
        { sender: toUserId, receiver: fromUserId },
      ],
    });
    if (existingRequest) {
      return res.status(400).json({
        message: "Request already sent",
        data: existingRequest,
      });
    }
    // Check if the user exists
    const isToUserExists = await User.findById(toUserId);
    if (!isToUserExists) {
      return res.status(404).json({
        message: "User not found with id: " + toUserId,
      });
    }
    // Create a new connection request
    const connectionRequest = new ConnectionRequestModel({
      sender: fromUserId,
      receiver: toUserId,
      status: status,
    });
    const data = await connectionRequest.save();
    res.json({
      message: "Request sent successfully!",
      data: data,
    });
  } catch (err) {
    res.status(400).send("Something went wrong: " + err);
  }
});

module.exports = requestRouter;
