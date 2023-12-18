const express = require('express');
const router = express.Router();
const alertsController = require('../controller/alertsController');
const authMiddleware = require('../middleware/authMiddleware');

// Create a new anomaly alert
router.post('/', authMiddleware, alertsController.createAlert);
// GET a single alert by ID
router.get('/:alertId', alertsController.getAlert);
//Get all alert
router.get('/',authMiddleware, alertsController.getAllAlerts);



module.exports = router;
