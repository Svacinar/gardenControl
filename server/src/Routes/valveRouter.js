const express = require('express');
const router = express.Router();

const valveController = require('../Controllers/valveController');

router.get('/api', valveController.getValveAPI);
router.get('/run/:valve', valveController.runValve)
router.get('/cycle', valveController.cycleValves)
router.get('/setTimer/:timerValue', valveController.setTimer)

module.exports = router;