const charsetSize = {
  lowercase: 26,
  uppercase: 26,
  numbers: 10,
  symbols: 33
};

const calculatePasswordEntropy = (password) => {
  let size = 0;

  // Ensure that we have a string password and the password is not empty before calculating entropy.
  if (typeof password !== 'string' || password.length === 0) {
    return 0;
  }
  
  if (/[a-z]/.test(password)) size += charsetSize.lowercase;
  if (/[A-Z]/.test(password)) size += charsetSize.uppercase;
  if (/\d/.test(password)) size += charsetSize.numbers;
  if (/\W|_/.test(password)) size += charsetSize.symbols;
  
  const entropy = password.length * Math.log2(size);
  return entropy;
};

module.exports = { calculatePasswordEntropy };
