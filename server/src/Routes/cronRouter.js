const express = require('express');
const router = express.Router();

const cronController = require('../Controllers/cronController');

router.get('/api', cronController.getCronAPI);
router.post('/setcron', cronController.setcron);
router.get('/rainProtect', cronController.rainProtect)

module.exports = router;


/**
* @swagger
* /cron/api:
*  get:
*   description: use to request valves
*   responses:
*     '200':
*       description: fetch valve object
* /cron/setcron:
*  post:
*   description: Set new cron job
*   parameters:
*   - name: state
*     description: state true or false
*     in: formData
*     required: true
*     type: boolean
*   - name: strategy
*     description: drought/newSeed/normal
*     required: true
*     in: path
*     type: string
*   - name: strategyID
*     description: randomGeneratedInteger
*     in: path
*     required: true
*     type: integer
*   responses:
*     '200':
*       description: success
* /cron/rainProtect:
*  get:
*   description: set rain protect functionality on/off
*   responses:
*     '200':
*       description: set on or off
*
*
*/