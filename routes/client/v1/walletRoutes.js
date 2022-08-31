/**
 * walletRoutes.js
 * @description :: CRUD API routes for wallet
 */

const express = require('express');
const router = express.Router();
const walletController = require('../../../controller/client/v1/walletController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
router.route('/client/api/v1/wallet/create').post(auth(PLATFORM.CLIENT),walletController.addWallet);
router.route('/client/api/v1/wallet/list').post(auth(PLATFORM.CLIENT),walletController.findAllWallet);
router.route('/client/api/v1/wallet/count').post(auth(PLATFORM.CLIENT),walletController.getWalletCount);
router.route('/client/api/v1/wallet/softDeleteMany').put(auth(PLATFORM.CLIENT),walletController.softDeleteManyWallet);
router.route('/client/api/v1/wallet/addBulk').post(auth(PLATFORM.CLIENT),walletController.bulkInsertWallet);
router.route('/client/api/v1/wallet/updateBulk').put(auth(PLATFORM.CLIENT),walletController.bulkUpdateWallet);
router.route('/client/api/v1/wallet/deleteMany').post(auth(PLATFORM.CLIENT),walletController.deleteManyWallet);
router.route('/client/api/v1/wallet/softDelete/:id').put(auth(PLATFORM.CLIENT),walletController.softDeleteWallet);
router.route('/client/api/v1/wallet/partial-update/:id').put(auth(PLATFORM.CLIENT),walletController.partialUpdateWallet);
router.route('/client/api/v1/wallet/update/:id').put(auth(PLATFORM.CLIENT),walletController.updateWallet);    
router.route('/client/api/v1/wallet/:id').get(auth(PLATFORM.CLIENT),walletController.getWallet);
router.route('/client/api/v1/wallet/delete/:id').delete(auth(PLATFORM.CLIENT),walletController.deleteWallet);

module.exports = router;
