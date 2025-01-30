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

//generate openapi docs for profile routes
/**
 * @swagger
 * /profile/view:
 *   get:
 *     summary: Get user details
 *     tags: [Profile]
 *     description: Get the details of the logged in user
 *     responses:
 *       200:
 *         description: User details fetched
 *       400:
 *         description: Something went wrong
 */
profileRouter.get("/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    generateResponse(res, 200, "User details fetched", user);
  } catch (err) {
    generateResponse(res, 400, "Something went wrong: " + err);
  }
});

//generate openapi docs for profile routes
/**
 * @swagger
 * /profile/edit:
 *   patch:
 *     summary: Edit user details
 *     tags: [Profile]
 *     description: Edit the details of the logged in user
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
 *               age:
 *                 type: number
 *                 format: int32
 *                 minimum: 18
 *                 maximum: 100
 *
 *     responses:
 *       200:
 *         description: Updated successfully
 *       400:
 *         description: Error
 */
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

//generate openapi docs for profile routes
/**
 * @swagger
 * /profile/password:
 *   post:
 *     summary: Change password
 *     tags: [Profile]
 *     description: Change the password of the logged in user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Error
 */
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
    generateResponse(res, 200, "Password updated successfully");
  } catch (err) {
    generateResponse(res, 400, "Error: " + err.message);
  }
});

module.exports = profileRouter;
