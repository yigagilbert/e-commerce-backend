/**
 * orderRoutes.js
 * @description :: CRUD API routes for order
 */

const express = require('express');
const router = express.Router();
const orderController = require('../../../controller/device/v1/orderController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
router.route('/device/api/v1/order/create').post(auth(PLATFORM.DEVICE),orderController.addOrder);
router.route('/device/api/v1/order/list').post(auth(PLATFORM.DEVICE),orderController.findAllOrder);
router.route('/device/api/v1/order/count').post(auth(PLATFORM.DEVICE),orderController.getOrderCount);
router.route('/device/api/v1/order/softDeleteMany').put(auth(PLATFORM.DEVICE),orderController.softDeleteManyOrder);
router.route('/device/api/v1/order/addBulk').post(auth(PLATFORM.DEVICE),orderController.bulkInsertOrder);
router.route('/device/api/v1/order/updateBulk').put(auth(PLATFORM.DEVICE),orderController.bulkUpdateOrder);
router.route('/device/api/v1/order/deleteMany').post(auth(PLATFORM.DEVICE),orderController.deleteManyOrder);
router.route('/device/api/v1/order/softDelete/:id').put(auth(PLATFORM.DEVICE),orderController.softDeleteOrder);
router.route('/device/api/v1/order/partial-update/:id').put(auth(PLATFORM.DEVICE),orderController.partialUpdateOrder);
router.route('/device/api/v1/order/update/:id').put(auth(PLATFORM.DEVICE),orderController.updateOrder);    
router.route('/device/api/v1/order/:id').get(auth(PLATFORM.DEVICE),orderController.getOrder);
router.route('/device/api/v1/order/delete/:id').delete(auth(PLATFORM.DEVICE),orderController.deleteOrder);

module.exports = router;
