const WholesaleCommand = require('../command/domain');

const logger = require('../../../../helpers/lib/logger');
const kafkaConsumer = require('../../../../helpers/events/kafka/consumer');

const farmerWholesale = async () => {
  const cx = 'farmer-onboarding-wholesale';
  const dataConsumer = { topic: cx, groupId: cx };

  const consumer = new kafkaConsumer(dataConsumer)
    .createConsumerGroup(dataConsumer);

  consumer.on('message', async (message) => {
    try {
      const payload = JSON.parse(message.value);
      const result = await WholesaleCommand.farmerWholesale(payload);

      if (!result) {
        logger.error(cx, `Error to kafka: ${result}`);
      }
      else {
        consumer.commit(true, async (err, data) => {
          if (err) {
            logger.error(cx, `Error to kafka: ${err}`);
          }

          logger.info(cx, `Success to kafka: ${data}`);
        });
      }
    } catch (err) {
      logger.error(cx, `Error: ${err}`);
    }
  });
};

module.exports = {
  farmerWholesale
};
