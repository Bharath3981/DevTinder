const bcrypt = require("bcrypt");

const encryptString = async (someString) => {
  const stringHash = await bcrypt.hash(someString, 10);
  return stringHash;
};

module.exports = encryptString;
