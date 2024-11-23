const { Sequelize } = require('sequelize');

// Configure Sequelize with environment variables using dotenv
require('dotenv').config();

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',  // Change to your host (e.g., 'localhost' or IP address)
    port: 5432,         // Default PostgreSQL port
    username: 'gk_backend', // Your database username
    password: 'admin', // Your database password
    database: 'gurukul', // Your database name
    logging: false,      // Disable logging for cleaner output
  });

module.exports = sequelize;
