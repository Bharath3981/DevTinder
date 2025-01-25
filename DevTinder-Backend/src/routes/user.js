const express = require("express");
const userRouter = express.Router();
const User = require("../config/models/user");
const { userAuth } = require("../utils/helper");
const ConnectionRequestModel = require("../config/models/connectionRequest");
const responseFields = [
  "firstName",
  "lastName",
  "photoUrl",
  "about",
  "skills",
  "age",
  "gender",
  "emailId",
];
//get all the pending connection requests
userRouter.get("/requests/received", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const requests = await ConnectionRequestModel.find({
      receiver: user._id,
      status: "interested",
    })
      .populate("sender", responseFields)
      .populate("receiver", responseFields);

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
      .populate("sender", responseFields)
      .populate("receiver", responseFields);

    res.json({
      message: "your connections",
      data: requests,
    });
  } catch (err) {
    res.status(400).send("Something went wrong: " + err);
  }
});

//implement feed route
//Enable pagenation for the feed route
userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    // User should seel all the user cards except
    // 1. his own card
    // 2. the cards of the users he has already connected with
    // 3. the cards of the users he has sent connection requests to
    // 4. the cards of the users who have sent connection requests to him
    // 5. the cards of the users who have rejected him
    // 6. the cards of the users he has rejected
    // 7. the cards of the users he has blocked
    // 8. the cards of the users who have blocked him

    const loggedInuser = req.user;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    // Validate the limit query parameters
    limit = limit > 30 ? limit : 10;
    // Find all connection request either sent or received by the user
    const connectionRequests = await ConnectionRequestModel.find({
      $or: [{ sender: loggedInuser._id }, { receiver: loggedInuser._id }],
    }).select("sender receiver status");

    const hideuserFromFeed = new Set();
    connectionRequests.forEach((request) => {
      hideuserFromFeed.add(request.receiver.toString());
      hideuserFromFeed.add(request.sender.toString());
    });
    // Hide the loggedInuser from feed
    hideuserFromFeed.add(loggedInuser._id.toString());
    // find all users except hideuserFromFeed
    const users = await User.find({
      _id: { $nin: Array.from(hideuserFromFeed) },
    })
      .select("firstName lastName photoUrl about skills age gender emailId")
      .skip((page - 1) * limit) // Skip the first n users
      .limit(limit); // Limit the number of users to be returned
    // const users = await User.find({
    //   _id: { $nin: Array.from(hideuserFromFeed) },
    // }).select("firstName lastName emailId");
    res.json({
      message: "Feed",
      data: users,
    });
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.errmsg);
  }
});

module.exports = userRouter;
