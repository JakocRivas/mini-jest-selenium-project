console.log("rawr");
const { signUpTitle } = require("./login/header"),
  { homepageLogin, credentialsLogin } = require("./login/logInButton"),
  {
    emailField,
    passwordField,
    email,
    password,
    wrongEmail,
    wrongPassword
  } = require("./login/loginForm");

console.log(
  signUpTitle,
  homepageLogin,
  credentialsLogin,
  emailField,
  passwordField,
  email,
  password,
  wrongEmail,
  wrongPassword
);
