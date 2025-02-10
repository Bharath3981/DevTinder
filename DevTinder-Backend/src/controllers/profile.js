const encryptString = require("../utils/encryptStrings");
const {
  validateProfileEditData,
  comparePass,
  validatePassword,
  generateResponse,
} = require("../utils/helper");

const editProfile = async (req, res) => {
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
};

const viewProfile = async (req, res) => {
  try {
    const user = req.user;
    generateResponse(res, 200, "User details fetched", user);
  } catch (err) {
    generateResponse(res, 400, "Something went wrong: " + err);
  }
};

const updatePassword = async (req, res) => {
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
};

module.exports = {
  editProfile,
  viewProfile,
  updatePassword,
};
