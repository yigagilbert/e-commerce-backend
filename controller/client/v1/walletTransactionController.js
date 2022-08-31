/**
 * walletTransactionController.js
 * @description :: exports action methods for walletTransaction.
 */

const WalletTransaction = require('../../../model/walletTransaction');
const walletTransactionSchemaKey = require('../../../utils/validation/walletTransactionValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of WalletTransaction in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created WalletTransaction. {status, message, data}
 */ 
const addWalletTransaction = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      walletTransactionSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdWalletTransaction = await dbService.createOne(WalletTransaction,dataToCreate);
    return  res.success({ data :createdWalletTransaction });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of WalletTransaction in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created WalletTransactions. {status, message, data}
 */
const bulkInsertWalletTransaction = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdWalletTransaction = await dbService.createMany(WalletTransaction,dataToCreate); 
      return  res.success({ data :{ count :createdWalletTransaction.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of WalletTransaction from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found WalletTransaction(s). {status, message, data}
 */
const findAllWalletTransaction = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundWalletTransaction;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      walletTransactionSchemaKey.findFilterKeys,
      WalletTransaction.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundWalletTransaction = await dbService.count(WalletTransaction, query);
      if (!foundWalletTransaction) {
        return res.recordNotFound();
      } 
      foundWalletTransaction = { totalRecords: foundWalletTransaction };
      return res.success({ data :foundWalletTransaction });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundWalletTransaction = await dbService.paginate( WalletTransaction,query,options);
    if (!foundWalletTransaction){
      return res.recordNotFound();
    }
    return res.success({ data:foundWalletTransaction }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of WalletTransaction from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found WalletTransaction. {status, message, data}
 */
const getWalletTransaction = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundWalletTransaction = await dbService.findOne(WalletTransaction,{ id :id });
    if (!foundWalletTransaction){
      return res.recordNotFound();
    }
    return  res.success({ data :foundWalletTransaction });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of WalletTransaction.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getWalletTransactionCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      walletTransactionSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedWalletTransaction = await dbService.count(WalletTransaction,where);
    if (!countedWalletTransaction){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedWalletTransaction } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of WalletTransaction with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated WalletTransaction.
 * @return {Object} : updated WalletTransaction. {status, message, data}
 */
const updateWalletTransaction = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body || {} };
    let query = {};
    delete dataToUpdate.addedBy;
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }          
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      walletTransactionSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedWalletTransaction = await dbService.update(WalletTransaction,query,dataToUpdate);
    return  res.success({ data :updatedWalletTransaction }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of WalletTransaction with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated WalletTransactions.
 * @return {Object} : updated WalletTransactions. {status, message, data}
 */
const bulkUpdateWalletTransaction = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedWalletTransaction = await dbService.update(WalletTransaction,filter,dataToUpdate);
    if (!updatedWalletTransaction){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedWalletTransaction.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of WalletTransaction with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated WalletTransaction.
 * @return {Object} : updated WalletTransaction. {status, message, data}
 */
const partialUpdateWalletTransaction = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      walletTransactionSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedWalletTransaction = await dbService.update(WalletTransaction, query, dataToUpdate);
    if (!updatedWalletTransaction) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedWalletTransaction });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of WalletTransaction from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of WalletTransaction.
 * @return {Object} : deactivated WalletTransaction. {status, message, data}
 */
const softDeleteWalletTransaction = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(WalletTransaction, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of WalletTransaction from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted WalletTransaction. {status, message, data}
 */
const deleteWalletTransaction = async (req, res) => {
  const result = await dbService.deleteByPk(WalletTransaction, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of WalletTransaction in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyWalletTransaction = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedWalletTransaction = await dbService.destroy(WalletTransaction,query);
    return res.success({ data :{ count :deletedWalletTransaction.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of WalletTransaction from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of WalletTransaction.
 * @return {Object} : number of deactivated documents of WalletTransaction. {status, message, data}
 */
const softDeleteManyWalletTransaction = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids){
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }
    const query = { id:{ $in:ids } };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    const options = {};
    let updatedWalletTransaction = await dbService.update(WalletTransaction,query,updateBody, options);
    if (!updatedWalletTransaction) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedWalletTransaction.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addWalletTransaction,
  bulkInsertWalletTransaction,
  findAllWalletTransaction,
  getWalletTransaction,
  getWalletTransactionCount,
  updateWalletTransaction,
  bulkUpdateWalletTransaction,
  partialUpdateWalletTransaction,
  softDeleteWalletTransaction,
  deleteWalletTransaction,
  deleteManyWalletTransaction,
  softDeleteManyWalletTransaction,
};
