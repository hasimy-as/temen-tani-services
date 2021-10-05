const sinon = require('sinon');
const winston = require('winston');

const logger = require('../../../../src/helpers/lib/logger');

describe('#logger.js', () => {
  beforeEach(() => {
    sinon.stub(winston, 'Logger').resolves({
      info: sinon.stub(),
      error: sinon.stub()
    });
  });

  afterEach(() => {
    winston.Logger.restore();
  });

  describe('info', () => {
    it('Should logger.info', () => {
      logger.info('context', 'information');
    });
  });

  describe('error', () => {
    it('Should logger.error', () => {
      logger.error('context', 'error');
    });
  });
});