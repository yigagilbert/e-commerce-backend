/**
 * cartRoutes.js
 * @description :: CRUD API routes for cart
 */

const express = require('express');
const router = express.Router();
const cartController = require('../../../controller/client/v1/cartController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
router.route('/client/api/v1/cart/create').post(auth(PLATFORM.CLIENT),cartController.addCart);
router.route('/client/api/v1/cart/list').post(auth(PLATFORM.CLIENT),cartController.findAllCart);
router.route('/client/api/v1/cart/count').post(auth(PLATFORM.CLIENT),cartController.getCartCount);
router.route('/client/api/v1/cart/softDeleteMany').put(auth(PLATFORM.CLIENT),cartController.softDeleteManyCart);
router.route('/client/api/v1/cart/addBulk').post(auth(PLATFORM.CLIENT),cartController.bulkInsertCart);
router.route('/client/api/v1/cart/updateBulk').put(auth(PLATFORM.CLIENT),cartController.bulkUpdateCart);
router.route('/client/api/v1/cart/deleteMany').post(auth(PLATFORM.CLIENT),cartController.deleteManyCart);
router.route('/client/api/v1/cart/softDelete/:id').put(auth(PLATFORM.CLIENT),cartController.softDeleteCart);
router.route('/client/api/v1/cart/partial-update/:id').put(auth(PLATFORM.CLIENT),cartController.partialUpdateCart);
router.route('/client/api/v1/cart/update/:id').put(auth(PLATFORM.CLIENT),cartController.updateCart);    
router.route('/client/api/v1/cart/:id').get(auth(PLATFORM.CLIENT),cartController.getCart);
router.route('/client/api/v1/cart/delete/:id').delete(auth(PLATFORM.CLIENT),cartController.deleteCart);

module.exports = router;
