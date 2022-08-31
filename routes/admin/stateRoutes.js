/**
 * stateRoutes.js
 * @description :: CRUD API routes for state
 */

const express = require('express');
const router = express.Router();
const stateController = require('../../controller/admin/stateController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/state/create').post(auth(PLATFORM.ADMIN),checkRolePermission,stateController.addState);
router.route('/admin/state/list').post(auth(PLATFORM.ADMIN),checkRolePermission,stateController.findAllState);
router.route('/admin/state/count').post(auth(PLATFORM.ADMIN),checkRolePermission,stateController.getStateCount);
router.route('/admin/state/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,stateController.softDeleteManyState);
router.route('/admin/state/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,stateController.bulkInsertState);
router.route('/admin/state/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,stateController.bulkUpdateState);
router.route('/admin/state/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,stateController.deleteManyState);
router.route('/admin/state/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,stateController.softDeleteState);
router.route('/admin/state/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,stateController.partialUpdateState);
router.route('/admin/state/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,stateController.updateState);    
router.route('/admin/state/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,stateController.getState);
router.route('/admin/state/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,stateController.deleteState);

module.exports = router;
