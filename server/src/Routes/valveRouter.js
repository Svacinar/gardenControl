const express = require('express');
const router = express.Router();

const valveController = require('../Controllers/valveController');

router.get('/', valveController.getValveAPI);
router.get('/run/:valve', valveController.runValve)
router.get('/cycle', valveController.cycleValves)
router.get('/timer/:timerValue', valveController.setTimer)
router.get('/rainProtect', valveController.rainProtect)

module.exports = router;