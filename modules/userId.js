const { characters, idLength } = require("../config/settings");

const userId = (firstName, lastName, userEmail) => {
  var result = [];
  var charactersLength = characters.length;
  for (var i = 0; i < idLength; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength))
    );
  }
  return {
    FIRSTNAME: formatName(firstName),
    LASTNAME: formatName(lastName),
    USEREMAIL: userEmail.toLowerCase(),
    USERNAME: `${firstName.toLowerCase()}${result.join("")}`,
  };
};

const formatName = (userDetail) =>
  userDetail.charAt(0).toUpperCase() + userDetail.slice(1);

module.exports = userId;
