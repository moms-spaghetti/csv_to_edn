var moment = require("moment");
const { timeFormat } = require("../config/settings");

const timeStamp = () => moment().format(timeFormat + "-00:00");

module.exports = timeStamp;
