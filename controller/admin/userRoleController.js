/**
 * userRoleController.js
 * @description :: exports action methods for userRole.
 */

const UserRole = require('../../model/userRole');
const userRoleSchemaKey = require('../../utils/validation/userRoleValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const models = require('../../model');
const utils = require('../../utils/common');

/**
 * @description : create record of UserRole in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created UserRole. {status, message, data}
 */ 
const addUserRole = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      userRoleSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdUserRole = await dbService.createOne(UserRole,dataToCreate);
    return  res.success({ data :createdUserRole });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of UserRole in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created UserRoles. {status, message, data}
 */
const bulkInsertUserRole = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdUserRole = await dbService.createMany(UserRole,dataToCreate); 
      return  res.success({ data :{ count :createdUserRole.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of UserRole from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found UserRole(s). {status, message, data}
 */
const findAllUserRole = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundUserRole;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      userRoleSchemaKey.findFilterKeys,
      UserRole.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundUserRole = await dbService.count(UserRole, query);
      if (!foundUserRole) {
        return res.recordNotFound();
      } 
      foundUserRole = { totalRecords: foundUserRole };
      return res.success({ data :foundUserRole });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundUserRole = await dbService.paginate( UserRole,query,options);
    if (!foundUserRole){
      return res.recordNotFound();
    }
    return res.success({ data:foundUserRole }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of UserRole from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found UserRole. {status, message, data}
 */
const getUserRole = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundUserRole = await dbService.findOne(UserRole,{ id :id });
    if (!foundUserRole){
      return res.recordNotFound();
    }
    return  res.success({ data :foundUserRole });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of UserRole.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getUserRoleCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      userRoleSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedUserRole = await dbService.count(UserRole,where);
    if (!countedUserRole){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedUserRole } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of UserRole with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated UserRole.
 * @return {Object} : updated UserRole. {status, message, data}
 */
const updateUserRole = async (req, res) => {
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
      userRoleSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedUserRole = await dbService.update(UserRole,query,dataToUpdate);
    return  res.success({ data :updatedUserRole }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of UserRole with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated UserRoles.
 * @return {Object} : updated UserRoles. {status, message, data}
 */
const bulkUpdateUserRole = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedUserRole = await dbService.update(UserRole,filter,dataToUpdate);
    if (!updatedUserRole){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedUserRole.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of UserRole with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated UserRole.
 * @return {Object} : updated UserRole. {status, message, data}
 */
const partialUpdateUserRole = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      userRoleSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedUserRole = await dbService.update(UserRole, query, dataToUpdate);
    if (!updatedUserRole) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedUserRole });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of UserRole from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of UserRole.
 * @return {Object} : deactivated UserRole. {status, message, data}
 */
const softDeleteUserRole = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(UserRole, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of UserRole from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted UserRole. {status, message, data}
 */
const deleteUserRole = async (req, res) => {
  const result = await dbService.deleteByPk(UserRole, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of UserRole in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyUserRole = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedUserRole = await dbService.destroy(UserRole,query);
    return res.success({ data :{ count :deletedUserRole.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of UserRole from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of UserRole.
 * @return {Object} : number of deactivated documents of UserRole. {status, message, data}
 */
const softDeleteManyUserRole = async (req, res) => {
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
    let updatedUserRole = await dbService.update(UserRole,query,updateBody, options);
    if (!updatedUserRole) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedUserRole.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addUserRole,
  bulkInsertUserRole,
  findAllUserRole,
  getUserRole,
  getUserRoleCount,
  updateUserRole,
  bulkUpdateUserRole,
  partialUpdateUserRole,
  softDeleteUserRole,
  deleteUserRole,
  deleteManyUserRole,
  softDeleteManyUserRole,
};
