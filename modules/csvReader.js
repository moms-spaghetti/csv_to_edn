const csv = require("csv-parser");
const fs = require("fs");
const { separator, csvFileLocation } = require("../config/settings");

let csvData = [];

const csvReader = async () => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(csvFileLocation)
      .pipe(csv({ separator }))
      .on("error", (error) => reject(error))
      .on("data", (row) => {
        csvData = [...csvData, row];
      })
      .on("end", () => resolve(csvData));
  });
};

module.exports = csvReader;
