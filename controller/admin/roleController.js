/**
 * roleController.js
 * @description :: exports action methods for role.
 */

const Role = require('../../model/role');
const roleSchemaKey = require('../../utils/validation/roleValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const models = require('../../model');
const deleteDependentService = require('../../utils/deleteDependent');
const utils = require('../../utils/common');

/**
 * @description : create record of Role in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Role. {status, message, data}
 */ 
const addRole = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      roleSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdRole = await dbService.createOne(Role,dataToCreate);
    return  res.success({ data :createdRole });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Role in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Roles. {status, message, data}
 */
const bulkInsertRole = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdRole = await dbService.createMany(Role,dataToCreate); 
      return  res.success({ data :{ count :createdRole.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Role from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Role(s). {status, message, data}
 */
const findAllRole = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundRole;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      roleSchemaKey.findFilterKeys,
      Role.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundRole = await dbService.count(Role, query);
      if (!foundRole) {
        return res.recordNotFound();
      } 
      foundRole = { totalRecords: foundRole };
      return res.success({ data :foundRole });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundRole = await dbService.paginate( Role,query,options);
    if (!foundRole){
      return res.recordNotFound();
    }
    return res.success({ data:foundRole }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Role from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Role. {status, message, data}
 */
const getRole = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundRole = await dbService.findOne(Role,{ id :id });
    if (!foundRole){
      return res.recordNotFound();
    }
    return  res.success({ data :foundRole });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Role.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getRoleCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      roleSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedRole = await dbService.count(Role,where);
    if (!countedRole){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedRole } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Role with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Role.
 * @return {Object} : updated Role. {status, message, data}
 */
const updateRole = async (req, res) => {
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
      roleSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedRole = await dbService.update(Role,query,dataToUpdate);
    return  res.success({ data :updatedRole }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Role with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Roles.
 * @return {Object} : updated Roles. {status, message, data}
 */
const bulkUpdateRole = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedRole = await dbService.update(Role,filter,dataToUpdate);
    if (!updatedRole){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedRole.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Role with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Role.
 * @return {Object} : updated Role. {status, message, data}
 */
const partialUpdateRole = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      roleSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedRole = await dbService.update(Role, query, dataToUpdate);
    if (!updatedRole) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedRole });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Role from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Role.
 * @return {Object} : deactivated Role. {status, message, data}
 */
const softDeleteRole = async (req, res) => {
  try {
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }              
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let updatedRole = await deleteDependentService.softDeleteRole(query, updateBody);
    if (!updatedRole){
      return res.recordNotFound();
    }
    return  res.success({ data :updatedRole });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Role from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Role. {status, message, data}
 */
const deleteRole = async (req, res) => {
  try {
    let dataToDeleted = req.body;
    let query = { id:req.params.id };
    if (dataToDeleted && dataToDeleted.isWarning) {
      let countedRole = await deleteDependentService.countRole(query);
      if (!countedRole){
        return res.recordNotFound();
      }
      return res.success({ data :countedRole });
    }
    let deletedRole = await deleteDependentService.deleteUser(query);
    if (!deletedRole){
      return res.recordNotFound(); 
    }
    return  res.success({ data :deletedRole });    
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }

};

/**
 * @description : delete records of Role in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyRole = async (req, res) => {
  try {
    let dataToDelete = req.body;
    let query = {};
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids field is required.' });
    }                              
    query = { id:{ $in:dataToDelete.ids } };
    if (dataToDelete.isWarning){
      let countedRole = await deleteDependentService.countRole(query);
      if (!countedRole) {
        return res.recordNotFound();
      }
      return res.success({ data: countedRole });            
    }
    let deletedRole = await deleteDependentService.deleteRole(query);
    if (!deletedRole) {
      return res.recordNotFound();
    }
    return res.success({ data: deletedRole });          
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Role from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Role.
 * @return {Object} : number of deactivated documents of Role. {status, message, data}
 */
const softDeleteManyRole = async (req, res) => {
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
    let updatedRole = await deleteDependentService.softDeleteRole(query, updateBody);
    if (!updatedRole) {
      return res.recordNotFound();
    }
    return  res.success({ data :updatedRole });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addRole,
  bulkInsertRole,
  findAllRole,
  getRole,
  getRoleCount,
  updateRole,
  bulkUpdateRole,
  partialUpdateRole,
  softDeleteRole,
  deleteRole,
  deleteManyRole,
  softDeleteManyRole,
};
