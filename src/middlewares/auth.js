const jwt = require("jsonwebtoken");
const User = require("../models/user")

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid Token...")
    }
    const data = await jwt.verify(token, "DevTest@555");
    const { userId } = data;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User does not exist");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
};

module.exports = { userAuth }