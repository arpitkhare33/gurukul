// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const authController = {
  async register(req, res) {
    const { email, phone, password, role } = req.body;
    try {
      const existingUser = await User.findUserByEmail(email);
      if (existingUser) return res.status(400).json({ message: 'User already exists' });

      const newUser = await User.createUser({ email, phone, password, role });
      const token = jwt.sign({ userId: newUser.id, role: newUser.role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      res.status(201).json({ token });
    } catch (error) {
        console.log(error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  login(req, res) {
    const user = req.user; // Passport attaches the user object to req
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.json({ token });
  }
};

module.exports = authController;
