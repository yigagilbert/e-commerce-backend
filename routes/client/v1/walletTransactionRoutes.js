/**
 * walletTransactionRoutes.js
 * @description :: CRUD API routes for walletTransaction
 */

const express = require('express');
const router = express.Router();
const walletTransactionController = require('../../../controller/client/v1/walletTransactionController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
router.route('/client/api/v1/wallettransaction/create').post(auth(PLATFORM.CLIENT),walletTransactionController.addWalletTransaction);
router.route('/client/api/v1/wallettransaction/list').post(auth(PLATFORM.CLIENT),walletTransactionController.findAllWalletTransaction);
router.route('/client/api/v1/wallettransaction/count').post(auth(PLATFORM.CLIENT),walletTransactionController.getWalletTransactionCount);
router.route('/client/api/v1/wallettransaction/softDeleteMany').put(auth(PLATFORM.CLIENT),walletTransactionController.softDeleteManyWalletTransaction);
router.route('/client/api/v1/wallettransaction/addBulk').post(auth(PLATFORM.CLIENT),walletTransactionController.bulkInsertWalletTransaction);
router.route('/client/api/v1/wallettransaction/updateBulk').put(auth(PLATFORM.CLIENT),walletTransactionController.bulkUpdateWalletTransaction);
router.route('/client/api/v1/wallettransaction/deleteMany').post(auth(PLATFORM.CLIENT),walletTransactionController.deleteManyWalletTransaction);
router.route('/client/api/v1/wallettransaction/softDelete/:id').put(auth(PLATFORM.CLIENT),walletTransactionController.softDeleteWalletTransaction);
router.route('/client/api/v1/wallettransaction/partial-update/:id').put(auth(PLATFORM.CLIENT),walletTransactionController.partialUpdateWalletTransaction);
router.route('/client/api/v1/wallettransaction/update/:id').put(auth(PLATFORM.CLIENT),walletTransactionController.updateWalletTransaction);    
router.route('/client/api/v1/wallettransaction/:id').get(auth(PLATFORM.CLIENT),walletTransactionController.getWalletTransaction);
router.route('/client/api/v1/wallettransaction/delete/:id').delete(auth(PLATFORM.CLIENT),walletTransactionController.deleteWalletTransaction);

module.exports = router;
