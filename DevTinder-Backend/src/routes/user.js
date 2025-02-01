const express = require("express");
const multer = require("multer");
const path = require("path");
const userRouter = express.Router();
const User = require("../config/models/user");
const { userAuth, generateResponse } = require("../utils/helper");
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
// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads"); // Specify the destination directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Specify the file name
  },
});
const upload = multer({ storage: storage });

// Generate openapi docs for user routes
/**
 * @swagger
 * /user/view:
 *   get:
 *     summary: Get user details
 *     tags: [User]
 *     description: Get the details of the logged in user
 *     responses:
 *       200:
 *         description: User details fetched
 *       400:
 *         description: Something went wrong
 */
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

// Generate openapi docs for connections route
userRouter.get("/connections", userAuth, async (req, res) => {
  try {
    const user = req.user;
    const requests = await ConnectionRequestModel.find({
      $or: [{ sender: user._id }, { receiver: user._id }],
      status: "accepted",
    })
      .populate("sender", responseFields)
      .populate("receiver", responseFields);
    generateResponse(res, 200, "your connections", requests);
  } catch (err) {
    generateResponse(res, 400, "Something went wrong: " + err.errmsg);
  }
});

// Generate openapi docs for upload route
/**
 * @swagger
 * /user/upload:
 *   post:
 *     summary: Upload profile photo
 *     tags: [User]
 *     description: Upload profile photo for the logged in user
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilePhoto:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Photo uploaded successfully
 *       400:
 *         description: No file uploaded
 */
userRouter.post(
  "/upload",
  userAuth,
  upload.single("profilePhoto"),
  async (req, res) => {
    try {
      const user = req.user;
      if (!req.file) {
        return generateResponse(res, 400, "No file uploaded");
      }
      let path = "user/" + req.file.path;
      user.photoUrl = path;
      await user.save();
      generateResponse(res, 200, "Photo uploaded successfully", user);
    } catch (err) {
      generateResponse(res, 400, "Something went wrong: " + err.errmsg);
    }
  }
);

//Generate openapi docs for feed route
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
    generateResponse(res, 200, "Feed", users);
  } catch (err) {
    generateResponse(res, 400, "Something went wrong: " + err.errmsg);
  }
});

module.exports = userRouter;
