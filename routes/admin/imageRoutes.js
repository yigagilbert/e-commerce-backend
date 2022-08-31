/**
 * imageRoutes.js
 * @description :: CRUD API routes for image
 */

const express = require('express');
const router = express.Router();
const imageController = require('../../controller/admin/imageController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/image/create').post(auth(PLATFORM.ADMIN),checkRolePermission,imageController.addImage);
router.route('/admin/image/list').post(auth(PLATFORM.ADMIN),checkRolePermission,imageController.findAllImage);
router.route('/admin/image/count').post(auth(PLATFORM.ADMIN),checkRolePermission,imageController.getImageCount);
router.route('/admin/image/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,imageController.softDeleteManyImage);
router.route('/admin/image/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,imageController.bulkInsertImage);
router.route('/admin/image/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,imageController.bulkUpdateImage);
router.route('/admin/image/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,imageController.deleteManyImage);
router.route('/admin/image/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,imageController.softDeleteImage);
router.route('/admin/image/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,imageController.partialUpdateImage);
router.route('/admin/image/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,imageController.updateImage);    
router.route('/admin/image/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,imageController.getImage);
router.route('/admin/image/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,imageController.deleteImage);

module.exports = router;
