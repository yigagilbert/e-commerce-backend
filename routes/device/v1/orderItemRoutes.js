/**
 * orderItemRoutes.js
 * @description :: CRUD API routes for orderItem
 */

const express = require('express');
const router = express.Router();
const orderItemController = require('../../../controller/device/v1/orderItemController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
router.route('/device/api/v1/orderitem/create').post(auth(PLATFORM.DEVICE),orderItemController.addOrderItem);
router.route('/device/api/v1/orderitem/list').post(auth(PLATFORM.DEVICE),orderItemController.findAllOrderItem);
router.route('/device/api/v1/orderitem/count').post(auth(PLATFORM.DEVICE),orderItemController.getOrderItemCount);
router.route('/device/api/v1/orderitem/softDeleteMany').put(auth(PLATFORM.DEVICE),orderItemController.softDeleteManyOrderItem);
router.route('/device/api/v1/orderitem/addBulk').post(auth(PLATFORM.DEVICE),orderItemController.bulkInsertOrderItem);
router.route('/device/api/v1/orderitem/updateBulk').put(auth(PLATFORM.DEVICE),orderItemController.bulkUpdateOrderItem);
router.route('/device/api/v1/orderitem/deleteMany').post(auth(PLATFORM.DEVICE),orderItemController.deleteManyOrderItem);
router.route('/device/api/v1/orderitem/softDelete/:id').put(auth(PLATFORM.DEVICE),orderItemController.softDeleteOrderItem);
router.route('/device/api/v1/orderitem/partial-update/:id').put(auth(PLATFORM.DEVICE),orderItemController.partialUpdateOrderItem);
router.route('/device/api/v1/orderitem/update/:id').put(auth(PLATFORM.DEVICE),orderItemController.updateOrderItem);    
router.route('/device/api/v1/orderitem/:id').get(auth(PLATFORM.DEVICE),orderItemController.getOrderItem);
router.route('/device/api/v1/orderitem/delete/:id').delete(auth(PLATFORM.DEVICE),orderItemController.deleteOrderItem);

module.exports = router;
