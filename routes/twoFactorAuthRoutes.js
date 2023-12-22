const express = require('express');
const router = express.Router();
const twoFactorAuthController = require('../controllers/twoFactorAuthController');
const authCheck = require('../middleware/authCheck');

router.get('/generate-secret', authCheck, twoFactorAuthController.generateTwoFactorAuthSecret);
router.post('/enable', authCheck, twoFactorAuthController.enableTwoFactorAuth);
router.post('/disable', authCheck, twoFactorAuthController.disableTwoFactorAuth);

module.exports = router;
