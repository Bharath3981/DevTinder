const express = require("express");
const encryptString = require("../utils/encryptStrings");
const User = require("../config/models/user");
const {
  validateSignUpData,
  comparePassword,
  userAuth,
  generateResponse,
} = require("../utils/helper");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    req.body.password = await encryptString(req.body.password);
    const user = new User(req.body);
    await user.save();
    res.status(200).send("User saved successfully!");
  } catch (err) {
    res.status(400).send("Something went wrong: " + err);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid creadentials");
    }
    const isValidPassword = await user.validatePassword(password);
    if (isValidPassword) {
      res.cookie("token", await user.getJWT(), {
        expires: new Date(Date.now() + 1 * 3600000),
      }); // Expires in 1 day
      generateResponse(res, 200, "Login Successfull!!", user);
    } else {
      throw new Error("Email or password invalid");
    }
  } catch (err) {
    generateResponse(res, 400, err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  generateResponse(res, 200, "Logged out successfully.");
});

module.exports = authRouter;
