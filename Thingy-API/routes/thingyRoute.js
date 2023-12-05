const express = require('express');
const router = express.Router();
const thingyController = require('../controller/thingyController');

router.get('/connect-thingy', thingyController.connectThingy);
router.get('/', thingyController.home);
router.get('/add', thingyController.addNumbers);

module.exports = router;
