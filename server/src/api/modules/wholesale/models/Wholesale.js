const joi = require('joi');
const mongoose = require('mongoose');
const joigoose = require('joigoose')(mongoose, { convert: false });

const { ROLES } = require('../../../../helpers/utils/commons');

const uuid = joi.string().guid();

const wholesaleSchema = joi.object({
  wholesaleId: uuid,
  name: joi.string().required(),
  address: joi.string().required(),
  email: joi.string().regex(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/).required(),
  password: joi.string().min(6).required(),
  phoneNumber: joi.string().regex(/^[0-9+]{10,20}$/).required(),
  about: joi.string().required(),
  roles:  joi.string().valid(ROLES.WHOLESALER).optional().default(ROLES.WHOLESALER),
  rating: joi.array().items(
    joi.object({
      value: joi.string().min(1).max(2).required(),
      comment: joi.string().required(),
      farmerId: uuid.optional()
    })
  ).optional(),
  farmers: joi.array().items(uuid.optional).optional(),
  isActive: joi.bool().default(true).optional()
});

const Wholesale = mongoose.model('Wholesale', new mongoose.Schema(joigoose.convert(wholesaleSchema)));

module.exports = Wholesale;
