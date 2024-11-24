// models/GeneralActivities.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Sequelize instance

const GeneralActivities = sequelize.define('GeneralActivities', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
    },
    activityType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    metadata: {
        type: DataTypes.JSONB,
    },
    ipAddress: {
        type: DataTypes.STRING(45),
    },
    deviceType: {
        type: DataTypes.STRING(100),
    },
    browserInfo: {
        type: DataTypes.STRING,
    },
    location: {
        type: DataTypes.STRING,
    },
    sessionId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
    successful: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    errorMessage: {
        type: DataTypes.TEXT,
    },
}, {
    tableName: 'GeneralActivities',
    timestamps: false,
});

module.exports = GeneralActivities;
