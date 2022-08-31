/**
 * userController.js
 * @description :: exports action methods for user.
 */

const User = require('../../model/user');
const userSchemaKey = require('../../utils/validation/userValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const auth = require('../../services/auth');
const models = require('../../model');
const deleteDependentService = require('../../utils/deleteDependent');
const utils = require('../../utils/common');

/**
 * @description : create record of User in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created User. {status, message, data}
 */ 
const addUser = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      userSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdUser = await dbService.createOne(User,dataToCreate);
    return  res.success({ data :createdUser });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of User in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Users. {status, message, data}
 */
const bulkInsertUser = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdUser = await dbService.createMany(User,dataToCreate); 
      return  res.success({ data :{ count :createdUser.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of User from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found User(s). {status, message, data}
 */
const findAllUser = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundUser;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      userSchemaKey.findFilterKeys,
      User.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    query.id = { $ne: req.user.id };
    if (dataToFind && dataToFind.isCountOnly){
      foundUser = await dbService.count(User, query);
      if (!foundUser) {
        return res.recordNotFound();
      } 
      foundUser = { totalRecords: foundUser };
      return res.success({ data :foundUser });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundUser = await dbService.paginate( User,query,options);
    if (!foundUser){
      return res.recordNotFound();
    }
    return res.success({ data:foundUser }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of User from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found User. {status, message, data}
 */
const getUser = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundUser = await dbService.findOne(User,{ id :id });
    if (!foundUser){
      return res.recordNotFound();
    }
    return  res.success({ data :foundUser });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of User.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getUserCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      userSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedUser = await dbService.count(User,where);
    if (!countedUser){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedUser } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of User with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated User.
 * @return {Object} : updated User. {status, message, data}
 */
const updateUser = async (req, res) => {
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
      userSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = {
      'id': {
        $eq: req.params.id,
        $ne: req.user.id
      }
    };
    let updatedUser = await dbService.update(User,query,dataToUpdate);
    return  res.success({ data :updatedUser }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of User with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Users.
 * @return {Object} : updated Users. {status, message, data}
 */
const bulkUpdateUser = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedUser = await dbService.update(User,filter,dataToUpdate);
    if (!updatedUser){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedUser.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of User with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated User.
 * @return {Object} : updated User. {status, message, data}
 */
const partialUpdateUser = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      userSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    let query = {};
    query = {
      'id': {
        $eq: req.params.id,
        $ne: req.user.id
      }
    };
    let updatedUser = await dbService.update(User, query, dataToUpdate);
    if (!updatedUser) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedUser });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of User from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of User.
 * @return {Object} : deactivated User. {status, message, data}
 */
const softDeleteUser = async (req, res) => {
  try {
    let query = {};
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }          
    query = {
      'id': {
        $eq: req.params.id,
        $ne: req.user.id
      }
    };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let updatedUser = await deleteDependentService.softDeleteUser(query, updateBody);
    if (!updatedUser){
      return res.recordNotFound();
    }
    return  res.success({ data :updatedUser });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of User from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted User. {status, message, data}
 */
const deleteUser = async (req, res) => {
  try {
    let dataToDeleted = req.body;
    let query = { id: req.params.id };
    query.id.$ne = req.user.id;

    if (dataToDeleted && dataToDeleted.isWarning) {
      let countedUser = await deleteDependentService.countUser(query);
      if (!countedUser){
        return res.recordNotFound();
      }
      return res.success({ data :countedUser });
    }
    let deletedUser = await deleteDependentService.deleteUser(query);
    if (!deletedUser){
      return res.recordNotFound(); 
    }
    return  res.success({ data :deletedUser });    
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }

};

/**
 * @description : delete records of User in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyUser = async (req, res) => {
  try {
    let dataToDelete = req.body;
    let query = {};
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids field is required.' });
    }                          
    query = {
      'id': {
        $in: dataToDelete.ids,
        $ne: req.user.id
      }
    };
    if (dataToDelete.isWarning){
      let countedUser = await deleteDependentService.countUser(query);
      if (!countedUser) {
        return res.recordNotFound();
      }
      return res.success({ data: countedUser });            
    }
    let deletedUser = await deleteDependentService.deleteUser(query);
    if (!deletedUser) {
      return res.recordNotFound();
    }
    return res.success({ data: deletedUser });          
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of User from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of User.
 * @return {Object} : number of deactivated documents of User. {status, message, data}
 */
const softDeleteManyUser = async (req, res) => {
  try {
    let dataToUpdate = req.body;
    let query = {};
    query = {
      'id': {
        $in: dataToUpdate.ids,
        $ne: req.user.id
      }
    };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let updatedUser = await deleteDependentService.softDeleteUser(query, updateBody);
    if (!updatedUser) {
      return res.recordNotFound();
    }
    return  res.success({ data :updatedUser });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : change password
 * @param {Object} req : request including user credentials.
 * @param {Object} res : response contains updated user record.
 * @return {Object} : updated user record {status, message, data}
 */
const changePassword = async (req, res) => {
  try {
    let params = req.body;
    if (!params.newPassword || !params.oldPassword) {
      return res.validationError();
    }
    let result = await auth.changePassword({
      ...params,
      userId:req.user.id
    });
    if (result.flag){
      return res.failure({ message :result.data });
    }
    return res.success({ message :result.data });
  } catch (error) {
    return res.internalServerError({ data:error.message }); 
  }
};
/**
 * @description : update user profile.
 * @param {Object} req : request including user profile details to update in request body.
 * @param {Object} res : updated user record.
 * @return {Object} : updated user record. {status, message, data}
 */
const updateProfile = async (req, res) => {
  try {
    const data = {
      ...req.body,
      id:req.user.id
    };
    let validateRequest = validation.validateParamsWithJoi(
      data,
      userSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    if (data.password) delete data.password;
    if (data.createdAt) delete data.createdAt;
    if (data.updatedAt) delete data.updatedAt;
    if (data.id) delete data.id;
    let result = await dbService.update(User, { id :req.user.id } ,data);
    if (!result){
      return res.recordNotFound();
    }            
    return  res.success({ data :result });
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : get information of logged-in User.
 * @param {Object} req : authentication token is required
 * @param {Object} res : Logged-in user information
 * @return {Object} : Logged-in user information {status, message, data}
 */
const getLoggedInUserInfo = async (req, res) => {
  try {
    const query = {
      id: req.user.id,
      isDeleted: false
    };
    query.isActive = true;
    let result = await dbService.findOne(User,query);
    if (!result) {
      return res.recordNotFound();
    }
    return res.success({ data: result });
  } catch (error){
    return res.internalServerError({ data: error.message });
  }
};

module.exports = {
  addUser,
  bulkInsertUser,
  findAllUser,
  getUser,
  getUserCount,
  updateUser,
  bulkUpdateUser,
  partialUpdateUser,
  softDeleteUser,
  deleteUser,
  deleteManyUser,
  softDeleteManyUser,
  changePassword,
  updateProfile,
  getLoggedInUserInfo,
};
