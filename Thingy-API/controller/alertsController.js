const db = require('../models');
const emailService = require('../services/emailService');
const { generateNotificationContent } = require('../utils/utility');
const mqtt = require('mqtt');

// MQTT Client Setup
const mqttOptions = {
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD
};

const client = mqtt.connect(process.env.MQTT_BROKER_URL, mqttOptions);

client.on('connect', function () {
    console.log('Connected to MQTT broker for pushing data');
});

// buzzThingy Function
const buzzThingy = async (deviceId) => {
    const topic = `things/${deviceId}/shadow/update/accepted`;
    const message = JSON.stringify({
        appId: "BUZZER",
        data: { frequency: 2000 },
        messageType: "CFG_SET"
    });

    return new Promise((resolve, reject) => {
        client.publish(topic, message, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

// createAlert Function
const createAlert = async (req, res) => {
    try {
        const { device_name, metric_data, time_of_anomaly, anomaly_value } = req.body;

        // Save the alert to the database
        const newAlert = await db.Alert.create({
            device_name,
            metric_data,
            time_of_anomaly,
            anomaly_value,
            user_id: req.user.userId // Assuming user authentication
        });

        // Generate and send notification content
        const notificationContent = generateNotificationContent({
            device_name,
            metric_data,
            time_of_anomaly,
            anomaly_value,
        });
        emailService.sendAlertEmail(notificationContent, req.user.email);

        // Buzz the thingy and handle potential errors
        try {
            await buzzThingy(device_name);
        } catch (buzzError) {
            console.error('Error buzzing thingy:', buzzError.message);
        }

        console.log(notificationContent);
        res.status(201).json(newAlert);
    } catch (error) {
        console.error('Error creating alert:', error);
        res.status(500).json({ message: 'Failed to create alert', error: error.message });
    }
};
// getAlert Function
const getAlert = async (req, res) => {
    try {
        const alertId = req.params.alertId;
        const alert = await db.Alert.findByPk(alertId);

        if (!alert) {
            return res.status(404).json({ message: 'Alert not found' });
        }

        res.json(alert);
    } catch (error) {
        console.error('Error getting alert:', error);
        res.status(500).json({ message: 'Failed to get alert', error: error.message });
    }
};
const getAllAlerts = async (req, res) => {
    try {
        // Retrieve all alerts from the database
        const alerts = await db.Alert.findAll({
            where: { user_id: req.user.userId }, // Assuming you have user authentication
        });

        // Return the list of alerts
        res.json(alerts);
    } catch (error) {
        console.error('Error getting all alerts:', error);
        res.status(500).json({ message: 'Failed to get alerts', error: error.message });
    }
};


// Export the createAlert function
module.exports = {
    createAlert,
    getAlert,
    getAllAlerts
};
