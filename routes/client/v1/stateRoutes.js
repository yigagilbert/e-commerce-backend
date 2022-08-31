/**
 * stateRoutes.js
 * @description :: CRUD API routes for state
 */

const express = require('express');
const router = express.Router();
const stateController = require('../../../controller/client/v1/stateController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
router.route('/client/api/v1/state/create').post(auth(PLATFORM.CLIENT),stateController.addState);
router.route('/client/api/v1/state/list').post(auth(PLATFORM.CLIENT),stateController.findAllState);
router.route('/client/api/v1/state/count').post(auth(PLATFORM.CLIENT),stateController.getStateCount);
router.route('/client/api/v1/state/softDeleteMany').put(auth(PLATFORM.CLIENT),stateController.softDeleteManyState);
router.route('/client/api/v1/state/addBulk').post(auth(PLATFORM.CLIENT),stateController.bulkInsertState);
router.route('/client/api/v1/state/updateBulk').put(auth(PLATFORM.CLIENT),stateController.bulkUpdateState);
router.route('/client/api/v1/state/deleteMany').post(auth(PLATFORM.CLIENT),stateController.deleteManyState);
router.route('/client/api/v1/state/softDelete/:id').put(auth(PLATFORM.CLIENT),stateController.softDeleteState);
router.route('/client/api/v1/state/partial-update/:id').put(auth(PLATFORM.CLIENT),stateController.partialUpdateState);
router.route('/client/api/v1/state/update/:id').put(auth(PLATFORM.CLIENT),stateController.updateState);    
router.route('/client/api/v1/state/:id').get(auth(PLATFORM.CLIENT),stateController.getState);
router.route('/client/api/v1/state/delete/:id').delete(auth(PLATFORM.CLIENT),stateController.deleteState);

module.exports = router;
