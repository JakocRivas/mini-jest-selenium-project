require("../resources/configuration/env");
const { EMAIL, PASSWORD, ROOT_URL } = process.env,
  { signUpTitle } = require("../resources/PO/login/header"),
  { home } = require("../resources/PO/timeLine/header"),
  {
    getElementByName,
    getTitle,
    Key,
    driver,
    By,
    getElementByTagName,
    quit,
    goTo,
    refresh,
    waitFor
  } = require("../resources/configuration/selenium");

let LoginPage = require("../resources/PO/LoginPage");
let Timeline = require("../resources/PO/TimelinePage");
let ProfilePage = require("../resources/PO/ProfilePage");

describe("twitter", () => {
  beforeAll(async () => {
    goTo(ROOT_URL);
    loginPageInstance = new LoginPage();
    timelineInstance = new Timeline();
    profilePageInstance = new ProfilePage();

    const header = await loginPageInstance.waitForHeader(signUpTitle);
    await expect(header).toBe("See what’s happening in the world right now");
    await loginPageInstance.login(EMAIL, PASSWORD);
  });

  afterAll(() => {
    console.log("rawr");
    quit();
  });

  it("should wait of the timeline to load", async () => {
    const header = await loginPageInstance.waitForHeader(home);
    console.log(header);
    await expect(header).toBe("Home");
  });

  it("should post message", async () => {
    await timelineInstance.postMessage();
  });

  it("should delete message", async () => {
    await timelineInstance.deleteMessage();
  });

  it("if an user was searched", async () => {
    await waitFor(15000);
    await profilePageInstance.search();
  });

  xit("should scrape the data of the person that has been searched", async () => {
    const data = await profilePageInstance.getData();
    console.log(data);
  });

  xit("should download avatar", async () => {
    await profilePageInstance.sayCheese();
  });
});
