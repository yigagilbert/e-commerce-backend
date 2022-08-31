/**
 * cityRoutes.js
 * @description :: CRUD API routes for city
 */

const express = require('express');
const router = express.Router();
const cityController = require('../../../controller/device/v1/cityController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
router.route('/device/api/v1/city/create').post(auth(PLATFORM.DEVICE),cityController.addCity);
router.route('/device/api/v1/city/list').post(auth(PLATFORM.DEVICE),cityController.findAllCity);
router.route('/device/api/v1/city/count').post(auth(PLATFORM.DEVICE),cityController.getCityCount);
router.route('/device/api/v1/city/softDeleteMany').put(auth(PLATFORM.DEVICE),cityController.softDeleteManyCity);
router.route('/device/api/v1/city/addBulk').post(auth(PLATFORM.DEVICE),cityController.bulkInsertCity);
router.route('/device/api/v1/city/updateBulk').put(auth(PLATFORM.DEVICE),cityController.bulkUpdateCity);
router.route('/device/api/v1/city/deleteMany').post(auth(PLATFORM.DEVICE),cityController.deleteManyCity);
router.route('/device/api/v1/city/softDelete/:id').put(auth(PLATFORM.DEVICE),cityController.softDeleteCity);
router.route('/device/api/v1/city/partial-update/:id').put(auth(PLATFORM.DEVICE),cityController.partialUpdateCity);
router.route('/device/api/v1/city/update/:id').put(auth(PLATFORM.DEVICE),cityController.updateCity);    
router.route('/device/api/v1/city/:id').get(auth(PLATFORM.DEVICE),cityController.getCity);
router.route('/device/api/v1/city/delete/:id').delete(auth(PLATFORM.DEVICE),cityController.deleteCity);

module.exports = router;
