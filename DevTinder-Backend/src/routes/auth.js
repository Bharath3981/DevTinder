const express = require("express");

const { signup, logout, login } = require("../controllers/auth");

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
  signup(req, res);
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
  login(req, res);
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
  logout(req, res);
});

module.exports = authRouter;
