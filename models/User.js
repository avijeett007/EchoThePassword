const mongoose = require('mongoose');
const { Schema } = mongoose;

const saltSchema = new Schema({
  websiteName: String,
  encryptedSalt: String
}, { _id: false });

const userSchema = new Schema({
  googleId: String,
  fullName: String,
  email: String,
  salts: [saltSchema],
  twoFactorAuth: {
    secret: String,
    tempSecret: String,
    dataUrl: String,
    otpURL: String,
    enabled: { type: Boolean, default: false }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
