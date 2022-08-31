/**
 * cartController.js
 * @description :: exports action methods for cart.
 */

const Cart = require('../../model/cart');
const cartSchemaKey = require('../../utils/validation/cartValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const models = require('../../model');
const deleteDependentService = require('../../utils/deleteDependent');
const utils = require('../../utils/common');

/**
 * @description : create record of Cart in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Cart. {status, message, data}
 */ 
const addCart = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      cartSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdCart = await dbService.createOne(Cart,dataToCreate);
    return  res.success({ data :createdCart });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Cart in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Carts. {status, message, data}
 */
const bulkInsertCart = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdCart = await dbService.createMany(Cart,dataToCreate); 
      return  res.success({ data :{ count :createdCart.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Cart from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Cart(s). {status, message, data}
 */
const findAllCart = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundCart;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      cartSchemaKey.findFilterKeys,
      Cart.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundCart = await dbService.count(Cart, query);
      if (!foundCart) {
        return res.recordNotFound();
      } 
      foundCart = { totalRecords: foundCart };
      return res.success({ data :foundCart });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundCart = await dbService.paginate( Cart,query,options);
    if (!foundCart){
      return res.recordNotFound();
    }
    return res.success({ data:foundCart }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Cart from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Cart. {status, message, data}
 */
const getCart = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundCart = await dbService.findOne(Cart,{ id :id });
    if (!foundCart){
      return res.recordNotFound();
    }
    return  res.success({ data :foundCart });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Cart.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getCartCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      cartSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedCart = await dbService.count(Cart,where);
    if (!countedCart){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedCart } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Cart with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Cart.
 * @return {Object} : updated Cart. {status, message, data}
 */
const updateCart = async (req, res) => {
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
      cartSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedCart = await dbService.update(Cart,query,dataToUpdate);
    return  res.success({ data :updatedCart }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Cart with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Carts.
 * @return {Object} : updated Carts. {status, message, data}
 */
const bulkUpdateCart = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedCart = await dbService.update(Cart,filter,dataToUpdate);
    if (!updatedCart){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedCart.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Cart with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Cart.
 * @return {Object} : updated Cart. {status, message, data}
 */
const partialUpdateCart = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      cartSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedCart = await dbService.update(Cart, query, dataToUpdate);
    if (!updatedCart) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedCart });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Cart from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Cart.
 * @return {Object} : deactivated Cart. {status, message, data}
 */
const softDeleteCart = async (req, res) => {
  try {
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }              
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let updatedCart = await deleteDependentService.softDeleteCart(query, updateBody);
    if (!updatedCart){
      return res.recordNotFound();
    }
    return  res.success({ data :updatedCart });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Cart from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Cart. {status, message, data}
 */
const deleteCart = async (req, res) => {
  try {
    let dataToDeleted = req.body;
    let query = { id:req.params.id };
    if (dataToDeleted && dataToDeleted.isWarning) {
      let countedCart = await deleteDependentService.countCart(query);
      if (!countedCart){
        return res.recordNotFound();
      }
      return res.success({ data :countedCart });
    }
    let deletedCart = await deleteDependentService.deleteUser(query);
    if (!deletedCart){
      return res.recordNotFound(); 
    }
    return  res.success({ data :deletedCart });    
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }

};

/**
 * @description : delete records of Cart in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyCart = async (req, res) => {
  try {
    let dataToDelete = req.body;
    let query = {};
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids field is required.' });
    }                              
    query = { id:{ $in:dataToDelete.ids } };
    if (dataToDelete.isWarning){
      let countedCart = await deleteDependentService.countCart(query);
      if (!countedCart) {
        return res.recordNotFound();
      }
      return res.success({ data: countedCart });            
    }
    let deletedCart = await deleteDependentService.deleteCart(query);
    if (!deletedCart) {
      return res.recordNotFound();
    }
    return res.success({ data: deletedCart });          
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Cart from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Cart.
 * @return {Object} : number of deactivated documents of Cart. {status, message, data}
 */
const softDeleteManyCart = async (req, res) => {
  try {
    let dataToUpdate = req.body;
    let query = {};
    if (!req.params || !req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }            
    query = { id:{ $in:dataToUpdate.ids } };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let updatedCart = await deleteDependentService.softDeleteCart(query, updateBody);
    if (!updatedCart) {
      return res.recordNotFound();
    }
    return  res.success({ data :updatedCart });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addCart,
  bulkInsertCart,
  findAllCart,
  getCart,
  getCartCount,
  updateCart,
  bulkUpdateCart,
  partialUpdateCart,
  softDeleteCart,
  deleteCart,
  deleteManyCart,
  softDeleteManyCart,
};
