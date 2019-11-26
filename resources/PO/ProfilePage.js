const {
    searchBar,
    searchedPerson,
    person,
    results
  } = require("./search/search"),
  {
    name,
    account,
    bio,
    location,
    personalSite,
    joinDate,
    navInformation,
    avatar
  } = require("./profile/profile"),
  {
    getElementBySelector,
    waitForElement,
    getWebElement,
    waitForSelector,
    waitElementClickable,
    waitFor,
    getListOfSelector,
    refresh,
    awaitIt,
    pressEnter
  } = require("../configuration/selenium"),
  {
    waitAndClickSelector,
    TypeOnSelector,
    waitListOfSelectors
  } = require("../helpers/helper");
var crypto = require("crypto");

class ProfilePage {
  constructor() {
    this.searchBar = searchBar;
    this.person = person;
    this.searchedPerson = searchedPerson;

    this.name = name;
    this.account = account;
    this.bio = bio;
    this.location = location;
    this.personalSite = personalSite;
    this.joinDate = joinDate;
    this.navInformation = navInformation;
    this.avatar = avatar;
    this.results = results;
  }

  async search() {
    await refresh();
    await waitForSelector(this.searchBar);
    await waitElementClickable(this.searchBar);

    await waitAndClickSelector(this.searchBar);
    await TypeOnSelector(this.searchBar, this.person);
    await waitAndClickSelector(this.searchBar);

    await pressEnter(this.searchBar);

    // await waitForSelector(this.results);
    // await waitElementClickable(this.results);
    // await waitAndClickSelector(this.results);

    await waitForSelector(this.searchedPerson);
    await waitElementClickable(this.searchedPerson);

    await waitAndClickSelector(this.searchedPerson);
    // await getElementBySelector(this.searchedPerson).then(elem => {
    //   elem.click();
    // });
  }

  async getData() {
    let data = {};

    const accountData = async object => {
      await waitListOfSelectors([
        // this.name,
        // this.account,
        this.bio,
        this.location,
        this.personalSite,
        this.joinDate
      ]);

      // const personName = await getElementBySelector(this.name).then(text =>
      //   text.getText()
      // );
      // const personAccount = await getElementBySelector(this.account).then(
      //   text => text.getText()
      // );
      const personBio = await getElementBySelector(this.bio).then(text =>
        text.getText()
      );
      const personLocation = await getElementBySelector(
        this.location
      ).then(text => text.getText());
      const personPersonalSite = await getElementBySelector(
        this.personalSite
      ).then(text => text.getText());
      const personJoinDate = await getElementBySelector(
        this.joinDate
      ).then(text => text.getText());
      // object["name"] = personName;
      // object["account"] = personAccount;
      object["bio"] = personBio;
      object["location"] = personLocation;
      object["site"] = personPersonalSite;
      object["join date"] = personJoinDate;
    };
    await accountData(data);

    //   const navData = async object => {
    //     await waitForSelector(this.navInformation);
    //     const numberOfActions = await getListOfSelector(this.navInformation);
    //     object["Tweets"] = await numberOfActions[0].getText();
    //     object["Following"] = await numberOfActions[1].getText();
    //     object["Followers"] = await numberOfActions[2].getText();
    //     object["Likes"] = await numberOfActions[3].getText();
    //   };
    //   await navData(data);
    return data;
  }

  async sayCheese() {
    await waitForSelector(this.avatar);
    const img = await getElementBySelector(this.avatar);

    const imgSrc = await img.getAttribute("src");
    const imageName = crypto.randomBytes(5).toString("hex");

    const download = require("image-downloader");

    // Download to a directory and save with the original filename
    const options = {
      url: imgSrc,
      dest: "./img" // Save to /path/to/dest/image.jpg
    };
    await download
      .image(options)
      .then(({ imageName, image }) => {
        console.log("Saved to", imageName); // Saved to /path/to/dest/image.jpg
      })
      .catch(err => console.error(err));
  }
}
module.exports = ProfilePage;
