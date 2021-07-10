const express = require('express');

const router = express.Router();

const temperatureController = require('../Controllers/temperatureController');

router.get('/', temperatureController.getAllTemperatures);

module.exports = router;