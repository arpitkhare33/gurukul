// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const logActivity = require('../utils/activityLogger');
const userController = require('./userController');
const authController = {
  async register(req, res) {
    const { name, email, password, mobile } = req.body;
    try {
      const existingUser = await userController.findUserByEmail(email);
      if (existingUser) return res.status(400).json({ message: 'User already exists' });
      // const role = "student";
      console.log("User does not exist");
      const newUser = await userController.createUser(req, res);
      const token = jwt.sign({ userId: newUser.id, role: newUser.role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
      console.log("Register Request received: ", req.body);

      res.status(201).json({ token });
    } catch (error) {
        console.log(error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  async login(req, res) {
    const user = req.user; // Passport attaches the user object to req
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    console.log("Login request recvd: ", user);
  //   await logActivity({
  //     userId: user.id,
  //     activityType: 'login',
  //     metadata,
  //     ipAddress: req.ip,
  //     deviceType: req.headers['user-agent'] || 'unknown',
  //     successful: true,
  // });
    res.json({ token });
  }
};

module.exports = authController;
