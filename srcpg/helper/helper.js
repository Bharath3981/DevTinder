const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const encryptString = async (someString) => {
  console.log("encryptStin: ", someString);
  const stringHash = await bcrypt.hash(someString, 10);
  console.log("stringhash: ", stringHash);
  return stringHash;
};

const getJWT = async function (userEmail) {
  const user = this;
  const token = await jwt.sign({ useremail: userEmail }, "devTinder", {
    expiresIn: "1h",
  });
  return token;
};

module.exports = { encryptString, getJWT };
