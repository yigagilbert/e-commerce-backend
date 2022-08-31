/**
 * productRoutes.js
 * @description :: CRUD API routes for product
 */

const express = require('express');
const router = express.Router();
const productController = require('../../../controller/client/v1/productController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
router.route('/client/api/v1/product/create').post(auth(PLATFORM.CLIENT),productController.addProduct);
router.route('/client/api/v1/product/list').post(auth(PLATFORM.CLIENT),productController.findAllProduct);
router.route('/client/api/v1/product/count').post(auth(PLATFORM.CLIENT),productController.getProductCount);
router.route('/client/api/v1/product/softDeleteMany').put(auth(PLATFORM.CLIENT),productController.softDeleteManyProduct);
router.route('/client/api/v1/product/addBulk').post(auth(PLATFORM.CLIENT),productController.bulkInsertProduct);
router.route('/client/api/v1/product/updateBulk').put(auth(PLATFORM.CLIENT),productController.bulkUpdateProduct);
router.route('/client/api/v1/product/deleteMany').post(auth(PLATFORM.CLIENT),productController.deleteManyProduct);
router.route('/client/api/v1/product/softDelete/:id').put(auth(PLATFORM.CLIENT),productController.softDeleteProduct);
router.route('/client/api/v1/product/partial-update/:id').put(auth(PLATFORM.CLIENT),productController.partialUpdateProduct);
router.route('/client/api/v1/product/update/:id').put(auth(PLATFORM.CLIENT),productController.updateProduct);    
router.route('/client/api/v1/product/:id').get(auth(PLATFORM.CLIENT),productController.getProduct);
router.route('/client/api/v1/product/delete/:id').delete(auth(PLATFORM.CLIENT),productController.deleteProduct);

module.exports = router;
