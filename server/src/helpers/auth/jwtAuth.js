const jwt = require('jsonwebtoken');

const config = require('../config/config');
const { CODE } = require('../lib/httpCode');
const response = require('../utils/response');

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, config.get('/secretKey'), (err, user) => {
      if (err) {
        return response.error(res, 'Invalid token!', CODE.FORBIDDEN);
      }

      req.user = user;
      next();
    });
  } else {
    return response.error(res, 'Token has expired!', CODE.UNAUTHORIZED);
  }
};

module.exports = {
  authenticateJWT
};
