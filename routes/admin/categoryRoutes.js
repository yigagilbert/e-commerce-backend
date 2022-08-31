/**
 * categoryRoutes.js
 * @description :: CRUD API routes for category
 */

const express = require('express');
const router = express.Router();
const categoryController = require('../../controller/admin/categoryController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/category/create').post(auth(PLATFORM.ADMIN),checkRolePermission,categoryController.addCategory);
router.route('/admin/category/list').post(auth(PLATFORM.ADMIN),checkRolePermission,categoryController.findAllCategory);
router.route('/admin/category/count').post(auth(PLATFORM.ADMIN),checkRolePermission,categoryController.getCategoryCount);
router.route('/admin/category/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,categoryController.softDeleteManyCategory);
router.route('/admin/category/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,categoryController.bulkInsertCategory);
router.route('/admin/category/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,categoryController.bulkUpdateCategory);
router.route('/admin/category/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,categoryController.deleteManyCategory);
router.route('/admin/category/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,categoryController.softDeleteCategory);
router.route('/admin/category/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,categoryController.partialUpdateCategory);
router.route('/admin/category/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,categoryController.updateCategory);    
router.route('/admin/category/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,categoryController.getCategory);
router.route('/admin/category/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,categoryController.deleteCategory);

module.exports = router;
