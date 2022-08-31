/**
 * cartItemRoutes.js
 * @description :: CRUD API routes for cartItem
 */

const express = require('express');
const router = express.Router();
const cartItemController = require('../../../controller/client/v1/cartItemController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
router.route('/client/api/v1/cartitem/create').post(auth(PLATFORM.CLIENT),cartItemController.addCartItem);
router.route('/client/api/v1/cartitem/list').post(auth(PLATFORM.CLIENT),cartItemController.findAllCartItem);
router.route('/client/api/v1/cartitem/count').post(auth(PLATFORM.CLIENT),cartItemController.getCartItemCount);
router.route('/client/api/v1/cartitem/softDeleteMany').put(auth(PLATFORM.CLIENT),cartItemController.softDeleteManyCartItem);
router.route('/client/api/v1/cartitem/addBulk').post(auth(PLATFORM.CLIENT),cartItemController.bulkInsertCartItem);
router.route('/client/api/v1/cartitem/updateBulk').put(auth(PLATFORM.CLIENT),cartItemController.bulkUpdateCartItem);
router.route('/client/api/v1/cartitem/deleteMany').post(auth(PLATFORM.CLIENT),cartItemController.deleteManyCartItem);
router.route('/client/api/v1/cartitem/softDelete/:id').put(auth(PLATFORM.CLIENT),cartItemController.softDeleteCartItem);
router.route('/client/api/v1/cartitem/partial-update/:id').put(auth(PLATFORM.CLIENT),cartItemController.partialUpdateCartItem);
router.route('/client/api/v1/cartitem/update/:id').put(auth(PLATFORM.CLIENT),cartItemController.updateCartItem);    
router.route('/client/api/v1/cartitem/:id').get(auth(PLATFORM.CLIENT),cartItemController.getCartItem);
router.route('/client/api/v1/cartitem/delete/:id').delete(auth(PLATFORM.CLIENT),cartItemController.deleteCartItem);

module.exports = router;
