const {
  createUser,
  updateUser,
  checkEmailAndPassword,
} = require("../config/database");
const { encryptString, getJWT } = require("../helper/helper");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
  try {
    //const response = await pool.query("SELECT * FROM users");
    res.status(200).json("Request received");
  } catch (error) {
    console.log(error);
    res.send("Error: " + error);
  }
};

// const signupUser = async (req, res) => {
//   try {
//     req.body.userpassword = await encryptString(req.body.userpassword);
//     const response = await createUser(req.body);
//     res.status(200).json("User signup successfully");
//   } catch (error) {
//     console.error(error);
//     res.status(400).send(error.message);
//   }
// };

const signupUser = async (body) => {
  console.log("From signupuser: ", body);
  try {
    body.userpassword = await encryptString(body.userpassword);
    await createUser(body);
    return "User signup successfully";
  } catch (error) {
    throw new Error(error.message);
  }
};

const loginUser = async (req, res) => {
  const { useremail, userpassword } = req.body;
  try {
    const isPasswordValid = await checkEmailAndPassword(
      useremail,
      userpassword
    );
    console.log("isPasswordValid: ", isPasswordValid);
    if (isPasswordValid) {
      const token = await getJWT(useremail);
      console.log("Token: ", token);
      res.cookie("token", token, {
        expires: new Date(Date.now() + 1 * 3600000),
      }); // Expires in 1 day
      res.send("Login Successfull!!");
    } else {
      res.status(400).send("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("Invalid credentials");
  }
};

const updateUserData = async (req, res) => {
  const mergedUser = { ...req.user[0], ...req.body };
  console.log("Merged: ", mergedUser);
  const response = await updateUser(mergedUser);
  res.status(200).json("Updated successfully");
};

const getProfile = async (req, res) => {
  res.send(req.user);
};

module.exports = {
  getUsers,
  signupUser,
  loginUser,
  getProfile,
  updateUserData,
};
