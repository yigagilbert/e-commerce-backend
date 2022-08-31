/**
 * stateController.js
 * @description :: exports action methods for state.
 */

const State = require('../../../model/state');
const stateSchemaKey = require('../../../utils/validation/stateValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const deleteDependentService = require('../../../utils/deleteDependent');
const utils = require('../../../utils/common');

/**
 * @description : create record of State in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created State. {status, message, data}
 */ 
const addState = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      stateSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdState = await dbService.createOne(State,dataToCreate);
    return  res.success({ data :createdState });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of State in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created States. {status, message, data}
 */
const bulkInsertState = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdState = await dbService.createMany(State,dataToCreate); 
      return  res.success({ data :{ count :createdState.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of State from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found State(s). {status, message, data}
 */
const findAllState = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundState;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      stateSchemaKey.findFilterKeys,
      State.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundState = await dbService.count(State, query);
      if (!foundState) {
        return res.recordNotFound();
      } 
      foundState = { totalRecords: foundState };
      return res.success({ data :foundState });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundState = await dbService.paginate( State,query,options);
    if (!foundState){
      return res.recordNotFound();
    }
    return res.success({ data:foundState }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of State from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found State. {status, message, data}
 */
const getState = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundState = await dbService.findOne(State,{ id :id });
    if (!foundState){
      return res.recordNotFound();
    }
    return  res.success({ data :foundState });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of State.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getStateCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      stateSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedState = await dbService.count(State,where);
    if (!countedState){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedState } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of State with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated State.
 * @return {Object} : updated State. {status, message, data}
 */
const updateState = async (req, res) => {
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
      stateSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedState = await dbService.update(State,query,dataToUpdate);
    return  res.success({ data :updatedState }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of State with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated States.
 * @return {Object} : updated States. {status, message, data}
 */
const bulkUpdateState = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedState = await dbService.update(State,filter,dataToUpdate);
    if (!updatedState){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedState.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of State with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated State.
 * @return {Object} : updated State. {status, message, data}
 */
const partialUpdateState = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      stateSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedState = await dbService.update(State, query, dataToUpdate);
    if (!updatedState) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedState });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of State from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of State.
 * @return {Object} : deactivated State. {status, message, data}
 */
const softDeleteState = async (req, res) => {
  try {
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }              
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let updatedState = await deleteDependentService.softDeleteState(query, updateBody);
    if (!updatedState){
      return res.recordNotFound();
    }
    return  res.success({ data :updatedState });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of State from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted State. {status, message, data}
 */
const deleteState = async (req, res) => {
  try {
    let dataToDeleted = req.body;
    let query = { id:req.params.id };
    if (dataToDeleted && dataToDeleted.isWarning) {
      let countedState = await deleteDependentService.countState(query);
      if (!countedState){
        return res.recordNotFound();
      }
      return res.success({ data :countedState });
    }
    let deletedState = await deleteDependentService.deleteUser(query);
    if (!deletedState){
      return res.recordNotFound(); 
    }
    return  res.success({ data :deletedState });    
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }

};

/**
 * @description : delete records of State in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyState = async (req, res) => {
  try {
    let dataToDelete = req.body;
    let query = {};
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids field is required.' });
    }                              
    query = { id:{ $in:dataToDelete.ids } };
    if (dataToDelete.isWarning){
      let countedState = await deleteDependentService.countState(query);
      if (!countedState) {
        return res.recordNotFound();
      }
      return res.success({ data: countedState });            
    }
    let deletedState = await deleteDependentService.deleteState(query);
    if (!deletedState) {
      return res.recordNotFound();
    }
    return res.success({ data: deletedState });          
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of State from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of State.
 * @return {Object} : number of deactivated documents of State. {status, message, data}
 */
const softDeleteManyState = async (req, res) => {
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
    let updatedState = await deleteDependentService.softDeleteState(query, updateBody);
    if (!updatedState) {
      return res.recordNotFound();
    }
    return  res.success({ data :updatedState });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addState,
  bulkInsertState,
  findAllState,
  getState,
  getStateCount,
  updateState,
  bulkUpdateState,
  partialUpdateState,
  softDeleteState,
  deleteState,
  deleteManyState,
  softDeleteManyState,
};
