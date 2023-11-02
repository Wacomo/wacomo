require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const cors = require('cors');
const thingyRoutes = require('./routes/thingyRoute');
const userRoutes = require('./routes/userRoutes')


const app = express();

// Middleware to parse request bodies
app.use(bodyParser.json());
app.use(cors());

// Sync all models
db.sequelize.sync()
  .then(() => {
    console.log('Database synced!');
    // ... start your server or other logic here ...
  })
  .catch(error => {
    console.error('Error syncing database:', error);
  });


app.use('/', thingyRoutes);  // Mount the test route
app.use('/api/v1/user', userRoutes);  // Mount the user route

module.exports = app; //Export app to server.js
