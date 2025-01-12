const express = require("express");
const connectDB = require("./config/database");
const User = require("./config/models/user");
const { validateSignUpData, comparePassword } = require("./utils/helper");
const encryptString = require("./utils/encryptStrings");

const app = express();

app.use(express.json());

app.get("/user", async (req, res) => {
  try {
    const user = await User.find(req.body);
    if (user.length) {
      res.send(user);
    } else {
      res.status(404).send("User not found with emailId: " + req.body.emailId);
    }
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.errmsg);
  }
});
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.errmsg);
  }
});
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const isPasswordValid = await comparePassword(password, emailId);
    if (isPasswordValid) {
      res.send("Login Successfull!!");
    } else {
      throw new Error("Email or password invalid");
    }
  } catch (err) {
    res.status(400).send("Something went wrong: " + err);
  }
});
app.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    req.body.password = await encryptString(req.body.password);
    const user = new User(req.body);
    await user.save();
    console.log(user);
    res.status(200).send("User saved successfully!");
  } catch (err) {
    res.status(400).send("Something went wrong: " + err);
  }
});
app.delete("/user", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.body.userId);
    console.log(user);
    if (user) {
      res.send("User with id: " + req.body.userId + "  Deleted successfully!");
    } else {
      res.status(404).send("User not found with userId: " + req.body.userId);
    }
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.errmsg);
  }
});

app.patch("/user", async (req, res) => {
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
    const isUpdatedAllowed = Object.keys(data).every((k) => {
      return ALLOWED_UPDATES.includes(k);
    });
    if (!isUpdatedAllowed) {
      throw new Error("Update not allowed");
    }
    const user = await User.findByIdAndUpdate(data.userId, data);
    console.log(user);
    if (user) {
      res.send("User with id: " + req.body.userId + "  updated successfully!");
    } else {
      res.status(404).send("User not found with userId: " + req.body.userId);
    }
  } catch (err) {
    res.status(400).send("Something went wrong: " + err.errmsg);
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established");
    app.listen(3000, () => {
      console.log("Server is succesfully listening on port 3000");
    });
  })
  .catch((err) => {
    console.error("Database connot be connected");
  });
