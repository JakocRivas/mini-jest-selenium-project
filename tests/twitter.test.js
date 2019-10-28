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
    goTo
  } = require("../resources/configuration/selenium");

let LoginPage = require("../resources/PO/LoginPage");
let Timeline = require("../resources/PO/TimelinePage");
let ProfilePage = require("../resources/PO/ProfilePage");

describe("twitter", () => {
  beforeAll(async () => {
    goTo('https://twitter.com');
    loginPageInstance = new LoginPage();
    timelineInstance = new Timeline();
    profilePageInstance = new ProfilePage();
  });

  afterAll(() => {
    console.log("rawr");
    quit();
  });

  test("if there is a header on the page", async () => {
    const header = await loginPageInstance.waitForHeader(signUpTitle);
    await expect(header).toBe("See what’s happening in the world right now");
  });

  it("should log in", async () => {
    await loginPageInstance.login("testyboiint@gmail.com", "welcome1234");
  });

  it("should wait of the timeline to load", async () => {
    const header = await loginPageInstance.waitForHeader(home);
    expect(header).toBe("Home");
  });

  xit("should post message", async () => {
    await timelineInstance.postMessage();
  });

  xit("should delete message", async () => {
    await timelineInstance.deleteMessage();
  });

  test("if an user was searched", async () => {
    await profilePageInstance.search();
  });

  it("should scrape the data of the person that has been searched", async () => {
    await profilePageInstance.getData();
  });
});
