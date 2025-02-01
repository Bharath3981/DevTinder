const signup = async (req, res) => {
  try {
    validateSignUpData(req);
    req.body.password = await encryptString(req.body.password);
    const user = new User(req.body);
    await user.save();
    res.status(200).send("User saved successfully!");
  } catch (err) {
    res.status(400).send("Something went wrong: " + err);
  }
};
