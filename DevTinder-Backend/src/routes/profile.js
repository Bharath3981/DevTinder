const express = require("express");
const encryptString = require("../utils/encryptStrings");
const {
  userAuth,
  validateProfileEditData,
  comparePass,
  validatePassword,
  generateResponse,
} = require("../utils/helper");
const profileRouter = express.Router();

profileRouter.get("/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    generateResponse(res, 200, "User details fetched", user);
  } catch (err) {
    generateResponse(res, 400, "Something went wrong: " + err);
  }
});

profileRouter.patch("/edit", userAuth, async (req, res) => {
  try {
    if (!validateProfileEditData(req)) {
      throw new Error("Invalid Edit Request");
    } else {
      let loggedInUser = req.user;
      Object.keys(req.body).forEach(
        (key) => (loggedInUser[key] = req.body[key])
      );
      await loggedInUser.save();
      generateResponse(res, 200, "Updated successfully", loggedInUser);
    }
  } catch (err) {
    generateResponse(res, 400, "Error: " + err.message);
  }
});

profileRouter.post("/password", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const newPassword = req.body.newPassword;
    if (!comparePass(req.body.oldPassword, loggedInUser.password)) {
      throw new Error("Invalid old password");
    }
    if (validatePassword(newPassword)) {
      const newPasswordHash = await encryptString(newPassword);
      loggedInUser.password = newPasswordHash;
      loggedInUser.save();
    }

    res.status(200).send("Password updated successfully.!");
  } catch (err) {
    res.status(400).send("Error: " + err);
  }
});

module.exports = profileRouter;
