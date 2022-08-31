/**
 * shippingRoutes.js
 * @description :: CRUD API routes for shipping
 */

const express = require('express');
const router = express.Router();
const shippingController = require('../../../controller/device/v1/shippingController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
router.route('/device/api/v1/shipping/create').post(auth(PLATFORM.DEVICE),shippingController.addShipping);
router.route('/device/api/v1/shipping/list').post(auth(PLATFORM.DEVICE),shippingController.findAllShipping);
router.route('/device/api/v1/shipping/count').post(auth(PLATFORM.DEVICE),shippingController.getShippingCount);
router.route('/device/api/v1/shipping/softDeleteMany').put(auth(PLATFORM.DEVICE),shippingController.softDeleteManyShipping);
router.route('/device/api/v1/shipping/addBulk').post(auth(PLATFORM.DEVICE),shippingController.bulkInsertShipping);
router.route('/device/api/v1/shipping/updateBulk').put(auth(PLATFORM.DEVICE),shippingController.bulkUpdateShipping);
router.route('/device/api/v1/shipping/deleteMany').post(auth(PLATFORM.DEVICE),shippingController.deleteManyShipping);
router.route('/device/api/v1/shipping/softDelete/:id').put(auth(PLATFORM.DEVICE),shippingController.softDeleteShipping);
router.route('/device/api/v1/shipping/partial-update/:id').put(auth(PLATFORM.DEVICE),shippingController.partialUpdateShipping);
router.route('/device/api/v1/shipping/update/:id').put(auth(PLATFORM.DEVICE),shippingController.updateShipping);    
router.route('/device/api/v1/shipping/:id').get(auth(PLATFORM.DEVICE),shippingController.getShipping);
router.route('/device/api/v1/shipping/delete/:id').delete(auth(PLATFORM.DEVICE),shippingController.deleteShipping);

module.exports = router;
