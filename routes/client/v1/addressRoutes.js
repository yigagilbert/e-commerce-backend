/**
 * addressRoutes.js
 * @description :: CRUD API routes for address
 */

const express = require('express');
const router = express.Router();
const addressController = require('../../../controller/client/v1/addressController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
router.route('/client/api/v1/address/create').post(auth(PLATFORM.CLIENT),addressController.addAddress);
router.route('/client/api/v1/address/list').post(auth(PLATFORM.CLIENT),addressController.findAllAddress);
router.route('/client/api/v1/address/count').post(auth(PLATFORM.CLIENT),addressController.getAddressCount);
router.route('/client/api/v1/address/softDeleteMany').put(auth(PLATFORM.CLIENT),addressController.softDeleteManyAddress);
router.route('/client/api/v1/address/addBulk').post(auth(PLATFORM.CLIENT),addressController.bulkInsertAddress);
router.route('/client/api/v1/address/updateBulk').put(auth(PLATFORM.CLIENT),addressController.bulkUpdateAddress);
router.route('/client/api/v1/address/deleteMany').post(auth(PLATFORM.CLIENT),addressController.deleteManyAddress);
router.route('/client/api/v1/address/softDelete/:id').put(auth(PLATFORM.CLIENT),addressController.softDeleteAddress);
router.route('/client/api/v1/address/partial-update/:id').put(auth(PLATFORM.CLIENT),addressController.partialUpdateAddress);
router.route('/client/api/v1/address/update/:id').put(auth(PLATFORM.CLIENT),addressController.updateAddress);    
router.route('/client/api/v1/address/:id').get(auth(PLATFORM.CLIENT),addressController.getAddress);
router.route('/client/api/v1/address/delete/:id').delete(auth(PLATFORM.CLIENT),addressController.deleteAddress);

module.exports = router;
