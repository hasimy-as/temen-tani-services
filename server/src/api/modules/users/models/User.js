const { v4: uuid } = require('uuid');
const mongoose = require('mongoose');

const { ROLES } = require('../../../../helpers/utils/commons');

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: uuid()
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  roles: {
    type: String,
    enum: [ROLES.WHOLESALER, ROLES.FARMER],
    required: true
  },
  nik: {
    type: String,
    minLength: 16,
    maxLength: 16,
    required: () => {
      return this.roles === ROLES.FARMER;
    },
    validate(nik) {
      if (this.roles !== ROLES.FARMER && nik) {
        throw new Error();
      }
    },
  },
});

module.exports = mongoose.model('User', userSchema);
