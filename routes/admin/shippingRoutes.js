/**
 * shippingRoutes.js
 * @description :: CRUD API routes for shipping
 */

const express = require('express');
const router = express.Router();
const shippingController = require('../../controller/admin/shippingController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/shipping/create').post(auth(PLATFORM.ADMIN),checkRolePermission,shippingController.addShipping);
router.route('/admin/shipping/list').post(auth(PLATFORM.ADMIN),checkRolePermission,shippingController.findAllShipping);
router.route('/admin/shipping/count').post(auth(PLATFORM.ADMIN),checkRolePermission,shippingController.getShippingCount);
router.route('/admin/shipping/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,shippingController.softDeleteManyShipping);
router.route('/admin/shipping/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,shippingController.bulkInsertShipping);
router.route('/admin/shipping/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,shippingController.bulkUpdateShipping);
router.route('/admin/shipping/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,shippingController.deleteManyShipping);
router.route('/admin/shipping/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,shippingController.softDeleteShipping);
router.route('/admin/shipping/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,shippingController.partialUpdateShipping);
router.route('/admin/shipping/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,shippingController.updateShipping);    
router.route('/admin/shipping/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,shippingController.getShipping);
router.route('/admin/shipping/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,shippingController.deleteShipping);

module.exports = router;
