/**
 * walletTransactionRoutes.js
 * @description :: CRUD API routes for walletTransaction
 */

const express = require('express');
const router = express.Router();
const walletTransactionController = require('../../controller/admin/walletTransactionController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/wallettransaction/create').post(auth(PLATFORM.ADMIN),checkRolePermission,walletTransactionController.addWalletTransaction);
router.route('/admin/wallettransaction/list').post(auth(PLATFORM.ADMIN),checkRolePermission,walletTransactionController.findAllWalletTransaction);
router.route('/admin/wallettransaction/count').post(auth(PLATFORM.ADMIN),checkRolePermission,walletTransactionController.getWalletTransactionCount);
router.route('/admin/wallettransaction/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,walletTransactionController.softDeleteManyWalletTransaction);
router.route('/admin/wallettransaction/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,walletTransactionController.bulkInsertWalletTransaction);
router.route('/admin/wallettransaction/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,walletTransactionController.bulkUpdateWalletTransaction);
router.route('/admin/wallettransaction/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,walletTransactionController.deleteManyWalletTransaction);
router.route('/admin/wallettransaction/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,walletTransactionController.softDeleteWalletTransaction);
router.route('/admin/wallettransaction/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,walletTransactionController.partialUpdateWalletTransaction);
router.route('/admin/wallettransaction/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,walletTransactionController.updateWalletTransaction);    
router.route('/admin/wallettransaction/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,walletTransactionController.getWalletTransaction);
router.route('/admin/wallettransaction/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,walletTransactionController.deleteWalletTransaction);

module.exports = router;
