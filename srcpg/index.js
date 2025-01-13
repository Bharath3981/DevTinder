const express = require("express");
const app = express();
const { connectToDB } = require("./config/database");
const cookieParser = require("cookie-parser");

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

//routes
app.use(require("./routes/routes"));

//Server
connectToDB()
  .then((res) => {
    app.listen(3000);
  })
  .catch((res) => {
    console.log("Res: ", res);
  });
