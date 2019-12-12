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
    waitAndClickSelector,
    TypeOnSelector,
    waitListOfSelectors
  } = require("../helpers/helper");
const crypto = require("crypto");

class ProfilePage {
  constructor(driver) {
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
    this.driver = driver;
  }

  async search() {
    await this.driver.refresh();
    await this.driver.waitForSelector(this.searchBar);
    await this.driver.waitElementClickable(this.searchBar);

    await waitAndClickSelector(this.driver, this.searchBar);
    await TypeOnSelector(this.driver, this.searchBar, this.person);
    await waitAndClickSelector(this.driver, this.searchBar);

    await this.driver.pressEnter(this.searchBar);

    await this.driver.waitForSelector(this.searchedPerson);
    await this.driver.waitElementClickable(this.searchedPerson);

    await waitAndClickSelector(this.driver, this.searchedPerson);
  }

  async getData() {
    let data = {};

    const accountData = async object => {
      await waitListOfSelectors(this.driver, [
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
      const personBio = await this.driver
        .getElementBySelector(this.bio)
        .then(text => text.getText());
      const personLocation = await this.driver
        .getElementBySelector(this.location)
        .then(text => text.getText());
      const personPersonalSite = await this.driver
        .getElementBySelector(this.personalSite)
        .then(text => text.getText());
      const personJoinDate = await this.driver
        .getElementBySelector(this.joinDate)
        .then(text => text.getText());
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
    await this.driver.waitForSelector(this.avatar);
    const img = await this.driver.getElementBySelector(this.avatar);

    const imgSrc = await img
      .getAttribute("style")
      .then(src => src.slice(22, -2));

    const imageName = crypto.randomBytes(5).toString("hex");

    const download = require("image-downloader");

    // Download to a directory and save with the original filename
    const options = {
      url: imgSrc.slice(1, -1),
      dest: "./img" // Save to /path/to/dest/image.jpg
    };
    await download
      .image(options)
      .then(({ imageName }) => {
        console.log("Saved to", `./img/${imageName}.jpg`); // Saved to /path/to/dest/image.jpg
      }, imageName)
      .catch(err => console.error(err, imageName));
  }
}
module.exports = ProfilePage;
