const { CODE } = require('../lib/httpCode');

class Response {
  static data(res, message, data) {
    return res.status(CODE.SUCCESS).json({
      success: true,
      data: data,
      message: message,
      code: CODE.SUCCESS,
    });
  }

  static error(res, message, code) {
    return res.status(code).json({
      success: false,
      data: null,
      message: message,
      code: code,
    });
  }
}

module.exports = Response;
