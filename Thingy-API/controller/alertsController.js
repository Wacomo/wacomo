const db = require('../models');
const emailService = require('../services/emailService');
const { generateNotificationContent } = require('../utils/utility');

const createAlert = async (req, res) => {
    try {
        const { device_name, metric_data, time_of_anomaly, anomaly_value } = req.body;

        // Save the alert to the database
        const newAlert = await db.Alert.create({
            device_name,
            metric_data,
            time_of_anomaly,
            anomaly_value,
            user_id: req.user.userId // Assuming you have user authentication
        });

        // Generate notification content
        const notificationContent = generateNotificationContent({
            device_name,
            metric_data,
            time_of_anomaly,
            anomaly_value,
        });

         // Send email notification
         emailService.sendAlertEmail(notificationContent);


        // Console log or send the notification content to other notification services
        console.log(notificationContent);

    

        res.status(201).json(newAlert);
    } catch (error) {
        console.error('Error creating alert:', error);
        res.status(500).json({ message: 'Failed to create alert', error: error.message });
    }
};

module.exports = {
    createAlert,
};
