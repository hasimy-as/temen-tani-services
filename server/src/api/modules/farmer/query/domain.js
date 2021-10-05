const validate = require('validate.js');

const logger = require('../../../../helpers/lib/logger');
const response = require('../../../../helpers/utils/response');

const Farmer = require('../models/Farmer');

const { CODE } = require('../../../../helpers/lib/httpCode');

class FarmerQuery {
  static async listFarmer(req, res) {
    const actionType = 'listFarmer';
    const cx = `farmer-${actionType}`;

    const farmer = await Farmer.find();
    if (validate.isEmpty(farmer)) {
      logger.error(cx, 'Farmer not found.');
      return response.error(res, 'Petani tidak ditemukan!', CODE.NOT_FOUND);
    }

    const data = farmer.map(farmerElm => { 
      farmerElm.password = '';
      return farmerElm; 
    });

    return response.data(res, 'Petani ditemukan.', data);
  }

  static async detailFarmer(req, res) {
    const actionType = 'findOneFarmer';
    const cx = `farmer-${actionType}`;

    const farmerId = req.params;

    const farmer = await Farmer.findOne(farmerId);
    if (validate.isEmpty(farmer)) {
      logger.error(cx, 'Farmer not found.');
      return response.error(res, 'Petani tidak ditemukan!', CODE.NOT_FOUND);
    }
    farmer.password = "";

    return response.data(res, 'Petani ditemukan.', farmer);
  }
}

module.exports = FarmerQuery;
