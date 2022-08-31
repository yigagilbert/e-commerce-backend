/**
 * shippingController.js
 * @description :: exports action methods for shipping.
 */

const Shipping = require('../../model/shipping');
const shippingSchemaKey = require('../../utils/validation/shippingValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const models = require('../../model');
const deleteDependentService = require('../../utils/deleteDependent');
const utils = require('../../utils/common');

/**
 * @description : create record of Shipping in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Shipping. {status, message, data}
 */ 
const addShipping = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      shippingSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdShipping = await dbService.createOne(Shipping,dataToCreate);
    return  res.success({ data :createdShipping });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Shipping in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Shippings. {status, message, data}
 */
const bulkInsertShipping = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdShipping = await dbService.createMany(Shipping,dataToCreate); 
      return  res.success({ data :{ count :createdShipping.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Shipping from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Shipping(s). {status, message, data}
 */
const findAllShipping = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundShipping;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      shippingSchemaKey.findFilterKeys,
      Shipping.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundShipping = await dbService.count(Shipping, query);
      if (!foundShipping) {
        return res.recordNotFound();
      } 
      foundShipping = { totalRecords: foundShipping };
      return res.success({ data :foundShipping });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundShipping = await dbService.paginate( Shipping,query,options);
    if (!foundShipping){
      return res.recordNotFound();
    }
    return res.success({ data:foundShipping }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Shipping from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Shipping. {status, message, data}
 */
const getShipping = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundShipping = await dbService.findOne(Shipping,{ id :id });
    if (!foundShipping){
      return res.recordNotFound();
    }
    return  res.success({ data :foundShipping });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Shipping.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getShippingCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      shippingSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedShipping = await dbService.count(Shipping,where);
    if (!countedShipping){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedShipping } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Shipping with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Shipping.
 * @return {Object} : updated Shipping. {status, message, data}
 */
const updateShipping = async (req, res) => {
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
      shippingSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedShipping = await dbService.update(Shipping,query,dataToUpdate);
    return  res.success({ data :updatedShipping }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Shipping with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Shippings.
 * @return {Object} : updated Shippings. {status, message, data}
 */
const bulkUpdateShipping = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedShipping = await dbService.update(Shipping,filter,dataToUpdate);
    if (!updatedShipping){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedShipping.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Shipping with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Shipping.
 * @return {Object} : updated Shipping. {status, message, data}
 */
const partialUpdateShipping = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      shippingSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedShipping = await dbService.update(Shipping, query, dataToUpdate);
    if (!updatedShipping) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedShipping });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Shipping from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Shipping.
 * @return {Object} : deactivated Shipping. {status, message, data}
 */
const softDeleteShipping = async (req, res) => {
  try {
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }              
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let updatedShipping = await deleteDependentService.softDeleteShipping(query, updateBody);
    if (!updatedShipping){
      return res.recordNotFound();
    }
    return  res.success({ data :updatedShipping });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Shipping from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Shipping. {status, message, data}
 */
const deleteShipping = async (req, res) => {
  try {
    let dataToDeleted = req.body;
    let query = { id:req.params.id };
    if (dataToDeleted && dataToDeleted.isWarning) {
      let countedShipping = await deleteDependentService.countShipping(query);
      if (!countedShipping){
        return res.recordNotFound();
      }
      return res.success({ data :countedShipping });
    }
    let deletedShipping = await deleteDependentService.deleteUser(query);
    if (!deletedShipping){
      return res.recordNotFound(); 
    }
    return  res.success({ data :deletedShipping });    
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }

};

/**
 * @description : delete records of Shipping in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyShipping = async (req, res) => {
  try {
    let dataToDelete = req.body;
    let query = {};
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids field is required.' });
    }                              
    query = { id:{ $in:dataToDelete.ids } };
    if (dataToDelete.isWarning){
      let countedShipping = await deleteDependentService.countShipping(query);
      if (!countedShipping) {
        return res.recordNotFound();
      }
      return res.success({ data: countedShipping });            
    }
    let deletedShipping = await deleteDependentService.deleteShipping(query);
    if (!deletedShipping) {
      return res.recordNotFound();
    }
    return res.success({ data: deletedShipping });          
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Shipping from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Shipping.
 * @return {Object} : number of deactivated documents of Shipping. {status, message, data}
 */
const softDeleteManyShipping = async (req, res) => {
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
    let updatedShipping = await deleteDependentService.softDeleteShipping(query, updateBody);
    if (!updatedShipping) {
      return res.recordNotFound();
    }
    return  res.success({ data :updatedShipping });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addShipping,
  bulkInsertShipping,
  findAllShipping,
  getShipping,
  getShippingCount,
  updateShipping,
  bulkUpdateShipping,
  partialUpdateShipping,
  softDeleteShipping,
  deleteShipping,
  deleteManyShipping,
  softDeleteManyShipping,
};
