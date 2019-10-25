const { signUpTitle } = require("./login/header"),
  { homepageLogin, credentialsLogin } = require("./login/logInButton"),
  {
    emailField,
    passwordField,
    email,
    password,
    wrongEmail,
    wrongPassword
  } = require("./login/loginForm"),
  { getElementBySelector } = require("../configuration/selenium");

class LoginPage {
  constructor() {
    this.header = signUpTitle;
  }

  async waitForHeader() {
    const header = await getElementBySelector(this.header);
    return header.getText();
  }
}
module.exports.LoginPage = LoginPage;
