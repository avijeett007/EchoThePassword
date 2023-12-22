const crypto = require('crypto');

const generateStatelessPassword = (masterPassword, passwordProfile) => {
  const { fullName, websiteName, passwordLength, characterTypes } = passwordProfile;
  const salt = `${fullName}.${websiteName}`;
  const key = crypto.pbkdf2Sync(masterPassword, salt, 100000, 64, 'sha512');

  const password = generatePasswordBasedOnTypes(key, passwordLength, characterTypes);

  return password;
};

function generatePasswordBasedOnTypes(key, length, types) {
  const charTypes = {
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-=',
  };
  let allowedChars = '';
  for (const [type, chars] of Object.entries(charTypes)) {
    if (types[type]) allowedChars += chars;
  }

  let finalPassword = '';
  for (let i = 0; i < length; ++i) {
    const index = key.readUInt8(i % key.length) % allowedChars.length;
    finalPassword += allowedChars[index];
  }

  return finalPassword.substring(0, length);
}

module.exports = { 
  generateStatelessPassword,
};
