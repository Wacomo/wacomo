// Function to generate notification content
const generateNotificationContent = ({ device_name, metric_data, time_of_anomaly, anomaly_value }) => {
    return `Anomaly detected on ${device_name}. Metric: ${metric_data}, Value: ${anomaly_value}. Time: ${time_of_anomaly}`;
};

module.exports = {
    generateNotificationContent,
};
