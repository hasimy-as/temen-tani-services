const { v4: uuid } = require('uuid');
const mongoose = require('mongoose');

const { GENDER, ROLES } = require('../../../../helpers/utils/commons');

const farmerSchema = new mongoose.Schema(
  {
    farmerId: { type: String, default: uuid() },
    wholesaleId: {
      type: String,
      default: () => {
        return this.isWithWholesale ? uuid() : '';
      },
      required: () => {
        return this.isWithWholesale ? true : false;
      }
    },
    name: { type: String, required: true },
    address: { type: String, required: true },
    gender: { type: String, enum: [GENDER.MALE, GENDER.FEMALE] },
    nik: {
      type: String,
      minLength: 16,
      maxLength: 16,
      required: true
    },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    roles: {
      type: String,
      enum: ROLES.FARMER,
      required: true
    },
    landData: [
      {
        _id: false,
        size: { type: String },
        address: { type: String }
      },
    ],
    commodity: [
      {
        _id: false,
        name: { type: String },
        description: { type: String }
      }
    ],
    isActive: { type: Boolean, default: true },
    isWithWholesale: { type: Boolean, default: false }
  }
);

module.exports = mongoose.model('Farmer', farmerSchema);
