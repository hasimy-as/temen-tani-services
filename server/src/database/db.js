const mongoose = require('mongoose');

const logger = require('../helpers/lib/logger');

const connectDB = async (uri) => {
  const cx = 'db-connect';
  const mongoOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    keepAlive: 15000,
    socketTimeoutMS: 15000,
    connectTimeoutMS: 15000,
  };

  await mongoose.connect(uri, mongoOpts)
    .then(() => {
      logger.info(cx, 'Connected to database');
    })
    .catch((err) => {
      logger.error(cx, err.message);
      return process.exit(1);
    });
};

module.exports = connectDB;
