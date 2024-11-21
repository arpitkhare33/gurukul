// routes/authRoutes.js
const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');
const { check } = require('express-validator');

const router = express.Router();

// Register route
router.post(
  '/register',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('phone', 'Phone number is required').notEmpty(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
  ],
  authController.register
);

// Login route using Passport's local strategy
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  passport.authenticate('local', { session: false }),
  authController.login
);

module.exports = router;
