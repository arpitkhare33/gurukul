const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ensure this path is correct based on your project structure

// Define the Course model
const Course = sequelize.define('Courses', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  instructorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'instructors', // Ensure there’s an `Instructors` table
      key: 'id',
    },
    validate: {
      isInt: true,
    },
  },
  price:{
    type: DataTypes.INTEGER,
    allowNull: false,
    validate:{
        isInt: true,
    }
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: true,
    validate: {
      isDate: true,
    },
  },
  prerequisites: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  mediaLinks: {
    type: DataTypes.JSON,
    allowNull: true,
    validate: {
      isValidJSON(value) {
        if (value && typeof value !== 'object') {
          throw new Error('Media links must be a valid JSON object');
        }
      },
    },
  },
}, {
  tableName: 'courses',
  timestamps: true,
  underscored: true,
});

module.exports = Course;
