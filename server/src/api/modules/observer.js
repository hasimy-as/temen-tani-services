const cx = 'modules-observer';

const logger = require('../../helpers/lib/logger');
const wholesaleEvents = require('./wholesale/handlers/event');

const initializeEvent = async () => {
  // Declare functions to observe here
  await wholesaleEvents.farmerWholesale();

  logger.info(cx, 'Kafka observer is running.');
};

module.exports = {
  init: initializeEvent
};
