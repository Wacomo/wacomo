const express = require('express');
const router = express.Router();
const alertsController = require('../controller/alertsController');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new anomaly alert
router.post('/', authMiddleware, alertsController.createAlert);

module.exports = router;
