const sequence = require("./_default");
const sleep = require("./_sleep");
const sleepRange = require("./_sleep_range");

module.exports = sequence;
module.exports.withSleep = sleep;
module.exports.withSleepRange = sleepRange;
