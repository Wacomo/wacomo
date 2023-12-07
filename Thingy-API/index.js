require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const cors = require('cors');
const thingyRoutes = require('./routes/thingyRoute');
const userRoutes = require('./routes/userRoutes');
const deviceRoutes = require('./routes/deviceRoutes');
const thresholdRoutes = require('./routes/thresholdRoutes');
const alertsRoutes = require('./routes/alertsRoutes');


const app = express();

// Middleware to parse request bodies
app.use(bodyParser.json());
app.use(cors());

// Sync all models
db.sequelize.sync({alter:true})
  .then(() => {
    console.log('Database synced!');
    // ... start your server or other logic here ...
  })
  .catch(error => {
    console.error('Error syncing database:', error);
  });


app.use('/', thingyRoutes);  // Mount the test route
app.use('/api/v1/user', userRoutes);  // Mount the user route
app.use('/api/v1/device', deviceRoutes);  // Mount the device route
app.use('/api/v1/threshold', thresholdRoutes);  // Mount the device route
app.use('/api/v1/alerts', alertsRoutes);  // Mount the alert route

module.exports = app; //Export app to server.js
