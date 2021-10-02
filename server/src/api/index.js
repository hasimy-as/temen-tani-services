const router = require('express').Router();

const response = require('../helpers/utils/response');

// Uncomment for authentication
// const jwtAuth = require('../helpers/auth/jwtAuth');
// const basicAuth = require('../helpers/auth/basicAuth');

// Initialize basic authentication.
// router.use(basicAuth.init());

/**
 * @modules
 */

router.get('/api', (req, res) => {
  return response.data(res, 'This is the /api endpoint', 'OK');
});

module.exports = router;
