const sinon = require('sinon');
const assert = require('assert');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Crypt = require('../../../../src/helpers/utils/crypt');
const { CODE } = require('../../../../src/helpers/lib/httpCode');

let res;
let data;
let payload;

describe('#crypt.js', () => {
  describe('hash', () => {
    it('Should hash incoming data', async () => {
      payload = 'test123';
      await Crypt.hash(payload);
    });
  });

  describe('signToken', () => {
    it('Should error if data not matching', async () => {
      data = { password: 'test' };
      payload = { password: 'test123' };
      sinon.stub(bcrypt, 'compare').resolves(false);

      res = {
        status: function (code) {
          assert.equal(code, CODE.FORBIDDEN);
          return this;
        },
        json: function (data) {
          assert.equal(data.message, 'Incorrect credentials!');
        }
      };

      await Crypt.signToken(res, data, payload);
      bcrypt.compare.restore();
    });

    it('Should success signToken', async () => {
      data = { password: 'test123' };
      payload = {
        email: 'test@email.com',
        password: 'test123'
      };

      sinon.stub(bcrypt, 'compare').resolves(true);
      sinon.stub(jwt, 'sign').resolves(true);

      res = {
        status: function () {
          return this;
        },
        json: function () {}
      };

      await Crypt.signToken(res, data, payload);
      bcrypt.compare.restore();
      jwt.sign.restore();
    });
  });
});
