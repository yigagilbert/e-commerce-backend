/**
 * cartRoutes.js
 * @description :: CRUD API routes for cart
 */

const express = require('express');
const router = express.Router();
const cartController = require('../../../controller/device/v1/cartController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
router.route('/device/api/v1/cart/create').post(auth(PLATFORM.DEVICE),cartController.addCart);
router.route('/device/api/v1/cart/list').post(auth(PLATFORM.DEVICE),cartController.findAllCart);
router.route('/device/api/v1/cart/count').post(auth(PLATFORM.DEVICE),cartController.getCartCount);
router.route('/device/api/v1/cart/softDeleteMany').put(auth(PLATFORM.DEVICE),cartController.softDeleteManyCart);
router.route('/device/api/v1/cart/addBulk').post(auth(PLATFORM.DEVICE),cartController.bulkInsertCart);
router.route('/device/api/v1/cart/updateBulk').put(auth(PLATFORM.DEVICE),cartController.bulkUpdateCart);
router.route('/device/api/v1/cart/deleteMany').post(auth(PLATFORM.DEVICE),cartController.deleteManyCart);
router.route('/device/api/v1/cart/softDelete/:id').put(auth(PLATFORM.DEVICE),cartController.softDeleteCart);
router.route('/device/api/v1/cart/partial-update/:id').put(auth(PLATFORM.DEVICE),cartController.partialUpdateCart);
router.route('/device/api/v1/cart/update/:id').put(auth(PLATFORM.DEVICE),cartController.updateCart);    
router.route('/device/api/v1/cart/:id').get(auth(PLATFORM.DEVICE),cartController.getCart);
router.route('/device/api/v1/cart/delete/:id').delete(auth(PLATFORM.DEVICE),cartController.deleteCart);

module.exports = router;
