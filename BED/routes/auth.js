const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const router = express.Router();

// Replace with your secret key
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"; // Use environment variable for security

// middleware

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from header

  console.log("Authentication !!!.")

  if (!token) {
    return res.status(401).json({ message: "Authentication token is missing" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach user info to request
    next(); // Proceed to the next middleware/route
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};




// Signup Route
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({ token, message: "Signup successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  console.log("checking login")
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    console.log("Email: ", email)
    const user = await User.findOne({ email: email });
    console.log("user: ", user)
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ token, message: "Login successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Token Verification Route
router.post("/verify-token", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from the Authorization header
  // const token = req.headers.authorization; // Extract token from the Authorization header
  // console.log("token!!: ", token)

  if (!token) {
    return res.status(401).json({ valid: false, message: "Token is missing" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Verify the token
    res.status(200).json({ valid: true, userId: decoded.userId });
  } catch (error) {
    res.status(401).json({ valid: false, message: "Invalid or expired token" });
  }
});

module.exports = router;
