const express = require('express');

const router = express.Router();

const DBController = require('../Controllers/DBController');

router.get('/', DBController.findNearestSchedule);
router.get('/all', DBController.getAllSchedules);
router.post('/', DBController.postSchedule);
router.delete('/:id', DBController.delete);

module.exports = router;