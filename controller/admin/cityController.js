/**
 * cityController.js
 * @description :: exports action methods for city.
 */

const City = require('../../model/city');
const citySchemaKey = require('../../utils/validation/cityValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const models = require('../../model');
const deleteDependentService = require('../../utils/deleteDependent');
const utils = require('../../utils/common');

/**
 * @description : create record of City in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created City. {status, message, data}
 */ 
const addCity = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      citySchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdCity = await dbService.createOne(City,dataToCreate);
    return  res.success({ data :createdCity });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of City in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Citys. {status, message, data}
 */
const bulkInsertCity = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdCity = await dbService.createMany(City,dataToCreate); 
      return  res.success({ data :{ count :createdCity.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of City from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found City(s). {status, message, data}
 */
const findAllCity = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundCity;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      citySchemaKey.findFilterKeys,
      City.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundCity = await dbService.count(City, query);
      if (!foundCity) {
        return res.recordNotFound();
      } 
      foundCity = { totalRecords: foundCity };
      return res.success({ data :foundCity });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundCity = await dbService.paginate( City,query,options);
    if (!foundCity){
      return res.recordNotFound();
    }
    return res.success({ data:foundCity }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of City from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found City. {status, message, data}
 */
const getCity = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundCity = await dbService.findOne(City,{ id :id });
    if (!foundCity){
      return res.recordNotFound();
    }
    return  res.success({ data :foundCity });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of City.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getCityCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      citySchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedCity = await dbService.count(City,where);
    if (!countedCity){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedCity } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of City with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated City.
 * @return {Object} : updated City. {status, message, data}
 */
const updateCity = async (req, res) => {
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
      citySchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedCity = await dbService.update(City,query,dataToUpdate);
    return  res.success({ data :updatedCity }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of City with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Citys.
 * @return {Object} : updated Citys. {status, message, data}
 */
const bulkUpdateCity = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedCity = await dbService.update(City,filter,dataToUpdate);
    if (!updatedCity){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedCity.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of City with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated City.
 * @return {Object} : updated City. {status, message, data}
 */
const partialUpdateCity = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      citySchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedCity = await dbService.update(City, query, dataToUpdate);
    if (!updatedCity) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedCity });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of City from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of City.
 * @return {Object} : deactivated City. {status, message, data}
 */
const softDeleteCity = async (req, res) => {
  try {
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }              
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let updatedCity = await deleteDependentService.softDeleteCity(query, updateBody);
    if (!updatedCity){
      return res.recordNotFound();
    }
    return  res.success({ data :updatedCity });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of City from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted City. {status, message, data}
 */
const deleteCity = async (req, res) => {
  try {
    let dataToDeleted = req.body;
    let query = { id:req.params.id };
    if (dataToDeleted && dataToDeleted.isWarning) {
      let countedCity = await deleteDependentService.countCity(query);
      if (!countedCity){
        return res.recordNotFound();
      }
      return res.success({ data :countedCity });
    }
    let deletedCity = await deleteDependentService.deleteUser(query);
    if (!deletedCity){
      return res.recordNotFound(); 
    }
    return  res.success({ data :deletedCity });    
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }

};

/**
 * @description : delete records of City in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyCity = async (req, res) => {
  try {
    let dataToDelete = req.body;
    let query = {};
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids field is required.' });
    }                              
    query = { id:{ $in:dataToDelete.ids } };
    if (dataToDelete.isWarning){
      let countedCity = await deleteDependentService.countCity(query);
      if (!countedCity) {
        return res.recordNotFound();
      }
      return res.success({ data: countedCity });            
    }
    let deletedCity = await deleteDependentService.deleteCity(query);
    if (!deletedCity) {
      return res.recordNotFound();
    }
    return res.success({ data: deletedCity });          
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of City from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of City.
 * @return {Object} : number of deactivated documents of City. {status, message, data}
 */
const softDeleteManyCity = async (req, res) => {
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
    let updatedCity = await deleteDependentService.softDeleteCity(query, updateBody);
    if (!updatedCity) {
      return res.recordNotFound();
    }
    return  res.success({ data :updatedCity });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addCity,
  bulkInsertCity,
  findAllCity,
  getCity,
  getCityCount,
  updateCity,
  bulkUpdateCity,
  partialUpdateCity,
  softDeleteCity,
  deleteCity,
  deleteManyCity,
  softDeleteManyCity,
};
