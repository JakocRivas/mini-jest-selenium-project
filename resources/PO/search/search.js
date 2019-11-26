const search = "@css";
module.exports = {
  searchBar: `input[data-testid="SearchBox_Search_Input"]`,
  searchedPerson: `div[data-testid="UserCell"] a[href="/${search.slice(1)}"]`,
  person: search
};
