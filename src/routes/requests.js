const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../utils/helper");

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).send(user.firstName + " sent the connectiontion request!");
  } catch (err) {
    res.status(400).send("Something went wrong: " + err);
  }
});

module.exports = requestRouter;
