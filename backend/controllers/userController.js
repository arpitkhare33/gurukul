// controllers/userController.js
const User = require('../models/User');
const UserActivity = require('../models/UserActivity');

const userController = {
  async getProfile(req, res) {
    try {
      const user = await User.findUserById(req.user.id);
      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  async updateProfile(req, res) {
    const { name, bio, contactDetails } = req.body;
    try {
      const updatedUser = await User.updateUser(req.user.id, { name, bio, contactDetails });
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  async getUserDashboard(req, res) {
    try {
      const user = await User.findUserById(req.user.id);
      const activities = await UserActivity.getActivityByUserId(req.user.id);
      res.status(200).json({ user, activities });
    } catch (error) {
      console.error("Error fetching dashboard:", error);
      res.status(500).json({ message: 'Server error' });
    }
  },

  async logUserActivity(req, res, next) {
    try {
      await UserActivity.logActivity(req.user.id, "User login");
      next();
    } catch (error) {
      console.error("Error logging user activity:", error);
      next(error);
    }
  },

  async adminGetAllUsers(req, res) {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });

    try {
      const users = await User.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: 'Server error' });
    }
  }
};

module.exports = userController;
