/**
 * pincodeRoutes.js
 * @description :: CRUD API routes for pincode
 */

const express = require('express');
const router = express.Router();
const pincodeController = require('../../controller/admin/pincodeController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/pincode/create').post(auth(PLATFORM.ADMIN),checkRolePermission,pincodeController.addPincode);
router.route('/admin/pincode/list').post(auth(PLATFORM.ADMIN),checkRolePermission,pincodeController.findAllPincode);
router.route('/admin/pincode/count').post(auth(PLATFORM.ADMIN),checkRolePermission,pincodeController.getPincodeCount);
router.route('/admin/pincode/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,pincodeController.softDeleteManyPincode);
router.route('/admin/pincode/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,pincodeController.bulkInsertPincode);
router.route('/admin/pincode/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,pincodeController.bulkUpdatePincode);
router.route('/admin/pincode/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,pincodeController.deleteManyPincode);
router.route('/admin/pincode/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,pincodeController.softDeletePincode);
router.route('/admin/pincode/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,pincodeController.partialUpdatePincode);
router.route('/admin/pincode/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,pincodeController.updatePincode);    
router.route('/admin/pincode/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,pincodeController.getPincode);
router.route('/admin/pincode/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,pincodeController.deletePincode);

module.exports = router;
