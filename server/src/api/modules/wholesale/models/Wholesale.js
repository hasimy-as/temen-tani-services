const { v4: uuid } = require('uuid');
const mongoose = require('mongoose');

const { ROLES } = require('../../../../helpers/utils/commons');

const wholesaleSchema = new mongoose.Schema(
  {
    wholesaleId: { type: String, default: uuid() },
    name: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    about: { type: String, required: true },
    roles: {
      type: String,
      enum: ROLES.WHOLESALE,
      required: true
    },
    rating: [
      {
        _id: false,
        value: {
          type: String,
          minLength: 1,
          maxLength: 2
        },
        comment: { type: String },
        farmerId: { type: String }
      }
    ],
    farmers: [ String ],
    isActive: { type: Boolean, default: true }
  }
);

module.exports = mongoose.model('Wholesale', wholesaleSchema);
