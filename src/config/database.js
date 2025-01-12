const mongoose = require("mongoose");

const connectDB = async () => {
  return await mongoose.connect("mongodb+srv://barathbaisetty:7jXCFMDQwCreAGML@devtindermongo.wslqy.mongodb.net/?retryWrites=true&w=majority&appName=DevTinderMongo/devTinder");
};


module.exports = connectDB;