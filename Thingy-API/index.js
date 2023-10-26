require('dotenv').config();
const express = require('express');
const mqtt = require('mqtt');
const bodyParser = require('body-parser');
const db = require('./db/db');

const app = express();

// Middleware to parse request bodies
app.use(bodyParser.json());

/** CONNECT TO MQTT BROKER**/

const mqttOptions = {
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD
};

const client = mqtt.connect(process.env.MQTT_BROKER_URL, mqttOptions);

//Test connection
client.on('connect', function () {
    console.log('Connected to MQTT broker');
});

/** END CONNECT TO MQTT BROKER **/

app.get('/connect-thingy', (req, res) => {

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
            client.unsubscribe(topic); // Clean up after getting the message
        });
    });
});

/** TESTING **/

// testing route
app.get('/', (req, res) => {
    res.send('Hello, Warehouse Monitor!');
});

//Test database
app.get('/testdb', async (req, res) => {
    try {
        const result = await db.any('SELECT NOW() as now');
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message || 'Internal Server Error');
    }
});

// checking github action with unit test
app.get('/add', (req, res) => {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    res.json({ result: a + b });
});

/** END TESTING**/

module.exports = app; //Export app to server.js
