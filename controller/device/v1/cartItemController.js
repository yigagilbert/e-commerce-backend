/**
 * cartItemController.js
 * @description :: exports action methods for cartItem.
 */

const CartItem = require('../../../model/cartItem');
const cartItemSchemaKey = require('../../../utils/validation/cartItemValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of CartItem in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created CartItem. {status, message, data}
 */ 
const addCartItem = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      cartItemSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdCartItem = await dbService.createOne(CartItem,dataToCreate);
    return  res.success({ data :createdCartItem });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of CartItem in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created CartItems. {status, message, data}
 */
const bulkInsertCartItem = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdCartItem = await dbService.createMany(CartItem,dataToCreate); 
      return  res.success({ data :{ count :createdCartItem.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of CartItem from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found CartItem(s). {status, message, data}
 */
const findAllCartItem = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundCartItem;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      cartItemSchemaKey.findFilterKeys,
      CartItem.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundCartItem = await dbService.count(CartItem, query);
      if (!foundCartItem) {
        return res.recordNotFound();
      } 
      foundCartItem = { totalRecords: foundCartItem };
      return res.success({ data :foundCartItem });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundCartItem = await dbService.paginate( CartItem,query,options);
    if (!foundCartItem){
      return res.recordNotFound();
    }
    return res.success({ data:foundCartItem }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of CartItem from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found CartItem. {status, message, data}
 */
const getCartItem = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundCartItem = await dbService.findOne(CartItem,{ id :id });
    if (!foundCartItem){
      return res.recordNotFound();
    }
    return  res.success({ data :foundCartItem });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of CartItem.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getCartItemCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      cartItemSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedCartItem = await dbService.count(CartItem,where);
    if (!countedCartItem){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedCartItem } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of CartItem with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated CartItem.
 * @return {Object} : updated CartItem. {status, message, data}
 */
const updateCartItem = async (req, res) => {
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
      cartItemSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedCartItem = await dbService.update(CartItem,query,dataToUpdate);
    return  res.success({ data :updatedCartItem }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of CartItem with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated CartItems.
 * @return {Object} : updated CartItems. {status, message, data}
 */
const bulkUpdateCartItem = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedCartItem = await dbService.update(CartItem,filter,dataToUpdate);
    if (!updatedCartItem){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedCartItem.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of CartItem with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated CartItem.
 * @return {Object} : updated CartItem. {status, message, data}
 */
const partialUpdateCartItem = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      cartItemSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedCartItem = await dbService.update(CartItem, query, dataToUpdate);
    if (!updatedCartItem) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedCartItem });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of CartItem from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of CartItem.
 * @return {Object} : deactivated CartItem. {status, message, data}
 */
const softDeleteCartItem = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(CartItem, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of CartItem from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted CartItem. {status, message, data}
 */
const deleteCartItem = async (req, res) => {
  const result = await dbService.deleteByPk(CartItem, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of CartItem in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyCartItem = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedCartItem = await dbService.destroy(CartItem,query);
    return res.success({ data :{ count :deletedCartItem.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of CartItem from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of CartItem.
 * @return {Object} : number of deactivated documents of CartItem. {status, message, data}
 */
const softDeleteManyCartItem = async (req, res) => {
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
    let updatedCartItem = await dbService.update(CartItem,query,updateBody, options);
    if (!updatedCartItem) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedCartItem.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addCartItem,
  bulkInsertCartItem,
  findAllCartItem,
  getCartItem,
  getCartItemCount,
  updateCartItem,
  bulkUpdateCartItem,
  partialUpdateCartItem,
  softDeleteCartItem,
  deleteCartItem,
  deleteManyCartItem,
  softDeleteManyCartItem,
};
