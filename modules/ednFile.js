const fs = require("fs");
const { fileWriteMsg } = require("../config/settings");

const ednFile = (filename, ednTemplate) => {
  fs.writeFile(filename, ednTemplate, function (err) {
    if (err) return console.log(err);
    console.log(fileWriteMsg);
  });
};

module.exports = ednFile;
