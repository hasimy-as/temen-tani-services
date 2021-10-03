const consumer = require('kafka-node').ConsumerGroup;

const config = require('../../config/config');

class ConsumerKafka {
  createConsumerGroup(data) {
    let options = {
      kafkaHost: config.get('/kafkaHost'),
      autoCommit: false,
      fetchMaxBytes: 10 * 1024 * 1024,
      groupId: data.groupId,
      sessionTimeout: 15000,
      protocol: ['roundrobin'],
      fromOffset: 'latest',
      encoding: 'utf8',
      keyEncoding: 'utf8'
    };

    return new consumer(options, data.topic);
  }
}

module.exports = ConsumerKafka;
