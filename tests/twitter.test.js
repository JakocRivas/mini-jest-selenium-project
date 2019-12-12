require("../resources/configuration/env");
const { EMAIL, PASSWORD, ROOT_URL } = process.env,
  { signUpTitle } = require("../resources/PO/login/header"),
  { home } = require("../resources/PO/timeLine/header");

let Driver = require("../resources/configuration/selenium"),
  LoginPage = require("../resources/PO/LoginPage"),
  Timeline = require("../resources/PO/TimelinePage"),
  ProfilePage = require("../resources/PO/ProfilePage");

describe("Twitter", () => {
  // beforeEach(() => {
  // loginPageInstance = new LoginPage();

  // profilePageInstance = new ProfilePage();
  // });

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
      console.log(await data);
    });

    it("should download the profile avatar", async () => {
      await profilePageInstance.sayCheese();
    });
  });
});

// describe("twitter", () => {
//   beforeAll(async () => {
//     goTo(ROOT_URL);
//     loginPageInstance = new LoginPage();
//     timelineInstance = new Timeline();
//     profilePageInstance = new ProfilePage();

//     const header = await loginPageInstance.waitForHeader(signUpTitle);
//     await expect(header).toBe("See what’s happening in the world right now");
//     await loginPageInstance.login(EMAIL, PASSWORD);
//   });

//   afterAll(() => {
//     console.log("rawr");
//     quit();
//   });

//   it("should wait of the timeline to load", async () => {
//     const header = await loginPageInstance.waitForHeader(home);
//     await expect(header).toBe("Home");
//   });

//   it("should post message", async () => {
//     await timelineInstance.postMessage();
//   });

//   it("should delete message", async () => {
//     await timelineInstance.deleteMessage();
//   });

//   it("if an user was searched", async () => {
//     await waitFor(15000);
//     await profilePageInstance.search();
//     await waitFor(15000);
//   });

//   it("should scrape the data of the person that has been searched", async () => {
//     const data = await profilePageInstance.getData();
//     console.log(await data);
//   });

//   it("should download avatar", async () => {
//     await profilePageInstance.sayCheese();
//   });
// });
