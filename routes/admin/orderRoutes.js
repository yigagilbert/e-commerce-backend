/**
 * orderRoutes.js
 * @description :: CRUD API routes for order
 */

const express = require('express');
const router = express.Router();
const orderController = require('../../controller/admin/orderController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/order/create').post(auth(PLATFORM.ADMIN),checkRolePermission,orderController.addOrder);
router.route('/admin/order/list').post(auth(PLATFORM.ADMIN),checkRolePermission,orderController.findAllOrder);
router.route('/admin/order/count').post(auth(PLATFORM.ADMIN),checkRolePermission,orderController.getOrderCount);
router.route('/admin/order/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,orderController.softDeleteManyOrder);
router.route('/admin/order/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,orderController.bulkInsertOrder);
router.route('/admin/order/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,orderController.bulkUpdateOrder);
router.route('/admin/order/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,orderController.deleteManyOrder);
router.route('/admin/order/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,orderController.softDeleteOrder);
router.route('/admin/order/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,orderController.partialUpdateOrder);
router.route('/admin/order/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,orderController.updateOrder);    
router.route('/admin/order/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,orderController.getOrder);
router.route('/admin/order/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,orderController.deleteOrder);

module.exports = router;
