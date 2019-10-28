"use strict";
require("../../configuration/env");
const { email, password } = process.env;

module.exports = {
  emailField: "#doc .signin-wrapper .email-input",
  passwordField: "#doc .signin-wrapper .js-password-field",
  loginButton: "#doc .clearfix button",
  email: email,
  password: password,
  wrongEmail: "wrongEmail",
  wrongPassword: "wrongPassword"
};
