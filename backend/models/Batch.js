const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Batch = sequelize.define('Batch', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  payable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  certificateFee: {
    type: DataTypes.FLOAT,
    allowNull: true,
    field: 'certificate_fee',
  },
  offerId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'offer_id',
  },
  timeLimit: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'time_limit',
  },
  img: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  association: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  logo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  batch_type: {
    type: DataTypes.INTEGER, // 1 = course, 2 = workshop, 3 = digital goods
    allowNull: false,
    field: 'batch_type',
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'start_date',
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'end_date',
  },
  schedule: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  about: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  learn: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  benefits: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  group_link: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  group_link1: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  group_link2: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  telegram_broadcast: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'telegram_broadcast',
  },
  teacher_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'teacher_id',
  },
  teacher_payment: {
    type: DataTypes.FLOAT,
    allowNull: true,
    field: 'teacher_payment',
  },
  meeting_link: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  topic: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description_short: {
    type: DataTypes.STRING,
    allowNull: true,
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
  status: {
    type: DataTypes.ENUM('live', 'private', 'public', 'open for enrollment'),
    defaultValue: 'private',
  },
  next_class: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'next_class',
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
  tableName: 'batches',
  timestamps: true,
});

module.exports = Batch;
