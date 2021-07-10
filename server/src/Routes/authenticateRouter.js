const router = require('express').Router();

const authentizationController = require('../Controllers/authentizationController');

router.get('/authenticate', authentizationController.getLoginPage);

router.post('/authenticate', authentizationController.userLogin);

router.post('/register', authentizationController.userRegister);

router.get('/logout', authentizationController.logout);

module.exports = router;