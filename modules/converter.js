const ednRow = require("./ednRow");
const ednTemplate = require("./ednTemplate");
const ednFile = require("./ednFile");
const csvReader = require("./csvReader");

const converter = async () => {
  let _ednOutput = [];

  try {
    _ednOutput = await csvReader()
      .then((csvData) => ednRow(csvData))
      .then((rows) => ednTemplate(rows));

    ednFile(_ednOutput);
  } catch (error) {
    console.log(console.log(error));
  }
};

module.exports = converter;
