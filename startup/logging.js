const winston = require("winston");
require("express-async-errors");

module.exports = function () {
  winston.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
      handleExceptions: true,
      handleRejections: true,
    })
  );
  winston.add(
    new winston.transports.File({
      filename: "combined.log",
      handleExceptions: true,
      handleRejections: true,
    })
  );
};
