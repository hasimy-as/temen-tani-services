const { v4: uuid } = require('uuid');

const logger = require('../../../../helpers/lib/logger');
const response = require('../../../../helpers/utils/response');

const Wholesale = require('../models/Wholesale');
const Crypt = require('../../../../helpers/utils/crypt');

const { CODE } = require('../../../../helpers/lib/httpCode');

class WholesaleCommand {
  static async register(req, res) {
    const actionType = 'register';
    const cx = `wholesale-${actionType}`;

    const payload = { ...req.body };

    const wholesale = await Wholesale.findOne({ $or: [{ name: payload.name }, { email: payload.email }] });
    if (wholesale) {
      logger.error(cx, 'Wholesale already registered.');
      return response.error(res, 'Pengepul sudah terdaftar!', CODE.CONFLICT);
    }

    const password = await Crypt.hash(payload.password);
    const result = await Wholesale.create({
      wholesaleId: uuid(),
      ...payload,
      password,
    });

    return response.data(res, 'Pengepul berhasil terdaftar.', result);
  }

  static async login(req, res) {
    const actionType = 'login';
    const cx = `wholesale-${actionType}`;

    const { email, password } = req.body;

    const wholesale = await Wholesale.findOne({ email });
    if (!wholesale) {
      logger.error(cx, 'Email not found.');
      return response.error(res, 'Email tidak ditemukan!', CODE.NOT_FOUND);
    }

    const accessToken = await Crypt.signToken(res, wholesale, { email, password });
    const result = {
      wholesaleId: wholesale.wholesaleId,
      email,
      expiresIn: 86400,
      accessToken
    };

    return response.data(res, 'Anda telah login.', result);
  }

  static async farmerWholesale(req) {
    const actionType = 'farmerWholesale';
    const cx = `wholesale-${actionType}`;

    const { farmerId, wholesaleId } = req;

    const result = await Wholesale.updateOne({ wholesaleId }, { $push: { farmers: farmerId } });
    if (!result) {
      logger.error(cx, 'Failed to insert farmer to wholesaler.');
    }

    return logger.info(cx, 'Farmer successfully inserted to wholesaler');
  }
}

module.exports = WholesaleCommand;
