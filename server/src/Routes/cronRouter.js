const express = require('express');
const router = express.Router();

const cronController = require('../Controllers/cronController');

router.get('/api', cronController.getCronAPI);
router.post('/setcron', cronController.setcron);
router.get('/rainProtect', cronController.rainProtect)

module.exports = router;