require("./node_modules/dotenv").config();
const { email, password } = process.env;

module.exports = {
  emailField: "#doc .signin-wrapper .email-input",
  passwordField: "#doc .signin-wrapper .js-password-field",
  email: email,
  password: password,
  wrongEmail: "wrongEmail",
  wrongPassword: "wrongPassword"
};
