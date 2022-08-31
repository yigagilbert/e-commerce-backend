/**
 * bannerRoutes.js
 * @description :: CRUD API routes for banner
 */

const express = require('express');
const router = express.Router();
const bannerController = require('../../../controller/device/v1/bannerController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
router.route('/device/api/v1/banner/create').post(auth(PLATFORM.DEVICE),bannerController.addBanner);
router.route('/device/api/v1/banner/list').post(auth(PLATFORM.DEVICE),bannerController.findAllBanner);
router.route('/device/api/v1/banner/count').post(auth(PLATFORM.DEVICE),bannerController.getBannerCount);
router.route('/device/api/v1/banner/softDeleteMany').put(auth(PLATFORM.DEVICE),bannerController.softDeleteManyBanner);
router.route('/device/api/v1/banner/addBulk').post(auth(PLATFORM.DEVICE),bannerController.bulkInsertBanner);
router.route('/device/api/v1/banner/updateBulk').put(auth(PLATFORM.DEVICE),bannerController.bulkUpdateBanner);
router.route('/device/api/v1/banner/deleteMany').post(auth(PLATFORM.DEVICE),bannerController.deleteManyBanner);
router.route('/device/api/v1/banner/softDelete/:id').put(auth(PLATFORM.DEVICE),bannerController.softDeleteBanner);
router.route('/device/api/v1/banner/partial-update/:id').put(auth(PLATFORM.DEVICE),bannerController.partialUpdateBanner);
router.route('/device/api/v1/banner/update/:id').put(auth(PLATFORM.DEVICE),bannerController.updateBanner);    
router.route('/device/api/v1/banner/:id').get(auth(PLATFORM.DEVICE),bannerController.getBanner);
router.route('/device/api/v1/banner/delete/:id').delete(auth(PLATFORM.DEVICE),bannerController.deleteBanner);

module.exports = router;
