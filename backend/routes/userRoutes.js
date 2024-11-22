// routes/userRoutes.js
const express = require('express');
const passport = require('passport');
const userController = require('../controllers/userController');

const router = express.Router();

// Profile and User Management Routes
router.get('/profile', passport.authenticate('jwt', { session: false }), userController.getProfile);
router.put('/profile', passport.authenticate('jwt', { session: false }), userController.updateProfile);
router.get('/dashboard', passport.authenticate('jwt', { session: false }), userController.getUserDashboard);

// Admin-specific routes
router.get('/admin/users', passport.authenticate('jwt', { session: false }), userController.adminGetAllUsers);

module.exports = router;
