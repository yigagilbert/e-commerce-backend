/**
 * stateRoutes.js
 * @description :: CRUD API routes for state
 */

const express = require('express');
const router = express.Router();
const stateController = require('../../../controller/device/v1/stateController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
router.route('/device/api/v1/state/create').post(auth(PLATFORM.DEVICE),stateController.addState);
router.route('/device/api/v1/state/list').post(auth(PLATFORM.DEVICE),stateController.findAllState);
router.route('/device/api/v1/state/count').post(auth(PLATFORM.DEVICE),stateController.getStateCount);
router.route('/device/api/v1/state/softDeleteMany').put(auth(PLATFORM.DEVICE),stateController.softDeleteManyState);
router.route('/device/api/v1/state/addBulk').post(auth(PLATFORM.DEVICE),stateController.bulkInsertState);
router.route('/device/api/v1/state/updateBulk').put(auth(PLATFORM.DEVICE),stateController.bulkUpdateState);
router.route('/device/api/v1/state/deleteMany').post(auth(PLATFORM.DEVICE),stateController.deleteManyState);
router.route('/device/api/v1/state/softDelete/:id').put(auth(PLATFORM.DEVICE),stateController.softDeleteState);
router.route('/device/api/v1/state/partial-update/:id').put(auth(PLATFORM.DEVICE),stateController.partialUpdateState);
router.route('/device/api/v1/state/update/:id').put(auth(PLATFORM.DEVICE),stateController.updateState);    
router.route('/device/api/v1/state/:id').get(auth(PLATFORM.DEVICE),stateController.getState);
router.route('/device/api/v1/state/delete/:id').delete(auth(PLATFORM.DEVICE),stateController.deleteState);

module.exports = router;
