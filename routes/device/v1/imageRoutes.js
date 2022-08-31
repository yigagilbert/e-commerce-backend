/**
 * imageRoutes.js
 * @description :: CRUD API routes for image
 */

const express = require('express');
const router = express.Router();
const imageController = require('../../../controller/device/v1/imageController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
router.route('/device/api/v1/image/create').post(auth(PLATFORM.DEVICE),imageController.addImage);
router.route('/device/api/v1/image/list').post(auth(PLATFORM.DEVICE),imageController.findAllImage);
router.route('/device/api/v1/image/count').post(auth(PLATFORM.DEVICE),imageController.getImageCount);
router.route('/device/api/v1/image/softDeleteMany').put(auth(PLATFORM.DEVICE),imageController.softDeleteManyImage);
router.route('/device/api/v1/image/addBulk').post(auth(PLATFORM.DEVICE),imageController.bulkInsertImage);
router.route('/device/api/v1/image/updateBulk').put(auth(PLATFORM.DEVICE),imageController.bulkUpdateImage);
router.route('/device/api/v1/image/deleteMany').post(auth(PLATFORM.DEVICE),imageController.deleteManyImage);
router.route('/device/api/v1/image/softDelete/:id').put(auth(PLATFORM.DEVICE),imageController.softDeleteImage);
router.route('/device/api/v1/image/partial-update/:id').put(auth(PLATFORM.DEVICE),imageController.partialUpdateImage);
router.route('/device/api/v1/image/update/:id').put(auth(PLATFORM.DEVICE),imageController.updateImage);    
router.route('/device/api/v1/image/:id').get(auth(PLATFORM.DEVICE),imageController.getImage);
router.route('/device/api/v1/image/delete/:id').delete(auth(PLATFORM.DEVICE),imageController.deleteImage);

module.exports = router;
