const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Batch = require('./Batch');  // Import the Batch model

const Videos = sequelize.define('videos', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,  // Duration in seconds
    allowNull: true,
  },
  metadata: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
  is_required: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  content_type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  order_in_series: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  batch_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Batch,
      key: 'id',
    },
    allowNull: false,
  },
}, {
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Videos;
