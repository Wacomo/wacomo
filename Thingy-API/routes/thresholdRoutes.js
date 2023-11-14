const express = require('express');
const router = express.Router();
const thresholdController = require('../controller/thresholdController');
const authMiddleware = require('../middleware/authMiddleware');

// Get the threshold settings for a specific device
router.get('/:deviceId/threshold', authMiddleware, thresholdController.getThreshold);

// Create or update the threshold settings for a specific device
router.post('/:deviceId/threshold', authMiddleware, thresholdController.createOrUpdateThreshold);

// Delete the threshold settings for a specific device
router.delete('/:deviceId/threshold', authMiddleware, thresholdController.deleteThreshold);

module.exports = router;
