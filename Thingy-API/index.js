require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();

// Middleware to parse request bodies
app.use(bodyParser.json());

// testing route
app.get('/', (req, res) => {
    res.send('Hello, Warehouse Monitor!');
});

// checking github action with unit test
app.get('/add', (req, res) => {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    res.json({ result: a + b });
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

// const PORT = process.env.PORT || 3900;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

module.exports = app;
