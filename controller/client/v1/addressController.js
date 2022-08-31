/**
 * addressController.js
 * @description :: exports action methods for address.
 */

const Address = require('../../../model/address');
const addressSchemaKey = require('../../../utils/validation/addressValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Address in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Address. {status, message, data}
 */ 
const addAddress = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      addressSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdAddress = await dbService.createOne(Address,dataToCreate);
    return  res.success({ data :createdAddress });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Address in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Addresss. {status, message, data}
 */
const bulkInsertAddress = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdAddress = await dbService.createMany(Address,dataToCreate); 
      return  res.success({ data :{ count :createdAddress.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Address from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Address(s). {status, message, data}
 */
const findAllAddress = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundAddress;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      addressSchemaKey.findFilterKeys,
      Address.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundAddress = await dbService.count(Address, query);
      if (!foundAddress) {
        return res.recordNotFound();
      } 
      foundAddress = { totalRecords: foundAddress };
      return res.success({ data :foundAddress });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundAddress = await dbService.paginate( Address,query,options);
    if (!foundAddress){
      return res.recordNotFound();
    }
    return res.success({ data:foundAddress }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Address from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Address. {status, message, data}
 */
const getAddress = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundAddress = await dbService.findOne(Address,{ id :id });
    if (!foundAddress){
      return res.recordNotFound();
    }
    return  res.success({ data :foundAddress });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Address.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getAddressCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      addressSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedAddress = await dbService.count(Address,where);
    if (!countedAddress){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedAddress } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Address with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Address.
 * @return {Object} : updated Address. {status, message, data}
 */
const updateAddress = async (req, res) => {
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
      addressSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedAddress = await dbService.update(Address,query,dataToUpdate);
    return  res.success({ data :updatedAddress }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Address with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Addresss.
 * @return {Object} : updated Addresss. {status, message, data}
 */
const bulkUpdateAddress = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedAddress = await dbService.update(Address,filter,dataToUpdate);
    if (!updatedAddress){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedAddress.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Address with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Address.
 * @return {Object} : updated Address. {status, message, data}
 */
const partialUpdateAddress = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      addressSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedAddress = await dbService.update(Address, query, dataToUpdate);
    if (!updatedAddress) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedAddress });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Address from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Address.
 * @return {Object} : deactivated Address. {status, message, data}
 */
const softDeleteAddress = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Address, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Address from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Address. {status, message, data}
 */
const deleteAddress = async (req, res) => {
  const result = await dbService.deleteByPk(Address, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Address in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyAddress = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedAddress = await dbService.destroy(Address,query);
    return res.success({ data :{ count :deletedAddress.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Address from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Address.
 * @return {Object} : number of deactivated documents of Address. {status, message, data}
 */
const softDeleteManyAddress = async (req, res) => {
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
    let updatedAddress = await dbService.update(Address,query,updateBody, options);
    if (!updatedAddress) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedAddress.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addAddress,
  bulkInsertAddress,
  findAllAddress,
  getAddress,
  getAddressCount,
  updateAddress,
  bulkUpdateAddress,
  partialUpdateAddress,
  softDeleteAddress,
  deleteAddress,
  deleteManyAddress,
  softDeleteManyAddress,
};
