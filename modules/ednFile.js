const fs = require("fs");
const { fileWriteMsg, outputFileName } = require("../config/settings");

const ednFile = (ednTemplate) => {
  fs.writeFile(outputFileName, ednTemplate, function (err) {
    if (err) return console.log(err);
    console.log(fileWriteMsg);
  });
};

module.exports = ednFile;
