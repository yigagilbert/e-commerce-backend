/**
 * addressRoutes.js
 * @description :: CRUD API routes for address
 */

const express = require('express');
const router = express.Router();
const addressController = require('../../../controller/device/v1/addressController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
router.route('/device/api/v1/address/create').post(auth(PLATFORM.DEVICE),addressController.addAddress);
router.route('/device/api/v1/address/list').post(auth(PLATFORM.DEVICE),addressController.findAllAddress);
router.route('/device/api/v1/address/count').post(auth(PLATFORM.DEVICE),addressController.getAddressCount);
router.route('/device/api/v1/address/softDeleteMany').put(auth(PLATFORM.DEVICE),addressController.softDeleteManyAddress);
router.route('/device/api/v1/address/addBulk').post(auth(PLATFORM.DEVICE),addressController.bulkInsertAddress);
router.route('/device/api/v1/address/updateBulk').put(auth(PLATFORM.DEVICE),addressController.bulkUpdateAddress);
router.route('/device/api/v1/address/deleteMany').post(auth(PLATFORM.DEVICE),addressController.deleteManyAddress);
router.route('/device/api/v1/address/softDelete/:id').put(auth(PLATFORM.DEVICE),addressController.softDeleteAddress);
router.route('/device/api/v1/address/partial-update/:id').put(auth(PLATFORM.DEVICE),addressController.partialUpdateAddress);
router.route('/device/api/v1/address/update/:id').put(auth(PLATFORM.DEVICE),addressController.updateAddress);    
router.route('/device/api/v1/address/:id').get(auth(PLATFORM.DEVICE),addressController.getAddress);
router.route('/device/api/v1/address/delete/:id').delete(auth(PLATFORM.DEVICE),addressController.deleteAddress);

module.exports = router;
