require("../resources/configuration/env");
const { EMAIL, PASSWORD, ROOT_URL } = process.env,
  { signUpTitle } = require("../resources/PO/login/header"),
  { home } = require("../resources/PO/timeLine/header");

let Driver = require("../resources/configuration/selenium"),
  LoginPage = require("../resources/PO/LoginPage"),
  Timeline = require("../resources/PO/TimelinePage"),
  ProfilePage = require("../resources/PO/ProfilePage");

describe("Twitter", () => {
  afterAll(() => {
    console.log("All test suits have been run");
  });

  describe("Login Page", () => {
    const driver = new Driver();

    let loginPageInstance = new LoginPage(driver);

    beforeAll(() => {
      driver.goTo(ROOT_URL);
    });

    afterAll(async () => {
      console.log("This test suit have been run");
      await driver.quit();
    });

    it("should wait for the header to load", async () => {
      const header = await loginPageInstance.waitForHeader(signUpTitle);
      expect(header).toBe("See what’s happening in the world right now");
    });

    it("should log in", async () => {
      await loginPageInstance.login(EMAIL, PASSWORD);
    });
  });

  describe("Timeline Page", () => {
    const driver = new Driver();

    let loginPageInstance = new LoginPage(driver);

    let timelineInstance = new Timeline(driver);

    beforeAll(async () => {
      driver.goTo(ROOT_URL);
    });

    afterAll(() => {
      console.log("This test suit have been run");
      driver.quit();
    });

    it("should wait for the header to load", async () => {
      const header = await loginPageInstance.waitForHeader(signUpTitle);
      expect(header).toBe("See what’s happening in the world right now");
    });

    it("should log in", async () => {
      await loginPageInstance.login(EMAIL, PASSWORD);
    });

    it("should post message", async () => {
      await timelineInstance.postMessage();
    });

    it("should delete message", async () => {
      await timelineInstance.deleteMessage();
    });
  });
  describe("Profile Page", () => {
    const driver = new Driver();
    let loginPageInstance = new LoginPage(driver);
    let profilePageInstance = new ProfilePage(driver);

    beforeAll(() => {
      driver.goTo(ROOT_URL);
    });
    afterAll(() => {
      console.log("This test suit have been run");
      driver.quit();
    });

    it("should wait for the header to load", async () => {
      const header = await loginPageInstance.waitForHeader(signUpTitle);
      expect(header).toBe("See what’s happening in the world right now");
    });

    it("should log in", async () => {
      await loginPageInstance.login(EMAIL, PASSWORD);
    });

    it("should scrape the data of the searched profile", async () => {
      const data = await profilePageInstance.search();
      console.log(data);
    });

    it("should download the profile avatar", async () => {
      await profilePageInstance.sayCheese();
    });
  });
});
