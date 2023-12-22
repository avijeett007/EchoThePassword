const bcrypt = require('bcrypt');

const encrypt = async (text) => {
  const salt = await bcrypt.genSalt();
  const encrypted = await bcrypt.hash(text, salt);
  return encrypted;
};

const compare = async (text, hash) => {
  const match = await bcrypt.compare(text, hash);
  return match;
};

module.exports = {
  encrypt,
  compare
};
