/**
 * imageRoutes.js
 * @description :: CRUD API routes for image
 */

const express = require('express');
const router = express.Router();
const imageController = require('../../../controller/client/v1/imageController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
router.route('/client/api/v1/image/create').post(auth(PLATFORM.CLIENT),imageController.addImage);
router.route('/client/api/v1/image/list').post(auth(PLATFORM.CLIENT),imageController.findAllImage);
router.route('/client/api/v1/image/count').post(auth(PLATFORM.CLIENT),imageController.getImageCount);
router.route('/client/api/v1/image/softDeleteMany').put(auth(PLATFORM.CLIENT),imageController.softDeleteManyImage);
router.route('/client/api/v1/image/addBulk').post(auth(PLATFORM.CLIENT),imageController.bulkInsertImage);
router.route('/client/api/v1/image/updateBulk').put(auth(PLATFORM.CLIENT),imageController.bulkUpdateImage);
router.route('/client/api/v1/image/deleteMany').post(auth(PLATFORM.CLIENT),imageController.deleteManyImage);
router.route('/client/api/v1/image/softDelete/:id').put(auth(PLATFORM.CLIENT),imageController.softDeleteImage);
router.route('/client/api/v1/image/partial-update/:id').put(auth(PLATFORM.CLIENT),imageController.partialUpdateImage);
router.route('/client/api/v1/image/update/:id').put(auth(PLATFORM.CLIENT),imageController.updateImage);    
router.route('/client/api/v1/image/:id').get(auth(PLATFORM.CLIENT),imageController.getImage);
router.route('/client/api/v1/image/delete/:id').delete(auth(PLATFORM.CLIENT),imageController.deleteImage);

module.exports = router;
