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

//Write openapi docs for signup route
/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Signup
 *     tags: [Auth]
 *     description: Signup to the application
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               emailId:
 *                 type: string
 *               password:
 *                 type: string
 *               age:
 *                 type: number
 *                 format: int32
 *                 minimum: 18
 *                 maximum: 100
 *               gender:
 *                 type: string
 *               city:
 *                 type: string
 *               about:
 *                 type: string
 *               skills:
 *                 type: array
 *     responses:
 *       200:
 *         description: User saved successfully
 *       400:
 *         description: Something went wrong
 */
authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    req.body.password = await encryptString(req.body.password);
    const user = new User(req.body);
    await user.save();
    generateResponse(res, 200, "User saved successfully!", user);
  } catch (err) {
    generateResponse(res, 400, "Something went wrong: " + err);
  }
});

// Write openapi docs for login route
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login
 *     tags: [Auth]
 *     description: Login to the application
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               emailId:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 */
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

// Write openapi docs for logout route
/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout
 *     tags: [Auth]
 *     description: Logout from the application
 *     responses:
 *       200:
 *         description: Logout successful
 */
authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  generateResponse(res, 200, "Logged out successfully.");
});

module.exports = authRouter;
