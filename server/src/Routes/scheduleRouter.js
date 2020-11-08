const express = require('express');
const router = express.Router();

const DBController = require('../Controllers/DBController');

router.post('/post', DBController.postSchedule);
router.get('/find', DBController.findNearestSchedule);
router.get('/getAll', DBController.getAllSchedules);
router.delete('/delete/:id', DBController.delete);

module.exports = router;