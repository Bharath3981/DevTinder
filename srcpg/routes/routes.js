const { Router } = require("express");
const { userAuth } = require("../config/database");
const router = Router();
const {
  getUsers,
  signupUser,
  loginUser,
  getProfile,
} = require("../controllers/userController");

router.post("/signup", signupUser);
router.get("/user", getUsers);
router.post("/login", loginUser);

router.get("/profile", userAuth, getProfile);

module.exports = router;
