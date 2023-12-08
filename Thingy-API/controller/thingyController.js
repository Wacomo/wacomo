const WebSocket = require('ws');
const mqtt = require('mqtt');


const mqttOptions = {
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD
};

const client = mqtt.connect(process.env.MQTT_BROKER_URL, mqttOptions);

client.on('connect', () => {
    console.log('Connected to MQTT broker');
});

const wss = new WebSocket.Server({ noServer: true }); // Create WebSocket server without an HTTP server

wss.on('connection', (ws) => {
    let subscribedTopic = '';

    ws.on('message', (message) => {
        try {
            const { device_id } = JSON.parse(message);
            const topic = `things/${device_id}/shadow/update`;

            client.subscribe(topic, (err) => {
                if (!err) {
                    subscribedTopic = topic;
                } else {
                    console.error(`Error subscribing to topic ${topic}:`, err);
                }
            });
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    });

    client.on('message', (topic, message) => {
        if (topic === subscribedTopic) {
            const payload = JSON.parse(message.toString());
            ws.send(JSON.stringify(payload));
        }
    });

    ws.on('close', () => {
        if (subscribedTopic) {
            client.unsubscribe(subscribedTopic);
            subscribedTopic = '';
        }
    });
});

// Export only the WebSocket server
module.exports = wss;