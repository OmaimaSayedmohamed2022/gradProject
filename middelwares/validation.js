const validator = require('validator');

const validateEmail = (email) => {
  return validator.isEmail(email);
};

const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  return passwordRegex.test(password);
};

const validateString = (data) => {
  return typeof data === 'string';
};

module.exports = {
  validateEmail,
  validatePassword,
  validateString,
};
