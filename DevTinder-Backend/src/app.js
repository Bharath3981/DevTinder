const express = require("express");
const connectDB = require("./config/database");
const User = require("./config/models/user");
const { userAuth, generateResponse } = require("./utils/helper");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");
const path = require("path");
const swaggerJsdoc = require("./utils/swagger");

const app = express();

require("dotenv").config();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Serve static files from the 'uploads' directory
app.use(
  "/user/uploads",
  userAuth,
  express.static(path.join(__dirname, "..", "uploads"))
);
app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong.!");
  }
});

app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/request", requestRouter);
app.use("/user", userRouter);

connectDB()
  .then(() => {
    console.log("Database connection established");
    app.listen(3981, () => {
      console.log("Server is succesfully listening on port 3981");
      swaggerJsdoc(app, 3981);
    });
  })
  .catch((err) => {
    console.error("Database connot be connected");
  });
