const winston = require('winston');

const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level: 'info',
      handleExceptions: true,
      json: false,
      colorize: true
    })
  ],
  exitOnError: false
});

const info = (context, message) => logger.info({
  context: context,
  message: message.toString()
});

const error = (context, message) => logger.error({
  context: context,
  message: message.toString()
});

module.exports = {
  info,
  error
};
