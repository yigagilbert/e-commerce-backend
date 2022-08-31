/**
 * cartItemRoutes.js
 * @description :: CRUD API routes for cartItem
 */

const express = require('express');
const router = express.Router();
const cartItemController = require('../../../controller/device/v1/cartItemController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
router.route('/device/api/v1/cartitem/create').post(auth(PLATFORM.DEVICE),cartItemController.addCartItem);
router.route('/device/api/v1/cartitem/list').post(auth(PLATFORM.DEVICE),cartItemController.findAllCartItem);
router.route('/device/api/v1/cartitem/count').post(auth(PLATFORM.DEVICE),cartItemController.getCartItemCount);
router.route('/device/api/v1/cartitem/softDeleteMany').put(auth(PLATFORM.DEVICE),cartItemController.softDeleteManyCartItem);
router.route('/device/api/v1/cartitem/addBulk').post(auth(PLATFORM.DEVICE),cartItemController.bulkInsertCartItem);
router.route('/device/api/v1/cartitem/updateBulk').put(auth(PLATFORM.DEVICE),cartItemController.bulkUpdateCartItem);
router.route('/device/api/v1/cartitem/deleteMany').post(auth(PLATFORM.DEVICE),cartItemController.deleteManyCartItem);
router.route('/device/api/v1/cartitem/softDelete/:id').put(auth(PLATFORM.DEVICE),cartItemController.softDeleteCartItem);
router.route('/device/api/v1/cartitem/partial-update/:id').put(auth(PLATFORM.DEVICE),cartItemController.partialUpdateCartItem);
router.route('/device/api/v1/cartitem/update/:id').put(auth(PLATFORM.DEVICE),cartItemController.updateCartItem);    
router.route('/device/api/v1/cartitem/:id').get(auth(PLATFORM.DEVICE),cartItemController.getCartItem);
router.route('/device/api/v1/cartitem/delete/:id').delete(auth(PLATFORM.DEVICE),cartItemController.deleteCartItem);

module.exports = router;
