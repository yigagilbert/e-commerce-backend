/**
 * countryRoutes.js
 * @description :: CRUD API routes for country
 */

const express = require('express');
const router = express.Router();
const countryController = require('../../../controller/device/v1/countryController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
router.route('/device/api/v1/country/create').post(auth(PLATFORM.DEVICE),countryController.addCountry);
router.route('/device/api/v1/country/list').post(auth(PLATFORM.DEVICE),countryController.findAllCountry);
router.route('/device/api/v1/country/count').post(auth(PLATFORM.DEVICE),countryController.getCountryCount);
router.route('/device/api/v1/country/softDeleteMany').put(auth(PLATFORM.DEVICE),countryController.softDeleteManyCountry);
router.route('/device/api/v1/country/addBulk').post(auth(PLATFORM.DEVICE),countryController.bulkInsertCountry);
router.route('/device/api/v1/country/updateBulk').put(auth(PLATFORM.DEVICE),countryController.bulkUpdateCountry);
router.route('/device/api/v1/country/deleteMany').post(auth(PLATFORM.DEVICE),countryController.deleteManyCountry);
router.route('/device/api/v1/country/softDelete/:id').put(auth(PLATFORM.DEVICE),countryController.softDeleteCountry);
router.route('/device/api/v1/country/partial-update/:id').put(auth(PLATFORM.DEVICE),countryController.partialUpdateCountry);
router.route('/device/api/v1/country/update/:id').put(auth(PLATFORM.DEVICE),countryController.updateCountry);    
router.route('/device/api/v1/country/:id').get(auth(PLATFORM.DEVICE),countryController.getCountry);
router.route('/device/api/v1/country/delete/:id').delete(auth(PLATFORM.DEVICE),countryController.deleteCountry);

module.exports = router;
