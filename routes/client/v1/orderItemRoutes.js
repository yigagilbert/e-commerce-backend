/**
 * orderItemRoutes.js
 * @description :: CRUD API routes for orderItem
 */

const express = require('express');
const router = express.Router();
const orderItemController = require('../../../controller/client/v1/orderItemController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
router.route('/client/api/v1/orderitem/create').post(auth(PLATFORM.CLIENT),orderItemController.addOrderItem);
router.route('/client/api/v1/orderitem/list').post(auth(PLATFORM.CLIENT),orderItemController.findAllOrderItem);
router.route('/client/api/v1/orderitem/count').post(auth(PLATFORM.CLIENT),orderItemController.getOrderItemCount);
router.route('/client/api/v1/orderitem/softDeleteMany').put(auth(PLATFORM.CLIENT),orderItemController.softDeleteManyOrderItem);
router.route('/client/api/v1/orderitem/addBulk').post(auth(PLATFORM.CLIENT),orderItemController.bulkInsertOrderItem);
router.route('/client/api/v1/orderitem/updateBulk').put(auth(PLATFORM.CLIENT),orderItemController.bulkUpdateOrderItem);
router.route('/client/api/v1/orderitem/deleteMany').post(auth(PLATFORM.CLIENT),orderItemController.deleteManyOrderItem);
router.route('/client/api/v1/orderitem/softDelete/:id').put(auth(PLATFORM.CLIENT),orderItemController.softDeleteOrderItem);
router.route('/client/api/v1/orderitem/partial-update/:id').put(auth(PLATFORM.CLIENT),orderItemController.partialUpdateOrderItem);
router.route('/client/api/v1/orderitem/update/:id').put(auth(PLATFORM.CLIENT),orderItemController.updateOrderItem);    
router.route('/client/api/v1/orderitem/:id').get(auth(PLATFORM.CLIENT),orderItemController.getOrderItem);
router.route('/client/api/v1/orderitem/delete/:id').delete(auth(PLATFORM.CLIENT),orderItemController.deleteOrderItem);

module.exports = router;
