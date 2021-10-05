const sinon = require('sinon');
const assert = require('assert');

const jwtAuth = require('../../../../src/helpers/auth/jwtAuth');
const { CODE } = require('../../../../src/helpers/lib/httpCode');

describe('#jwtAuth.js', () => {
  describe('authenticateJWT', () => {
    let req;
    let res;
    let next = sinon.stub();
    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI
    6Imhhc2lteUBuYXZlci5jb20iLCJpYXQiOjE2MzE2Nzg1MzgsImV4cCI6MTYzMT
    c2NDkzOH0.by1rZAJ4C4UT-FdtK1JKDl7gRFJhIlMGDPWPx0gQ_2g`;

    it('Should return FORBIDDEN if invalid token', async () => {
      req = { headers: { authorization: 'Bearer abcdef' } };
      res = {
        status: function (code) {
          assert.equal(code, CODE.FORBIDDEN);
          return this;
        },
        json: function (data) {
          assert.equal(data.message, 'Invalid token!');
        }
      };

      await jwtAuth.authenticateJWT(req, res, next);
    });

    it('Should return UNAUTHORIZED if token expired or not exist', async () => {
      req = { headers: { authorization: null } };
      res = {
        status: function (code) {
          assert.equal(code, CODE.UNAUTHORIZED);
          return this;
        },
        json: function (data) {
          assert.equal(data.message, 'Token has expired!');
        }
      };

      await jwtAuth.authenticateJWT(req, res, next);
    });

    it('Should return SUCCESS token', async () => {
      req = { headers: { authorization: token } };
      res = {
        status: function () {
          return this;
        },
        json: function () {}
      };

      next = sinon.stub().returns(true);
      await jwtAuth.authenticateJWT(req, res, next);
    });
  });
});
