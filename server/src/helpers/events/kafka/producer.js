const kafka = require('kafka-node');

const cx = 'kafka-kafkaProducer';
const logger = require('../../lib/logger');
const config = require('../../config/config');

const kafkaClient = new kafka.KafkaClient({ kafkaHost: config.get('/kafkaHost') });
const kafkaProducer = new kafka.HighLevelProducer(kafkaClient);

const kafkaSendProducer = (payload) => {
  const buffer = new Buffer.from(JSON.stringify(payload.body));
  const record = [
    {
      topic: payload.topic,
      messages: buffer,
      attributes: payload.attributes,
      partitionerType: payload.partition
    }
  ];

  kafkaProducer.send(record, (err, data) => {
    if (err) {
      logger.error(cx, `Error: ${err}`);
    }

    const imbedded = record.shift();
    logger.info(cx, `Data sent to ${imbedded.topic}`, 'OK');
  });
};

kafkaProducer.on('ready', () => logger.info(cx, 'Kafka producer is ready.'));
kafkaProducer.on('error', (error) => logger.error(cx, error));

module.exports = {
  kafkaSendProducer
};
