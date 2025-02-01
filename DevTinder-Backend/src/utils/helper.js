const validator = require("validator");
const bcrypt = require("bcrypt");
const User = require("../config/models/user");
const jwt = require("jsonwebtoken");
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

const comparePass = async (password1, passwordHash) => {
  return await bcrypt.compare(password1, passwordHash);
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

const validatePassword = (password) => {
  if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password!");
  } else {
    return true;
  }
};

const validateProfileEditData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "photoUrl",
    "gender",
    "age",
    "about",
    "skills",
    "city",
  ];
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );
  return isEditAllowed;
};

const userAuth = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      throw new Error("Please login again");
    }
    console.log(token, process.env.JWT_SECRET);
    const decodedObj = jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = decodedObj;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    generateResponse(res, 401, err.message);
  }
};

//Generate success or error response
const generateResponse = (res, statusCode, message, data = {}) => {
  res.status(statusCode).json({
    message,
    data,
  });
};

module.exports = {
  userAuth,
  validateSignUpData,
  encryptString,
  comparePassword,
  validateProfileEditData,
  comparePass,
  validatePassword,
  generateResponse,
};
