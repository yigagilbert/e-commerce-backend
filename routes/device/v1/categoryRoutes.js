/**
 * categoryRoutes.js
 * @description :: CRUD API routes for category
 */

const express = require('express');
const router = express.Router();
const categoryController = require('../../../controller/device/v1/categoryController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
router.route('/device/api/v1/category/create').post(auth(PLATFORM.DEVICE),categoryController.addCategory);
router.route('/device/api/v1/category/list').post(auth(PLATFORM.DEVICE),categoryController.findAllCategory);
router.route('/device/api/v1/category/count').post(auth(PLATFORM.DEVICE),categoryController.getCategoryCount);
router.route('/device/api/v1/category/softDeleteMany').put(auth(PLATFORM.DEVICE),categoryController.softDeleteManyCategory);
router.route('/device/api/v1/category/addBulk').post(auth(PLATFORM.DEVICE),categoryController.bulkInsertCategory);
router.route('/device/api/v1/category/updateBulk').put(auth(PLATFORM.DEVICE),categoryController.bulkUpdateCategory);
router.route('/device/api/v1/category/deleteMany').post(auth(PLATFORM.DEVICE),categoryController.deleteManyCategory);
router.route('/device/api/v1/category/softDelete/:id').put(auth(PLATFORM.DEVICE),categoryController.softDeleteCategory);
router.route('/device/api/v1/category/partial-update/:id').put(auth(PLATFORM.DEVICE),categoryController.partialUpdateCategory);
router.route('/device/api/v1/category/update/:id').put(auth(PLATFORM.DEVICE),categoryController.updateCategory);    
router.route('/device/api/v1/category/:id').get(auth(PLATFORM.DEVICE),categoryController.getCategory);
router.route('/device/api/v1/category/delete/:id').delete(auth(PLATFORM.DEVICE),categoryController.deleteCategory);

module.exports = router;
