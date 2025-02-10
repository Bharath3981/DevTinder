const encryptString = require("../utils/encryptStrings");
const User = require("../config/models/user");
const { validateSignUpData, generateResponse } = require("../utils/helper");

const signup = async (req, res) => {
  try {
    validateSignUpData(req);
    req.body.password = await encryptString(req.body.password);
    const user = new User(req.body);
    await user.save();
    generateResponse(res, 200, "User saved successfully!");
  } catch (err) {
    generateResponse(res, 400, "Something went wrong: " + err);
  }
};

/**
 * Handles user login.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.emailId - The email ID of the user.
 * @param {string} req.body.password - The password of the user.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the login process is complete.
 * @throws {Error} - Throws an error if the credentials are invalid or if there is an issue during the login process.
 */
const login = async (req, res) => {
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
};

const logout = async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  generateResponse(res, 200, "Logged out successfully.");
};

module.exports = {
  signup,
  login,
  logout,
};
