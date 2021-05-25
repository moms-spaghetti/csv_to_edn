const converter = async (ednRow, model, ednTemplate, ednFile, csvReader) => {
  let _ednOutput = [];

  try {
    _ednOutput = await csvReader()
      .then((csvData) => model(csvData))
      .then((data) => ednRow(data))
      .then((rows) => ednTemplate(rows));

    ednFile(_ednOutput);
  } catch (error) {
    console.log(console.log(error));
  }
};

module.exports = converter;
