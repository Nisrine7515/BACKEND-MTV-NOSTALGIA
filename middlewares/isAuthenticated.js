const User = require("../models/User");

const isAuthenticated = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json("Unauthorized");
    }
    const toek = req.headers.authorization.replace("Bearer ", "");
    const user = await User.findOne({ token: token });
    if (user == null) {
      return res.status(401).json("Unauthorized");
    } else {
      req.user = user;
      return next();
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

mpdule.exports = isAuthenticated;
