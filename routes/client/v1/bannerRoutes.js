/**
 * bannerRoutes.js
 * @description :: CRUD API routes for banner
 */

const express = require('express');
const router = express.Router();
const bannerController = require('../../../controller/client/v1/bannerController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
router.route('/client/api/v1/banner/create').post(auth(PLATFORM.CLIENT),bannerController.addBanner);
router.route('/client/api/v1/banner/list').post(auth(PLATFORM.CLIENT),bannerController.findAllBanner);
router.route('/client/api/v1/banner/count').post(auth(PLATFORM.CLIENT),bannerController.getBannerCount);
router.route('/client/api/v1/banner/softDeleteMany').put(auth(PLATFORM.CLIENT),bannerController.softDeleteManyBanner);
router.route('/client/api/v1/banner/addBulk').post(auth(PLATFORM.CLIENT),bannerController.bulkInsertBanner);
router.route('/client/api/v1/banner/updateBulk').put(auth(PLATFORM.CLIENT),bannerController.bulkUpdateBanner);
router.route('/client/api/v1/banner/deleteMany').post(auth(PLATFORM.CLIENT),bannerController.deleteManyBanner);
router.route('/client/api/v1/banner/softDelete/:id').put(auth(PLATFORM.CLIENT),bannerController.softDeleteBanner);
router.route('/client/api/v1/banner/partial-update/:id').put(auth(PLATFORM.CLIENT),bannerController.partialUpdateBanner);
router.route('/client/api/v1/banner/update/:id').put(auth(PLATFORM.CLIENT),bannerController.updateBanner);    
router.route('/client/api/v1/banner/:id').get(auth(PLATFORM.CLIENT),bannerController.getBanner);
router.route('/client/api/v1/banner/delete/:id').delete(auth(PLATFORM.CLIENT),bannerController.deleteBanner);

module.exports = router;
