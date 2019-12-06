require("../resources/configuration/env");
const { EMAIL, PASSWORD, ROOT_URL } = process.env,
  { signUpTitle } = require("../resources/PO/login/header"),
  { home } = require("../resources/PO/timeLine/header"),
  {
    quit,
    goTo,

    newDriver
  } = require("../resources/configuration/selenium");

let LoginPage = require("../resources/PO/LoginPage");
let Timeline = require("../resources/PO/TimelinePage");
let ProfilePage = require("../resources/PO/ProfilePage");
describe.only("Twitter", () => {
  // beforeEach(() => {
  // loginPageInstance = new LoginPage();
  // timelineInstance = new Timeline();

  // profilePageInstance = new ProfilePage();
  // });

  afterAll(() => {
    console.log("All test suits have been run");
  });

  describe.only("Login Page", () => {
    beforeAll(async () => {
      let d = await newDriver();

      let loginPageInstance = new LoginPage(d);
      console.log(await loginPageInstance);
      goTo(loginPageInstance.driver, ROOT_URL);
    });

    afterAll(async () => {
      console.log("This test suit have been run");
      quit(loginPageInstance.driver);
    });

    it("should wait for the header to load", async () => {
      console.log(await loginPageInstance);

      const header = await loginPageInstance.waitForHeader(
        loginPageInstance.driver,
        signUpTitle
      );
      expect(header).toBe("See what’s happening in the world right now");
    });

    it("should log in", async () => {
      console.log(loginPageInstance.driver);

      await loginPageInstance.login(loginPageInstance.driver, EMAIL, PASSWORD);
    });
  });

  describe("Timeline Page", () => {
    beforeAll(async () => {
      goTo(ROOT_URL);
      console.log(d);
      const header = await loginPageInstance.waitForHeader(d, signUpTitle);
      expect(header).toBe("See what’s happening in the world right now");
    });

    afterAll(async () => {
      console.log("This test suit have been run");
      await quit();
    });

    it("should wait of the timeline to load", async () => {
      const header = await loginPageInstance.waitForHeader(d, home);
      await expect(header).toBe("Home");
    });

    it("should post message", async () => {
      await timelineInstance.postMessage(d);
    });

    it("should delete message", async () => {
      await timelineInstance.deleteMessage(d);
    });
  });
  // describe("Profile Page", () => {});
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
