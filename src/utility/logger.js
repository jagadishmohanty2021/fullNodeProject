const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");

const { combine, printf, errors, timestamp } = winston.format;

/** formatted logging message  */
const customFormat = printf(({ level, message, timestamp, stack }) => {
  if (stack) {
    return `${timestamp} ${level}: ${message} - ${stack}`;
  }
  return `${timestamp} ${level}: ${message}`;
});

const dailyTransport = new DailyRotateFile({
  filename: "logger/api-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  auditFile: "log-audit.json",
});

const logger = winston.createLogger({
  format: combine(errors({ stack: true }), timestamp(), customFormat),
  transports: [dailyTransport],
});

module.exports = {
  logger,
};
