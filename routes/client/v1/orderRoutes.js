/**
 * orderRoutes.js
 * @description :: CRUD API routes for order
 */

const express = require('express');
const router = express.Router();
const orderController = require('../../../controller/client/v1/orderController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
router.route('/client/api/v1/order/create').post(auth(PLATFORM.CLIENT),orderController.addOrder);
router.route('/client/api/v1/order/list').post(auth(PLATFORM.CLIENT),orderController.findAllOrder);
router.route('/client/api/v1/order/count').post(auth(PLATFORM.CLIENT),orderController.getOrderCount);
router.route('/client/api/v1/order/softDeleteMany').put(auth(PLATFORM.CLIENT),orderController.softDeleteManyOrder);
router.route('/client/api/v1/order/addBulk').post(auth(PLATFORM.CLIENT),orderController.bulkInsertOrder);
router.route('/client/api/v1/order/updateBulk').put(auth(PLATFORM.CLIENT),orderController.bulkUpdateOrder);
router.route('/client/api/v1/order/deleteMany').post(auth(PLATFORM.CLIENT),orderController.deleteManyOrder);
router.route('/client/api/v1/order/softDelete/:id').put(auth(PLATFORM.CLIENT),orderController.softDeleteOrder);
router.route('/client/api/v1/order/partial-update/:id').put(auth(PLATFORM.CLIENT),orderController.partialUpdateOrder);
router.route('/client/api/v1/order/update/:id').put(auth(PLATFORM.CLIENT),orderController.updateOrder);    
router.route('/client/api/v1/order/:id').get(auth(PLATFORM.CLIENT),orderController.getOrder);
router.route('/client/api/v1/order/delete/:id').delete(auth(PLATFORM.CLIENT),orderController.deleteOrder);

module.exports = router;
