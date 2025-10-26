const express = require("express");
const router = express.Router();
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const User = require("../models/User");

router.post("/user/signup", async (req, res) => {
  try {
    if (
      !req.body.username ||
      !req.body.email ||
      !req.body.password
      // !req.body.newsletter
    ) {
      return res.status(400).json({ message: "Missing parameters" });
    }
    const existingMail = await User.findOne({ email: req.body.email });
    if (existingMail) {
      return res.status(400).json({ message: "email already used" });
    }

    const salt = uid2(16);
    const token = uid2(64);
    const hash = SHA256(req.body.password + salt).toString(encBase64);

    const newUser = new User({
      email: req.body.email,
      account: {
        username: req.body.username,
      },
      // newsletter: true,
      salt: salt,
      token: token,
      hash: hash,
    });

    await newUser.save();
    const responseObj = {
      token: newUser.token,
      _id: newUser._id,
      account: {
        username: newUser.account.username,
      },
    };
    return res.status(201).json(responseObj);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const foundUser = await User.findOne({ email: req.body.email });
    if (!foundUser) {
      return res.status(401).json("Unauthorized");
    }
    const newHash = SHA256(req.body.password + foundUser.salt).toString(
      encBase64
    );

    if (newHash == foundUser.hash) {
      const responseObj = {
        token: foundUser.token,
        _id: foundUser._id,
        account: {
          username: foundUser.account.username,
        },
      };
      return res.status(200).json(responseObj);
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
