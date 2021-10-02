const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const response = require('./response');
const logger = require('../lib/logger');
const config = require('../config/config');

const { CODE } = require('../lib/httpCode');

class Crypt {
  static async hash(data) {
    const salt = await bcrypt.genSalt(10);
    const res = await bcrypt.hash(data, salt);

    return res;
  }

  static async signToken(res, data, payload) {
    const cx = 'crypt-signToken';
    const validate = await bcrypt.compare(payload.password, data.password);

    if (!validate) {
      logger.error(cx, 'Incorrect credentials!');
      return response.error(res, 'Incorrect credentials!', CODE.FORBIDDEN);
    }

    const accessToken = await jwt.sign({ email: payload.email, roles: data.roles }, config.get('/secretKey'), { expiresIn: 86400 });
    return accessToken;
  }
}

module.exports = Crypt;
