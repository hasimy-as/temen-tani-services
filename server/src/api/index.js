const router = require('express').Router();

const jwtAuth = require('../helpers/auth/jwtAuth');
const basicAuth = require('../helpers/auth/basicAuth');

const FarmerCommand = require('./modules/farmer/command/domain');
const WholesaleCommand = require('./modules/wholesale/command/domain');

// Initialize basic authentication.
router.use(basicAuth.init());

/** @module: Farmer module **/
router.post('/api/farmer/login', basicAuth.isAuthenticated, FarmerCommand.login);
router.post('/api/farmer/register', basicAuth.isAuthenticated, FarmerCommand.register);
router.put('/api/farmer/onboard-wholesale/:farmerId', jwtAuth.authenticateJWT, FarmerCommand.onboardWholesale);

/** @module: Wholesale module **/
router.post('/api/wholesale/login', basicAuth.isAuthenticated, WholesaleCommand.login);
router.post('/api/wholesale/register', basicAuth.isAuthenticated, WholesaleCommand.register);


module.exports = router;
