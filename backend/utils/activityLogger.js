// services/activityLogger.js
const GeneralActivities = require('../models/GeneralActivities');

const logActivity = async ({
    userId,
    activityType,
    metadata = {},
    ipAddress = '',
    deviceType = '',
    browserInfo = '',
    location = '',
    sessionId = '',
    successful = true,
    errorMessage = ''
}) => {
    try {
        await GeneralActivities.create({
            userId,
            activityType,
            metadata,
            ipAddress,
            deviceType,
            browserInfo,
            location,
            sessionId,
            successful,
            errorMessage,
        });
        console.log(`Activity logged: ${activityType} for user ID ${userId}`);
    } catch (error) {
        console.error('Error logging activity:', error);
    }
};

module.exports = { logActivity };
