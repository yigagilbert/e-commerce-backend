/**
 * pincodeRoutes.js
 * @description :: CRUD API routes for pincode
 */

const express = require('express');
const router = express.Router();
const pincodeController = require('../../../controller/client/v1/pincodeController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
router.route('/client/api/v1/pincode/create').post(auth(PLATFORM.CLIENT),pincodeController.addPincode);
router.route('/client/api/v1/pincode/list').post(auth(PLATFORM.CLIENT),pincodeController.findAllPincode);
router.route('/client/api/v1/pincode/count').post(auth(PLATFORM.CLIENT),pincodeController.getPincodeCount);
router.route('/client/api/v1/pincode/softDeleteMany').put(auth(PLATFORM.CLIENT),pincodeController.softDeleteManyPincode);
router.route('/client/api/v1/pincode/addBulk').post(auth(PLATFORM.CLIENT),pincodeController.bulkInsertPincode);
router.route('/client/api/v1/pincode/updateBulk').put(auth(PLATFORM.CLIENT),pincodeController.bulkUpdatePincode);
router.route('/client/api/v1/pincode/deleteMany').post(auth(PLATFORM.CLIENT),pincodeController.deleteManyPincode);
router.route('/client/api/v1/pincode/softDelete/:id').put(auth(PLATFORM.CLIENT),pincodeController.softDeletePincode);
router.route('/client/api/v1/pincode/partial-update/:id').put(auth(PLATFORM.CLIENT),pincodeController.partialUpdatePincode);
router.route('/client/api/v1/pincode/update/:id').put(auth(PLATFORM.CLIENT),pincodeController.updatePincode);    
router.route('/client/api/v1/pincode/:id').get(auth(PLATFORM.CLIENT),pincodeController.getPincode);
router.route('/client/api/v1/pincode/delete/:id').delete(auth(PLATFORM.CLIENT),pincodeController.deletePincode);

module.exports = router;
