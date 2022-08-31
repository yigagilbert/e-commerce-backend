/**
 * shippingRoutes.js
 * @description :: CRUD API routes for shipping
 */

const express = require('express');
const router = express.Router();
const shippingController = require('../../../controller/client/v1/shippingController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
router.route('/client/api/v1/shipping/create').post(auth(PLATFORM.CLIENT),shippingController.addShipping);
router.route('/client/api/v1/shipping/list').post(auth(PLATFORM.CLIENT),shippingController.findAllShipping);
router.route('/client/api/v1/shipping/count').post(auth(PLATFORM.CLIENT),shippingController.getShippingCount);
router.route('/client/api/v1/shipping/softDeleteMany').put(auth(PLATFORM.CLIENT),shippingController.softDeleteManyShipping);
router.route('/client/api/v1/shipping/addBulk').post(auth(PLATFORM.CLIENT),shippingController.bulkInsertShipping);
router.route('/client/api/v1/shipping/updateBulk').put(auth(PLATFORM.CLIENT),shippingController.bulkUpdateShipping);
router.route('/client/api/v1/shipping/deleteMany').post(auth(PLATFORM.CLIENT),shippingController.deleteManyShipping);
router.route('/client/api/v1/shipping/softDelete/:id').put(auth(PLATFORM.CLIENT),shippingController.softDeleteShipping);
router.route('/client/api/v1/shipping/partial-update/:id').put(auth(PLATFORM.CLIENT),shippingController.partialUpdateShipping);
router.route('/client/api/v1/shipping/update/:id').put(auth(PLATFORM.CLIENT),shippingController.updateShipping);    
router.route('/client/api/v1/shipping/:id').get(auth(PLATFORM.CLIENT),shippingController.getShipping);
router.route('/client/api/v1/shipping/delete/:id').delete(auth(PLATFORM.CLIENT),shippingController.deleteShipping);

module.exports = router;
