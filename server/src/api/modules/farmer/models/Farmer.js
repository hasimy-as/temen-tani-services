const joi = require('joi');
const mongoose = require('mongoose');
const joigoose = require('joigoose')(mongoose, { convert: false });

const { GENDER, ROLES } = require('../../../../helpers/utils/commons');

const uuid = joi.string().guid();

const farmerSchema = joi.object({
  farmerId: uuid,
  name: joi.string().required(),
  address: joi.string().required(),
  gender: joi.string().valid(GENDER.MALE, GENDER.FEMALE).required(),
  nik: joi.string().min(16).max(16).required(),
  email: joi.string().regex(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/).required(),
  password: joi.string().min(6).required(),
  phoneNumber: joi.string().regex(/^[0-9+]{10,20}$/).required(),
  roles:  joi.string().valid(ROLES.FARMER).optional().default(ROLES.FARMER),
  isActive: joi.string().default(true).optional(),
  isWithWholesale: joi.string().default(false).optional(),
  landData: joi.array().items(
    joi.object({
      _id: joi.forbidden(),
      size: joi.string().required(),
      address: joi.string().required()
    })
  ).required(),
  commodity: joi.array().items(
    joi.object({
      _id: joi.forbidden(),
      name: joi.string().required(),
      description: joi.string().required()
    })
  ).required(),
  wholesaleId: uuid.optional()
});

const Farmer = mongoose.model('Farmer', new mongoose.Schema(joigoose.convert(farmerSchema)));

module.exports = Farmer;
