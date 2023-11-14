const express = require('express');
const router = express.Router();
const deviceController = require('../controller/deviceController');
const authMiddleware = require('../middleware/authMiddleware');

// Get all devices for the logged-in user
router.get('/', authMiddleware, deviceController.getAllDevices);

// Get a single device by id for the logged-in user
router.get('/:deviceId', authMiddleware, deviceController.getDevice);

// Create a new device for the logged-in user
router.post('/', authMiddleware, deviceController.createDevice);

// Update an existing device for the logged-in user
router.put('/:deviceId', authMiddleware, deviceController.updateDevice);

// Delete an existing device for the logged-in user
// router.delete('/:deviceId', authMiddleware, deviceController.deleteDevice);

module.exports = router;
