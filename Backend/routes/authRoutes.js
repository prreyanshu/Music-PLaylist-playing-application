const express = require("express");
const { body } = require("express-validator");
const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router();

// Validation rules for user registration
const validateRegistration = [
  body("username").notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

// Validation rules for user login
const validateLogin = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

// Register Route
router.post("/register", validateRegistration, registerUser);

// Login Route
router.post("/login", validateLogin, loginUser);

module.exports = router;
