const { generateStatelessPassword } = require('../utils/passwordUtils');
const { calculatePasswordEntropy } = require('../utils/passwordEntropy');
const encryptionUtils = require('../utils/encryptionUtils');
const userController = require('./userController');
const mongoose = require('mongoose');

const generatePassword = (req, res) => {
  const { fullName, websiteName, masterPassword, passwordLength, lowercase, uppercase, numbers, symbols } = req.body;
  const characterTypes = {
    lowercase: lowercase === 'true',
    uppercase: uppercase === 'true',
    numbers: numbers === 'true',
    symbols: symbols === 'true',
  };

  const entropy = calculatePasswordEntropy(masterPassword);
  const entropyThreshold = 60;

  if (entropy < entropyThreshold) {
    res.status(400).send('The master password is too weak. Please use a stronger password.');
    return;
  }

  const passwordProfile = {
    fullName,
    websiteName,
    passwordLength: parseInt(passwordLength, 10),
    characterTypes,
  };

  try {
    const password = generateStatelessPassword(masterPassword, passwordProfile);
    res.send({ generatedPassword: password, passwordStrength: 'strong' });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const saveSalt = async (req, res) => {
  const { userEmail, userId, websiteName, salt } = req.body;

  if ((!userEmail && !userId) || !websiteName || !salt) {
    return res.status(400).send('Missing required fields.');
  }

  try {
    let user = null;
    if (userId) {
      user = await userController.getUserById(userId);
    } else if (userEmail) {
      user = await userController.getUserByEmail(userEmail);
    }
    
    if (!user) {
      return res.status(404).send('User not found.');
    }

    const encryptedSalt = await encryptionUtils.encrypt(salt);
    const saltIndex = user.salts.findIndex(s => s.websiteName === websiteName);
    if (saltIndex !== -1) {
      user.salts[saltIndex].encryptedSalt = encryptedSalt;
    } else {
      user.salts.push({ websiteName, encryptedSalt });
    }
    
    await userController.updateUserById(user._id, { salts: user.salts });
    res.status(200).send('Salt saved successfully.');
  } catch (error) {
    res.status(500).send('Error saving salt: ' + error.message);
  }
};

module.exports = {
  generatePassword,
  saveSalt
};