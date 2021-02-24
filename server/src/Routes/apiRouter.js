const express = require('express');

const router = express.Router();

const scheduleRouter = require('./scheduleRouter');
const cronRouter = require('./cronRouter');
const valveRouter = require('./valveRouter')
const temperatureRouter = require('./temperatureRouter')

router.use('/valve', valveRouter);
router.use('/cron', cronRouter);
router.use('/schedule', scheduleRouter);
router.use('/temperature', temperatureRouter);

module.exports = router;
