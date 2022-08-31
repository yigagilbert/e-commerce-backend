/**
 * countryRoutes.js
 * @description :: CRUD API routes for country
 */

const express = require('express');
const router = express.Router();
const countryController = require('../../controller/admin/countryController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/country/create').post(auth(PLATFORM.ADMIN),checkRolePermission,countryController.addCountry);
router.route('/admin/country/list').post(auth(PLATFORM.ADMIN),checkRolePermission,countryController.findAllCountry);
router.route('/admin/country/count').post(auth(PLATFORM.ADMIN),checkRolePermission,countryController.getCountryCount);
router.route('/admin/country/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,countryController.softDeleteManyCountry);
router.route('/admin/country/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,countryController.bulkInsertCountry);
router.route('/admin/country/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,countryController.bulkUpdateCountry);
router.route('/admin/country/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,countryController.deleteManyCountry);
router.route('/admin/country/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,countryController.softDeleteCountry);
router.route('/admin/country/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,countryController.partialUpdateCountry);
router.route('/admin/country/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,countryController.updateCountry);    
router.route('/admin/country/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,countryController.getCountry);
router.route('/admin/country/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,countryController.deleteCountry);

module.exports = router;
