/**
 * index route file of admin platform.
 * @description: exports all routes of admin platform.
 */
const express =  require('express');
const router =  express.Router();
router.use('/admin/auth',require('./auth'));
router.use(require('./userRoutes'));
router.use(require('./bannerRoutes'));
router.use(require('./imageRoutes'));
router.use(require('./cartRoutes'));
router.use(require('./cartItemRoutes'));
router.use(require('./categoryRoutes'));
router.use(require('./cityRoutes'));
router.use(require('./stateRoutes'));
router.use(require('./countryRoutes'));
router.use(require('./orderRoutes'));
router.use(require('./orderItemRoutes'));
router.use(require('./pincodeRoutes'));
router.use(require('./productRoutes'));
router.use(require('./shippingRoutes'));
router.use(require('./addressRoutes'));
router.use(require('./walletRoutes'));
router.use(require('./walletTransactionRoutes'));
router.use(require('./roleRoutes'));
router.use(require('./projectRouteRoutes'));
router.use(require('./routeRoleRoutes'));
router.use(require('./userRoleRoutes'));

module.exports = router;
