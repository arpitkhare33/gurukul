// controllers/userController.js
const User = require('../models/User');
const UserActivity = require('../models/UserActivity');
const pool = require('../config/db');
const bcrypt = require('bcryptjs');

const userController = {
   // Create a new user
  async createUser(req, res) {
    try {
      let { password, email, name, mobile, role } = req.body;

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(password, email, hashedPassword, name, mobile);
      if(role==null){
        role = "student"
      }
      // Create user
      const newUser = await User.create({
        email: email,
        name: name,
        mobile: mobile,
        password: hashedPassword,
        role: role
      });
      return newUser;
      // res.status(201).json({ success: true, message: 'User created successfully', data: newUser });
    } catch (error) {
      console.error('Error creating user:', error);
      return null
      // res.status(500).json({ success: false, message: 'Error creating user', error: error.message });
    }
  },
  // Get all users
  async getAllUsers(req, res) {
    try {
      const users = await User.findAll();
      res.status(200).json({ success: true, data: users });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ success: false, message: 'Error fetching users', error: error.message });
    }
  },
  // Get a single user by ID
  async getUserById(req, res) {
    
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      res.status(200).json({ success: true, data: user });
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ success: false, message: 'Error fetching user', error: error.message });
    }
  },
    // Update user by ID
  async updateUser(req, res) {
      try {
        const { id } = req.params;
        const { password, ...otherFields } = req.body;
  
        // Find user
        const user = await User.findByPk(id);
        if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
        }
  
        // If password is provided, hash it
        if (password) {
          otherFields.password = await bcrypt.hash(password, 10);
        }
  
        // Update user
        await user.update(otherFields);
  
        res.status(200).json({ success: true, message: 'User updated successfully', data: user });
      } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ success: false, message: 'Error updating user', error: error.message });
      }
    },
    // Delete user by ID
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      await user.destroy();
      res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ success: false, message: 'Error deleting user', error: error.message });
    }
  },
  async findUserByEmail(email) {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  },
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
    console.log("Update request recieved")
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
  },
  async changePassword(req, res){
    const { userId, newPassword } = req.body;
    try {
        const hashedPassword = bcrypt.hashSync(newPassword, 10);
        await User.update({ password: hashedPassword }, { where: { id: userId } });

        await logActivity({
            userId,
            activityType: 'password change',
            ipAddress: req.ip,
            deviceType: req.headers['user-agent'] || 'unknown',
            successful: true,
        });

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        await logActivity({
            userId,
            activityType: 'password change',
            ipAddress: req.ip,
            deviceType: req.headers['user-agent'] || 'unknown',
            successful: false,
            errorMessage: error.message,
        });
        res.status(500).json({ message: 'Server error' });
    }
}

};

module.exports = userController;
