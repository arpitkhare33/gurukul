const { Sequelize } = require('sequelize');

// Define your Sequelize connection
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',  // Change to your host (e.g., 'localhost' or IP address)
  port: 5432,         // Default PostgreSQL port
  username: 'gk_backend', // Your database username
  password: 'admin', // Your database password
  database: 'gurukul', // Your database name
  logging: false,      // Disable logging for cleaner output
});

// Function to test the connection
const testConnection = async () => {
  try {
    // Attempt to authenticate the connection
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    // Close the connection after test
    await sequelize.close();
  }
};

// Run the test
testConnection();
