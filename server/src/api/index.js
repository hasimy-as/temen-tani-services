const router = require('express').Router();

const basicAuth = require('../helpers/auth/basicAuth');

const UserCommand = require('./modules/users/command/domain');

// Initialize basic authentication.
router.use(basicAuth.init());

/**
 * @modules
 * Users module
 */
router.post('/api/users/login', basicAuth.isAuthenticated, UserCommand.login);
router.post('/api/users/register', basicAuth.isAuthenticated, UserCommand.register);

module.exports = router;
