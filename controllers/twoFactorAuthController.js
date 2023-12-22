const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const User = require('../models/User');

const generateTwoFactorAuthSecret = async (req, res) => {
  try {
    const secret = speakeasy.generateSecret();
    const user = await User.findById(req.user.id);
    user.twoFactorAuth.tempSecret = secret.base32;
    await user.save();
    qrcode.toDataURL(secret.otpauth_url, (err, dataUrl) => {
      if (err) {
        console.error('Failed to generate QR code', err);
        res.status(500).send('Failed to generate QR code');
      } else {
        res.json({ secret: secret.base32, dataUrl, otpURL: secret.otpauth_url });
      }
    });
  } catch (error) {
    console.error('Error in generateTwoFactorAuthSecret', error);
    res.status(500).send(error.message);
  }
};

const enableTwoFactorAuth = async (req, res) => {
  try {
    const { token } = req.body;
    const user = await User.findById(req.user.id);
    const verified = speakeasy.totp.verify({
      secret: user.twoFactorAuth.tempSecret,
      encoding: 'base32',
      token: token
    });
    if (verified) {
      user.twoFactorAuth.secret = user.twoFactorAuth.tempSecret;
      user.twoFactorAuth.enabled = true;
      await user.save();
      res.send('2FA is enabled');
    } else {
      res.status(400).send('Invalid token, verification failed');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const disableTwoFactorAuth = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.twoFactorAuth.secret = '';
    user.twoFactorAuth.enabled = false;
    await user.save();
    res.send('2FA is disabled');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const verifyTwoFactorAuthToken = (user, token) => {
  return speakeasy.totp.verify({
    secret: user.twoFactorAuth.secret,
    encoding: 'base32',
    token: token
  });
};

module.exports = {
  generateTwoFactorAuthSecret,
  enableTwoFactorAuth,
  disableTwoFactorAuth,
  verifyTwoFactorAuthToken
};
