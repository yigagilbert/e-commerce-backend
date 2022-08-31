/**
 * walletTransactionRoutes.js
 * @description :: CRUD API routes for walletTransaction
 */

const express = require('express');
const router = express.Router();
const walletTransactionController = require('../../../controller/device/v1/walletTransactionController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
router.route('/device/api/v1/wallettransaction/create').post(auth(PLATFORM.DEVICE),walletTransactionController.addWalletTransaction);
router.route('/device/api/v1/wallettransaction/list').post(auth(PLATFORM.DEVICE),walletTransactionController.findAllWalletTransaction);
router.route('/device/api/v1/wallettransaction/count').post(auth(PLATFORM.DEVICE),walletTransactionController.getWalletTransactionCount);
router.route('/device/api/v1/wallettransaction/softDeleteMany').put(auth(PLATFORM.DEVICE),walletTransactionController.softDeleteManyWalletTransaction);
router.route('/device/api/v1/wallettransaction/addBulk').post(auth(PLATFORM.DEVICE),walletTransactionController.bulkInsertWalletTransaction);
router.route('/device/api/v1/wallettransaction/updateBulk').put(auth(PLATFORM.DEVICE),walletTransactionController.bulkUpdateWalletTransaction);
router.route('/device/api/v1/wallettransaction/deleteMany').post(auth(PLATFORM.DEVICE),walletTransactionController.deleteManyWalletTransaction);
router.route('/device/api/v1/wallettransaction/softDelete/:id').put(auth(PLATFORM.DEVICE),walletTransactionController.softDeleteWalletTransaction);
router.route('/device/api/v1/wallettransaction/partial-update/:id').put(auth(PLATFORM.DEVICE),walletTransactionController.partialUpdateWalletTransaction);
router.route('/device/api/v1/wallettransaction/update/:id').put(auth(PLATFORM.DEVICE),walletTransactionController.updateWalletTransaction);    
router.route('/device/api/v1/wallettransaction/:id').get(auth(PLATFORM.DEVICE),walletTransactionController.getWalletTransaction);
router.route('/device/api/v1/wallettransaction/delete/:id').delete(auth(PLATFORM.DEVICE),walletTransactionController.deleteWalletTransaction);

module.exports = router;
