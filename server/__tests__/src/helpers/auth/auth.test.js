const assert = require('assert');

const auth = require('../../../../src/helpers/auth/auth');

describe('#auth.js', () => {
  describe('findByUsername', () => {
    it('Will error if datas are invalid', async () => {
      await auth.findByUsername('test', (user) => {
        assert.equal(user.username, null);
        assert.equal(user.password, null);
      });
    });

    it('Will return callback', async (done) => {
      await auth.findByUsername('username', () => {
        done();
      });
    });
  });
});
