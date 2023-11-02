const mqtt = require('mqtt');

const mqttOptions = {
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD
};

const client = mqtt.connect(process.env.MQTT_BROKER_URL, mqttOptions);

client.on('connect', function () {
    console.log('Connected to MQTT broker');
});

exports.connectThingy = (req, res) => {
    const deviceId = req.query.device_id;

    if (!deviceId) {
        return res.status(400).send("device_id query param required");
    }

    const topic = `things/${deviceId}/shadow/update`;

    client.subscribe(topic, function (err) {
        if (err) {
            return res.status(500).send(err.message);
        }

        // Fetch data for that device (for simplicity we'll assume data comes in after subscribing)
        client.once('message', (topic, message) => {
            res.send({
                topic: topic,
                message: message.toString()
            });
            client.unsubscribe(topic); 
        });
    });
};

exports.home = (req, res) => {
    res.send('Hello, Warehouse Monitor!');
};

exports.addNumbers = (req, res) => {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    res.json({ result: a + b });
};