const mongoose = require('mongoose');
const config = require('../config/default.sample');

if (mongoose.connection.readyState === 0) {
  mongoose.connect(config.mongoose.uri, config.mongoose.options);
}

mongoose.Promise = global.Promise;

module.exports = mongoose;
