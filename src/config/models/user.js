const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: (value) => {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email address: " + value);
      }
    },
  },
  password: {
    type: String,
    required: true,
    validate: (value) => {
      if (!validator.isStrongPassword(value)) {
        throw new Error("Please use strong password!");
      }
    },
  },
  age: {
    type: Number,
    min: 18,
    max: 60,
  },
  gender: {
    type: String,
    required: true,
    validate: (value) => {
      if (!["male", "female", "others"].includes(value)) {
        throw new Error("Gender datais is not valid");
      }
    },
  },
  city: {
    type: String,
  },
  photoUrl: {
    type: String,
    default:
      "https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg",
  },
  about: {
    type: String,
    default: "This is default about section.",
  },
  skills: {
    type: [String],
  },
});
userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "devTinder", {
    expiresIn: "1h",
  });
  return token;
};
const User = mongoose.model("User", userSchema);
module.exports = User;
