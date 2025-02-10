const express = require("express");
const { userAuth } = require("../middlewares/auth");
const {
  editProfile,
  viewProfile,
  updatePassword,
} = require("../controllers/profile");
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
  viewProfile(req, res);
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
  editProfile(req, res);
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
  updatePassword(req, res);
});

module.exports = profileRouter;
