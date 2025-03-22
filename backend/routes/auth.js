// backend/routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jwt-simple");
const User = require("../models/User");
const dotenv = require("dotenv");

dotenv.config();
const router = express.Router();

// التسجيل (Sign Up)
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(400).json({ message: "User already exists" });

  const newUser = new User({ username, email, password });
  await newUser.save();
  res.status(201).json({ message: "User registered successfully" });
});

// تسجيل الدخول (Login)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.encode({ userId: user._id }, process.env.JWT_SECRET);
  res.json({ token });
});

module.exports = router;
