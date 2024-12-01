const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  googleId: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'google_id',
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  isVerified: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'is_verified',
  },
  emailVerifiedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'email_verified_at',
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'user_name',
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  college: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  course: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  gender: {
    type: DataTypes.ENUM('male', 'female', 'other'),
    allowNull: true,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  coupon: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'coupan',
  },
  lastActivity: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'lastactivity',
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  telegramId: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'telegramid',
  },
  field1: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  field2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  field3: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  field4: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  field5: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  rememberToken: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'remember_token',
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'created_at',
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'updated_at',
  }
}, {
  tableName: 'users',
  timestamps: true,
},
);


module.exports = User;
