/**
 * orderItemController.js
 * @description :: exports action methods for orderItem.
 */

const OrderItem = require('../../model/orderItem');
const orderItemSchemaKey = require('../../utils/validation/orderItemValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const models = require('../../model');
const utils = require('../../utils/common');

/**
 * @description : create record of OrderItem in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created OrderItem. {status, message, data}
 */ 
const addOrderItem = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      orderItemSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdOrderItem = await dbService.createOne(OrderItem,dataToCreate);
    return  res.success({ data :createdOrderItem });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of OrderItem in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created OrderItems. {status, message, data}
 */
const bulkInsertOrderItem = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdOrderItem = await dbService.createMany(OrderItem,dataToCreate); 
      return  res.success({ data :{ count :createdOrderItem.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of OrderItem from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found OrderItem(s). {status, message, data}
 */
const findAllOrderItem = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundOrderItem;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      orderItemSchemaKey.findFilterKeys,
      OrderItem.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundOrderItem = await dbService.count(OrderItem, query);
      if (!foundOrderItem) {
        return res.recordNotFound();
      } 
      foundOrderItem = { totalRecords: foundOrderItem };
      return res.success({ data :foundOrderItem });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundOrderItem = await dbService.paginate( OrderItem,query,options);
    if (!foundOrderItem){
      return res.recordNotFound();
    }
    return res.success({ data:foundOrderItem }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of OrderItem from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found OrderItem. {status, message, data}
 */
const getOrderItem = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundOrderItem = await dbService.findOne(OrderItem,{ id :id });
    if (!foundOrderItem){
      return res.recordNotFound();
    }
    return  res.success({ data :foundOrderItem });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of OrderItem.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getOrderItemCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      orderItemSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedOrderItem = await dbService.count(OrderItem,where);
    if (!countedOrderItem){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedOrderItem } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of OrderItem with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated OrderItem.
 * @return {Object} : updated OrderItem. {status, message, data}
 */
const updateOrderItem = async (req, res) => {
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
      orderItemSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedOrderItem = await dbService.update(OrderItem,query,dataToUpdate);
    return  res.success({ data :updatedOrderItem }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of OrderItem with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated OrderItems.
 * @return {Object} : updated OrderItems. {status, message, data}
 */
const bulkUpdateOrderItem = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedOrderItem = await dbService.update(OrderItem,filter,dataToUpdate);
    if (!updatedOrderItem){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedOrderItem.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of OrderItem with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated OrderItem.
 * @return {Object} : updated OrderItem. {status, message, data}
 */
const partialUpdateOrderItem = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      orderItemSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedOrderItem = await dbService.update(OrderItem, query, dataToUpdate);
    if (!updatedOrderItem) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedOrderItem });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of OrderItem from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of OrderItem.
 * @return {Object} : deactivated OrderItem. {status, message, data}
 */
const softDeleteOrderItem = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(OrderItem, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of OrderItem from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted OrderItem. {status, message, data}
 */
const deleteOrderItem = async (req, res) => {
  const result = await dbService.deleteByPk(OrderItem, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of OrderItem in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyOrderItem = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedOrderItem = await dbService.destroy(OrderItem,query);
    return res.success({ data :{ count :deletedOrderItem.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of OrderItem from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of OrderItem.
 * @return {Object} : number of deactivated documents of OrderItem. {status, message, data}
 */
const softDeleteManyOrderItem = async (req, res) => {
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
    let updatedOrderItem = await dbService.update(OrderItem,query,updateBody, options);
    if (!updatedOrderItem) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedOrderItem.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addOrderItem,
  bulkInsertOrderItem,
  findAllOrderItem,
  getOrderItem,
  getOrderItemCount,
  updateOrderItem,
  bulkUpdateOrderItem,
  partialUpdateOrderItem,
  softDeleteOrderItem,
  deleteOrderItem,
  deleteManyOrderItem,
  softDeleteManyOrderItem,
};
