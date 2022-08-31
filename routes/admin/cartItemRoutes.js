/**
 * cartItemRoutes.js
 * @description :: CRUD API routes for cartItem
 */

const express = require('express');
const router = express.Router();
const cartItemController = require('../../controller/admin/cartItemController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/cartitem/create').post(auth(PLATFORM.ADMIN),checkRolePermission,cartItemController.addCartItem);
router.route('/admin/cartitem/list').post(auth(PLATFORM.ADMIN),checkRolePermission,cartItemController.findAllCartItem);
router.route('/admin/cartitem/count').post(auth(PLATFORM.ADMIN),checkRolePermission,cartItemController.getCartItemCount);
router.route('/admin/cartitem/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,cartItemController.softDeleteManyCartItem);
router.route('/admin/cartitem/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,cartItemController.bulkInsertCartItem);
router.route('/admin/cartitem/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,cartItemController.bulkUpdateCartItem);
router.route('/admin/cartitem/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,cartItemController.deleteManyCartItem);
router.route('/admin/cartitem/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,cartItemController.softDeleteCartItem);
router.route('/admin/cartitem/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,cartItemController.partialUpdateCartItem);
router.route('/admin/cartitem/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,cartItemController.updateCartItem);    
router.route('/admin/cartitem/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,cartItemController.getCartItem);
router.route('/admin/cartitem/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,cartItemController.deleteCartItem);

module.exports = router;
