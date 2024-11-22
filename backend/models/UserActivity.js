// models/UserActivity.js
const pool = require('../config/db');

const UserActivity = {
  async logActivity(userId, activity) {
    const result = await pool.query(
      'INSERT INTO user_activities (user_id, activity) VALUES ($1, $2) RETURNING *',
      [userId, activity]
    );
    return result.rows[0];
  },

  async getActivityByUserId(userId) {
    const result = await pool.query(
      'SELECT * FROM user_activities WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    return result.rows;
  }
};

module.exports = UserActivity;
