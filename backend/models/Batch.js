const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Batch = sequelize.define('Batch', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  instructorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  type: {
    type: DataTypes.INTEGER, // 1 = course, 2 = workshop, 3 = digital goods
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('live', 'private', 'public', 'open for enrollment'),
    defaultValue: 'private',
  },
  telegramId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  groupLinks: {
    type: DataTypes.JSON, // Store URLs to group chats, etc.
    allowNull: true,
  },
  additionalResources: {
    type: DataTypes.JSON, // Store URLs or descriptions for additional resources
    allowNull: true,
  },
  schedule: {
    type: DataTypes.TEXT, // Store schedule details of upcoming classes
    allowNull: true,
  },
  category: {
    type: DataTypes.STRING, // e.g., web dev, ML, etc.
    allowNull: false,
  },
  certificateFee: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Batch;
