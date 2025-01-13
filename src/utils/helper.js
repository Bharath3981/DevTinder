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
  if (isPasswordValid) {
    return user.getJWT();
  } else {
    return isPasswordValid;
  }
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

const userAuth = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    console.log("userAuth called");
    if (!token) {
      throw new Error("Token is not valid");
    }
    const decodedObj = await jwt.verify(token, "devTinder");
    const { _id } = decodedObj;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

const isAuthorizedRequest = (req) => {};

module.exports = {
  userAuth,
  validateSignUpData,
  encryptString,
  comparePassword,
};
