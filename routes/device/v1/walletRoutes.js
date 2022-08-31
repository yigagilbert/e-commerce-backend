/**
 * walletRoutes.js
 * @description :: CRUD API routes for wallet
 */

const express = require('express');
const router = express.Router();
const walletController = require('../../../controller/device/v1/walletController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
router.route('/device/api/v1/wallet/create').post(auth(PLATFORM.DEVICE),walletController.addWallet);
router.route('/device/api/v1/wallet/list').post(auth(PLATFORM.DEVICE),walletController.findAllWallet);
router.route('/device/api/v1/wallet/count').post(auth(PLATFORM.DEVICE),walletController.getWalletCount);
router.route('/device/api/v1/wallet/softDeleteMany').put(auth(PLATFORM.DEVICE),walletController.softDeleteManyWallet);
router.route('/device/api/v1/wallet/addBulk').post(auth(PLATFORM.DEVICE),walletController.bulkInsertWallet);
router.route('/device/api/v1/wallet/updateBulk').put(auth(PLATFORM.DEVICE),walletController.bulkUpdateWallet);
router.route('/device/api/v1/wallet/deleteMany').post(auth(PLATFORM.DEVICE),walletController.deleteManyWallet);
router.route('/device/api/v1/wallet/softDelete/:id').put(auth(PLATFORM.DEVICE),walletController.softDeleteWallet);
router.route('/device/api/v1/wallet/partial-update/:id').put(auth(PLATFORM.DEVICE),walletController.partialUpdateWallet);
router.route('/device/api/v1/wallet/update/:id').put(auth(PLATFORM.DEVICE),walletController.updateWallet);    
router.route('/device/api/v1/wallet/:id').get(auth(PLATFORM.DEVICE),walletController.getWallet);
router.route('/device/api/v1/wallet/delete/:id').delete(auth(PLATFORM.DEVICE),walletController.deleteWallet);

module.exports = router;
