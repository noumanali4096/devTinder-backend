const validator = require('validator');

const validateSignupData = (req) => {
  const { emailID, password } = req.body;
  const isValidEmail = validator.isEmail(emailID);
  const isStrongPassword = validator.isStrongPassword(password);
  if (!isValidEmail) {
    throw new Error("Email is not valid")
  }
  else if (!isStrongPassword) {
    throw new Error("Enter a strong password")
  }
}

module.exports = { validateSignupData }