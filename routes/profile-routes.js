const router = require('express').Router();
const twoFactorAuthController = require('../controllers/twoFactorAuthController');
const authCheck = require('../middleware/authCheck');

router.get('/', authCheck, (req, res) => {
    res.render('profile', { user: req.user });
});

router.get('/setup-2fa', authCheck, (req, res) => {
  res.render('setupTwoFactorAuth');
});

router.get('/verify-2fa', authCheck, (req, res) => {
  res.render('verifyTwoFactorAuth', { user: req.user });
});

module.exports = router;
