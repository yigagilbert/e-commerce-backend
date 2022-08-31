/**
 * pincodeController.js
 * @description :: exports action methods for pincode.
 */

const Pincode = require('../../model/pincode');
const pincodeSchemaKey = require('../../utils/validation/pincodeValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const models = require('../../model');
const deleteDependentService = require('../../utils/deleteDependent');
const utils = require('../../utils/common');

/**
 * @description : create record of Pincode in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Pincode. {status, message, data}
 */ 
const addPincode = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      pincodeSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdPincode = await dbService.createOne(Pincode,dataToCreate);
    return  res.success({ data :createdPincode });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Pincode in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Pincodes. {status, message, data}
 */
const bulkInsertPincode = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdPincode = await dbService.createMany(Pincode,dataToCreate); 
      return  res.success({ data :{ count :createdPincode.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Pincode from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Pincode(s). {status, message, data}
 */
const findAllPincode = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundPincode;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      pincodeSchemaKey.findFilterKeys,
      Pincode.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundPincode = await dbService.count(Pincode, query);
      if (!foundPincode) {
        return res.recordNotFound();
      } 
      foundPincode = { totalRecords: foundPincode };
      return res.success({ data :foundPincode });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundPincode = await dbService.paginate( Pincode,query,options);
    if (!foundPincode){
      return res.recordNotFound();
    }
    return res.success({ data:foundPincode }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Pincode from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Pincode. {status, message, data}
 */
const getPincode = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundPincode = await dbService.findOne(Pincode,{ id :id });
    if (!foundPincode){
      return res.recordNotFound();
    }
    return  res.success({ data :foundPincode });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Pincode.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getPincodeCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      pincodeSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedPincode = await dbService.count(Pincode,where);
    if (!countedPincode){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedPincode } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Pincode with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Pincode.
 * @return {Object} : updated Pincode. {status, message, data}
 */
const updatePincode = async (req, res) => {
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
      pincodeSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedPincode = await dbService.update(Pincode,query,dataToUpdate);
    return  res.success({ data :updatedPincode }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Pincode with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Pincodes.
 * @return {Object} : updated Pincodes. {status, message, data}
 */
const bulkUpdatePincode = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedPincode = await dbService.update(Pincode,filter,dataToUpdate);
    if (!updatedPincode){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedPincode.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Pincode with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Pincode.
 * @return {Object} : updated Pincode. {status, message, data}
 */
const partialUpdatePincode = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      pincodeSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedPincode = await dbService.update(Pincode, query, dataToUpdate);
    if (!updatedPincode) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedPincode });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Pincode from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Pincode.
 * @return {Object} : deactivated Pincode. {status, message, data}
 */
const softDeletePincode = async (req, res) => {
  try {
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }              
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let updatedPincode = await deleteDependentService.softDeletePincode(query, updateBody);
    if (!updatedPincode){
      return res.recordNotFound();
    }
    return  res.success({ data :updatedPincode });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Pincode from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Pincode. {status, message, data}
 */
const deletePincode = async (req, res) => {
  try {
    let dataToDeleted = req.body;
    let query = { id:req.params.id };
    if (dataToDeleted && dataToDeleted.isWarning) {
      let countedPincode = await deleteDependentService.countPincode(query);
      if (!countedPincode){
        return res.recordNotFound();
      }
      return res.success({ data :countedPincode });
    }
    let deletedPincode = await deleteDependentService.deleteUser(query);
    if (!deletedPincode){
      return res.recordNotFound(); 
    }
    return  res.success({ data :deletedPincode });    
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }

};

/**
 * @description : delete records of Pincode in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyPincode = async (req, res) => {
  try {
    let dataToDelete = req.body;
    let query = {};
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids field is required.' });
    }                              
    query = { id:{ $in:dataToDelete.ids } };
    if (dataToDelete.isWarning){
      let countedPincode = await deleteDependentService.countPincode(query);
      if (!countedPincode) {
        return res.recordNotFound();
      }
      return res.success({ data: countedPincode });            
    }
    let deletedPincode = await deleteDependentService.deletePincode(query);
    if (!deletedPincode) {
      return res.recordNotFound();
    }
    return res.success({ data: deletedPincode });          
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Pincode from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Pincode.
 * @return {Object} : number of deactivated documents of Pincode. {status, message, data}
 */
const softDeleteManyPincode = async (req, res) => {
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
    let updatedPincode = await deleteDependentService.softDeletePincode(query, updateBody);
    if (!updatedPincode) {
      return res.recordNotFound();
    }
    return  res.success({ data :updatedPincode });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addPincode,
  bulkInsertPincode,
  findAllPincode,
  getPincode,
  getPincodeCount,
  updatePincode,
  bulkUpdatePincode,
  partialUpdatePincode,
  softDeletePincode,
  deletePincode,
  deleteManyPincode,
  softDeleteManyPincode,
};
