/**
 * cityRoutes.js
 * @description :: CRUD API routes for city
 */

const express = require('express');
const router = express.Router();
const cityController = require('../../../controller/client/v1/cityController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
router.route('/client/api/v1/city/create').post(auth(PLATFORM.CLIENT),cityController.addCity);
router.route('/client/api/v1/city/list').post(auth(PLATFORM.CLIENT),cityController.findAllCity);
router.route('/client/api/v1/city/count').post(auth(PLATFORM.CLIENT),cityController.getCityCount);
router.route('/client/api/v1/city/softDeleteMany').put(auth(PLATFORM.CLIENT),cityController.softDeleteManyCity);
router.route('/client/api/v1/city/addBulk').post(auth(PLATFORM.CLIENT),cityController.bulkInsertCity);
router.route('/client/api/v1/city/updateBulk').put(auth(PLATFORM.CLIENT),cityController.bulkUpdateCity);
router.route('/client/api/v1/city/deleteMany').post(auth(PLATFORM.CLIENT),cityController.deleteManyCity);
router.route('/client/api/v1/city/softDelete/:id').put(auth(PLATFORM.CLIENT),cityController.softDeleteCity);
router.route('/client/api/v1/city/partial-update/:id').put(auth(PLATFORM.CLIENT),cityController.partialUpdateCity);
router.route('/client/api/v1/city/update/:id').put(auth(PLATFORM.CLIENT),cityController.updateCity);    
router.route('/client/api/v1/city/:id').get(auth(PLATFORM.CLIENT),cityController.getCity);
router.route('/client/api/v1/city/delete/:id').delete(auth(PLATFORM.CLIENT),cityController.deleteCity);

module.exports = router;
