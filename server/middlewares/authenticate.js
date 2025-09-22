const jwt = require('jsonwebtoken');
const User = require("../models/schema");
const { decrypt } = require("../models/EncDecManager");

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwtoken;

    if (!token) {
      return res.status(401).json({ error: "No token provided, unauthorized user." });
    }

    const verify = jwt.verify(token, process.env.SECRET_KEY);

    const rootUser = await User.findOne({ 
      _id: verify._id, 
      "tokens.token": token 
    });

    if (!rootUser) {
      return res.status(401).json({ error: "User not found, unauthorized." });
    }

    // attach user info to request
    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser._id;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token, unauthorized." });
  }
};



module.exports = authenticate;