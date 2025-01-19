const express = require("express");
const connectDB = require("./config/database");
const User = require("./config/models/user");
const { userAuth } = require("./utils/helper");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong.!");
  }
});

app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/", requestRouter);

app.get("/user", userAuth, async (req, res) => {
  try {
    const user = req.user;
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
