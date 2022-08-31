/**
 * cartRoutes.js
 * @description :: CRUD API routes for cart
 */

const express = require('express');
const router = express.Router();
const cartController = require('../../controller/admin/cartController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/cart/create').post(auth(PLATFORM.ADMIN),checkRolePermission,cartController.addCart);
router.route('/admin/cart/list').post(auth(PLATFORM.ADMIN),checkRolePermission,cartController.findAllCart);
router.route('/admin/cart/count').post(auth(PLATFORM.ADMIN),checkRolePermission,cartController.getCartCount);
router.route('/admin/cart/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,cartController.softDeleteManyCart);
router.route('/admin/cart/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,cartController.bulkInsertCart);
router.route('/admin/cart/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,cartController.bulkUpdateCart);
router.route('/admin/cart/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,cartController.deleteManyCart);
router.route('/admin/cart/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,cartController.softDeleteCart);
router.route('/admin/cart/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,cartController.partialUpdateCart);
router.route('/admin/cart/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,cartController.updateCart);    
router.route('/admin/cart/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,cartController.getCart);
router.route('/admin/cart/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,cartController.deleteCart);

module.exports = router;
