const mongoose = require("mongoose");
const winston = require("winston");
const config = require("config");

module.exports = function () {
  const db_url = config.get("db");
  /*
  mongoose
    .connect(db_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferMaxEntries: 0,
      reconnectTries: 2,
      reconnectInterval: 500,
    })
    .then(() => winston.info(`Connected to MongoDB ${db_url}`));
  */

  mongoose
    .connect(db_url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then(() => winston.info(`Connected to MongoDB ${db_url}`));
};
