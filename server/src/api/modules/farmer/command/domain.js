const { v4: uuid } = require('uuid');

const logger = require('../../../../helpers/lib/logger');
const response = require('../../../../helpers/utils/response');
const producer = require('../../../../helpers/events/kafka/producer');

const Farmer = require('../models/Farmer');

const Crypt = require('../../../../helpers/utils/crypt');
const { CODE } = require('../../../../helpers/lib/httpCode');
const { ROLES } = require('../../../../helpers/utils/commons');

class FarmerCommand {
  static async register(req, res) {
    const actionType = 'register';
    const cx = `farmer-${actionType}`;

    const payload = { ...req.body };
    const farmer = await Farmer.findOne({
      $or: [{ nik: payload.nik }, { name: payload.name }, { email: payload.email }]
    });

    if (farmer) {
      logger.error(cx, 'Farmer already registered.');
      return response.error(res, 'Petani sudah terdaftar!', CODE.CONFLICT);
    }

    const password = await Crypt.hash(payload.password);
    const result = await Farmer.create({
      farmerId: uuid(),
      ...payload,
      password,
      createdAt: new Date().toISOString()
    });

    if (payload.isWithWholesale) {
      const sendToKafka = {
        topic: 'farmer-onboarding-wholesale',
        attributes: 1,
        body: {
          wholesaleId: payload.wholesaleId,
          farmerId: result.farmerId,
        },
        partition: 1
      };

      producer.kafkaSendProducer(sendToKafka);
    }

    return response.data(res, 'Petani berhasil terdaftar.', result);
  }

  static async login(req, res) {
    const actionType = 'login';
    const cx = `farmer-${actionType}`;

    const { email, password } = req.body;

    const farmer = await Farmer.findOne({ email });
    if (!farmer) {
      logger.error(cx, 'Email not found.');
      return response.error(res, 'Email tidak ditemukan!', CODE.NOT_FOUND);
    }

    const accessToken = await Crypt.signToken(res, farmer, { email, password });
    const result = {
      farmerId: farmer.farmerId,
      loginId: uuid(),
      email,
      roles: farmer.roles,
      expiresIn: 86400,
      accessToken
    };

    return response.data(res, 'Anda telah login.', result);
  }

  static async onboardWholesale(req, res) {
    const actionType = 'onboardWholesale';
    const cx = `farmer-${actionType}`;

    const payload = { ...req.user, ...req.body, ...req.params };

    if (payload.roles !== ROLES.FARMER) {
      logger.error(cx, 'Not a farmer.');
      return response.error(res, 'Anda bukan petani!', CODE.BAD_REQUEST);
    }

    const findByFarmerId = await Farmer.findOne({ farmerId: payload.farmerId });
    if (!findByFarmerId) {
      logger.error(cx, 'Farmer not found.');
      return response.error(res, 'Petani tidak ditemukan!', CODE.NOT_FOUND);
    }

    const updateData = {
      $set: {
        wholesaleId: payload.wholesaleId,
        isWithWholesale: payload.isWithWholesale
      }
    };

    const farmer = Farmer.updateOne({ farmerId: payload.farmerId }, updateData);
    if (!farmer) {
      logger.error(cx, 'Failed to onboard farmer.');
      return response.error(res, 'Gagal mendaftarkan petani ke pengepul!', CODE.INTERNAL_ERROR);
    }

    const sendToKafka = {
      topic: 'farmer-onboarding-wholesale',
      attributes: 1,
      body: {
        wholesaleId: payload.wholesaleId,
        farmerId: payload.farmerId,
      },
      partition: 1
    };

    producer.kafkaSendProducer(sendToKafka);

    return response.data(res, 'Petani berhasil terdaftar di pengepul.', 'OK');
  }
}

module.exports = FarmerCommand;
