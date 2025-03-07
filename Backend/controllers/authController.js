const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Register User
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  console.log('📩 Received registration request:', req.body); // Debug log

  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('❌ Validation Errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create and save new user
    const user = new User({ username, email, password });
    await user.save();

    console.log('✅ User registered successfully:', user.email); // Debug log

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });

    res.status(201).json({ msg: '✅ Registration successful', token });
  } catch (err) {
    console.error('❌ Error registering user:', err.message);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  console.log('📩 Received login request:', req.body); // Debug log

  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('❌ Validation Errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    console.log('✅ User logged in successfully:', user.email); // Debug log

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ msg: '✅ Login successful', token });
  } catch (err) {
    console.error('❌ Error logging in:', err.message);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

module.exports = { registerUser, loginUser };
