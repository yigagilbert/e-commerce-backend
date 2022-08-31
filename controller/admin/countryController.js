/**
 * countryController.js
 * @description :: exports action methods for country.
 */

const Country = require('../../model/country');
const countrySchemaKey = require('../../utils/validation/countryValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const models = require('../../model');
const deleteDependentService = require('../../utils/deleteDependent');
const utils = require('../../utils/common');

/**
 * @description : create record of Country in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Country. {status, message, data}
 */ 
const addCountry = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      countrySchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdCountry = await dbService.createOne(Country,dataToCreate);
    return  res.success({ data :createdCountry });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Country in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Countrys. {status, message, data}
 */
const bulkInsertCountry = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdCountry = await dbService.createMany(Country,dataToCreate); 
      return  res.success({ data :{ count :createdCountry.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Country from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Country(s). {status, message, data}
 */
const findAllCountry = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundCountry;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      countrySchemaKey.findFilterKeys,
      Country.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundCountry = await dbService.count(Country, query);
      if (!foundCountry) {
        return res.recordNotFound();
      } 
      foundCountry = { totalRecords: foundCountry };
      return res.success({ data :foundCountry });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundCountry = await dbService.paginate( Country,query,options);
    if (!foundCountry){
      return res.recordNotFound();
    }
    return res.success({ data:foundCountry }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Country from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Country. {status, message, data}
 */
const getCountry = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundCountry = await dbService.findOne(Country,{ id :id });
    if (!foundCountry){
      return res.recordNotFound();
    }
    return  res.success({ data :foundCountry });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Country.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getCountryCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      countrySchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedCountry = await dbService.count(Country,where);
    if (!countedCountry){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedCountry } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Country with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Country.
 * @return {Object} : updated Country. {status, message, data}
 */
const updateCountry = async (req, res) => {
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
      countrySchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedCountry = await dbService.update(Country,query,dataToUpdate);
    return  res.success({ data :updatedCountry }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Country with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Countrys.
 * @return {Object} : updated Countrys. {status, message, data}
 */
const bulkUpdateCountry = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedCountry = await dbService.update(Country,filter,dataToUpdate);
    if (!updatedCountry){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedCountry.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Country with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Country.
 * @return {Object} : updated Country. {status, message, data}
 */
const partialUpdateCountry = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      countrySchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedCountry = await dbService.update(Country, query, dataToUpdate);
    if (!updatedCountry) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedCountry });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Country from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Country.
 * @return {Object} : deactivated Country. {status, message, data}
 */
const softDeleteCountry = async (req, res) => {
  try {
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }              
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let updatedCountry = await deleteDependentService.softDeleteCountry(query, updateBody);
    if (!updatedCountry){
      return res.recordNotFound();
    }
    return  res.success({ data :updatedCountry });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Country from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Country. {status, message, data}
 */
const deleteCountry = async (req, res) => {
  try {
    let dataToDeleted = req.body;
    let query = { id:req.params.id };
    if (dataToDeleted && dataToDeleted.isWarning) {
      let countedCountry = await deleteDependentService.countCountry(query);
      if (!countedCountry){
        return res.recordNotFound();
      }
      return res.success({ data :countedCountry });
    }
    let deletedCountry = await deleteDependentService.deleteUser(query);
    if (!deletedCountry){
      return res.recordNotFound(); 
    }
    return  res.success({ data :deletedCountry });    
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }

};

/**
 * @description : delete records of Country in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyCountry = async (req, res) => {
  try {
    let dataToDelete = req.body;
    let query = {};
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids field is required.' });
    }                              
    query = { id:{ $in:dataToDelete.ids } };
    if (dataToDelete.isWarning){
      let countedCountry = await deleteDependentService.countCountry(query);
      if (!countedCountry) {
        return res.recordNotFound();
      }
      return res.success({ data: countedCountry });            
    }
    let deletedCountry = await deleteDependentService.deleteCountry(query);
    if (!deletedCountry) {
      return res.recordNotFound();
    }
    return res.success({ data: deletedCountry });          
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Country from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Country.
 * @return {Object} : number of deactivated documents of Country. {status, message, data}
 */
const softDeleteManyCountry = async (req, res) => {
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
    let updatedCountry = await deleteDependentService.softDeleteCountry(query, updateBody);
    if (!updatedCountry) {
      return res.recordNotFound();
    }
    return  res.success({ data :updatedCountry });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addCountry,
  bulkInsertCountry,
  findAllCountry,
  getCountry,
  getCountryCount,
  updateCountry,
  bulkUpdateCountry,
  partialUpdateCountry,
  softDeleteCountry,
  deleteCountry,
  deleteManyCountry,
  softDeleteManyCountry,
};
