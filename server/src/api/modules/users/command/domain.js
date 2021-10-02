const { v4: uuid } = require('uuid');

const logger = require('../../../../helpers/lib/logger');
const response = require('../../../../helpers/utils/response');

const User = require('../models/User');
const Crypt = require('../../../../helpers/utils/crypt');

const { CODE } = require('../../../../helpers/lib/httpCode');

class UserCommand {
  static async register(req, res) {
    const cx = 'users-register';
    const payload = { ...req.body };

    const user = await User.findOne({ $or: [{ nik: payload.nik }, { email: payload.email }] });
    if (user) {
      logger.error(cx, 'User already registered.');
      return response.error(res, 'User sudah terdaftar!', CODE.CONFLICT);
    }

    const password = await Crypt.hash(payload.password);
    const result = await User.create({
      ...payload,
      userId: uuid(),
      password: password,
    });

    return response.data(res, 'User berhasil terdaftar.', result);
  }

  static async login(req, res) {
    const cx = 'users-login';
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      logger.error(cx, 'Email not found.');
      return response.error(res, 'Email tidak ditemukan!', CODE.NOT_FOUND);
    }

    const accessToken = await Crypt.signToken(res, user, { email, password });
    const result = {
      userId: user.userId,
      email,
      expiresIn: 86400,
      accessToken
    };

    return response.data(res, 'Anda telah login.', result);
  }
}

module.exports = UserCommand;
