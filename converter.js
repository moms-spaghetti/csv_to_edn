const { ednRow, model, ednTemplate, ednFile, csvReader } = require("./modules");
const { marketPlaceIdent, outputFileName } = require("./config/settings");

let csvData = [];
let data = [];
let rows = [];
let template = ``;

const runner = async () => {
  try {
    csvData = await csvReader();
    data = model(csvData);
    rows = ednRow(data);
    template = ednTemplate(rows, marketPlaceIdent);
    ednFile(outputFileName, template);
  } catch (error) {
    console.log(console.log(error));
  }
};

runner();
