const validator = require("validator");
const bcrypt = require("bcrypt");
const User = require("../config/models/user");

const encryptString = async (someString) => {
  const stringHash = await bcrypt.hash(someString, 10);
  return stringHash;
};

const comparePassword = async (enteredPass, emailId) => {
  const user = await User.findOne({ emailId: emailId });
  if (!user) {
    throw new Error("EmailId is not registered");
  }
  const isPasswordValid = await bcrypt.compare(enteredPass, user.password);
  return isPasswordValid;
};

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid!");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password!");
  }
};

module.exports = { validateSignUpData, encryptString, comparePassword };
