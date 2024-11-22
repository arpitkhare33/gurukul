// models/User.js
const pool = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
  async createUser({ email, phone, password, role }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (email, phone, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
      [email, phone, hashedPassword, role]
    );
    return result.rows[0];
  },

  async findUserByEmail(email) {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  },

  async findUserById(id) {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
  },
  async updateUser(userId, { name, bio, contactDetails }) {
    const result = await pool.query(
      'UPDATE users SET name = $1, bio = $2, contact_details = $3 WHERE id = $4 RETURNING *',
      [name, bio, contactDetails, userId]
    );
    return result.rows[0];
  },

  async getAllUsers() {
    const result = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
    return result.rows;
  }
};

module.exports = User;
