const express = require('express');
const router = express.Router();
const passwordController = require('../controllers/passwordController');
const { calculatePasswordEntropy } = require('../utils/passwordEntropy');

router.get('/generate', (req, res) => {
  res.render('passwordForm');
});

router.post('/generate-password', passwordController.generatePassword);

router.post('/evaluate-strength', (req, res) => {
  const { masterPassword } = req.body;
  const entropy = calculatePasswordEntropy(masterPassword);

  const strengthLevels = {
    veryStrong: 100,
    strong: 80,
    medium: 60,
    weak: 40
  };

  let strength;
  let progress;

  if (entropy >= strengthLevels.veryStrong) {
    strength = 'Very Strong';
    progress = 100;
  } else if (entropy >= strengthLevels.strong) {
    strength = 'Strong';
    progress = 80;
  } else if (entropy >= strengthLevels.medium) {
    strength = 'Medium';
    progress = 60;
  } else if (entropy >= strengthLevels.weak) {
    strength = 'Weak';
    progress = 40;
  } else {
    strength = 'Very Weak';
    progress = 20;
  }

  res.json({ strength, progress });
});

router.post('/save-salt', passwordController.saveSalt);

module.exports = router;
