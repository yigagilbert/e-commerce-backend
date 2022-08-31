/**
 * bannerController.js
 * @description :: exports action methods for banner.
 */

const Banner = require('../../model/banner');
const bannerSchemaKey = require('../../utils/validation/bannerValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const models = require('../../model');
const deleteDependentService = require('../../utils/deleteDependent');
const utils = require('../../utils/common');

/**
 * @description : create record of Banner in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Banner. {status, message, data}
 */ 
const addBanner = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      bannerSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdBanner = await dbService.createOne(Banner,dataToCreate);
    return  res.success({ data :createdBanner });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Banner in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Banners. {status, message, data}
 */
const bulkInsertBanner = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdBanner = await dbService.createMany(Banner,dataToCreate); 
      return  res.success({ data :{ count :createdBanner.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Banner from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Banner(s). {status, message, data}
 */
const findAllBanner = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundBanner;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      bannerSchemaKey.findFilterKeys,
      Banner.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundBanner = await dbService.count(Banner, query);
      if (!foundBanner) {
        return res.recordNotFound();
      } 
      foundBanner = { totalRecords: foundBanner };
      return res.success({ data :foundBanner });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundBanner = await dbService.paginate( Banner,query,options);
    if (!foundBanner){
      return res.recordNotFound();
    }
    return res.success({ data:foundBanner }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Banner from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Banner. {status, message, data}
 */
const getBanner = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundBanner = await dbService.findOne(Banner,{ id :id });
    if (!foundBanner){
      return res.recordNotFound();
    }
    return  res.success({ data :foundBanner });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Banner.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getBannerCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      bannerSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedBanner = await dbService.count(Banner,where);
    if (!countedBanner){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedBanner } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Banner with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Banner.
 * @return {Object} : updated Banner. {status, message, data}
 */
const updateBanner = async (req, res) => {
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
      bannerSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedBanner = await dbService.update(Banner,query,dataToUpdate);
    return  res.success({ data :updatedBanner }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Banner with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Banners.
 * @return {Object} : updated Banners. {status, message, data}
 */
const bulkUpdateBanner = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedBanner = await dbService.update(Banner,filter,dataToUpdate);
    if (!updatedBanner){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedBanner.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Banner with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Banner.
 * @return {Object} : updated Banner. {status, message, data}
 */
const partialUpdateBanner = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      bannerSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedBanner = await dbService.update(Banner, query, dataToUpdate);
    if (!updatedBanner) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedBanner });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Banner from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Banner.
 * @return {Object} : deactivated Banner. {status, message, data}
 */
const softDeleteBanner = async (req, res) => {
  try {
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }              
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let updatedBanner = await deleteDependentService.softDeleteBanner(query, updateBody);
    if (!updatedBanner){
      return res.recordNotFound();
    }
    return  res.success({ data :updatedBanner });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Banner from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Banner. {status, message, data}
 */
const deleteBanner = async (req, res) => {
  try {
    let dataToDeleted = req.body;
    let query = { id:req.params.id };
    if (dataToDeleted && dataToDeleted.isWarning) {
      let countedBanner = await deleteDependentService.countBanner(query);
      if (!countedBanner){
        return res.recordNotFound();
      }
      return res.success({ data :countedBanner });
    }
    let deletedBanner = await deleteDependentService.deleteUser(query);
    if (!deletedBanner){
      return res.recordNotFound(); 
    }
    return  res.success({ data :deletedBanner });    
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }

};

/**
 * @description : delete records of Banner in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyBanner = async (req, res) => {
  try {
    let dataToDelete = req.body;
    let query = {};
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids field is required.' });
    }                              
    query = { id:{ $in:dataToDelete.ids } };
    if (dataToDelete.isWarning){
      let countedBanner = await deleteDependentService.countBanner(query);
      if (!countedBanner) {
        return res.recordNotFound();
      }
      return res.success({ data: countedBanner });            
    }
    let deletedBanner = await deleteDependentService.deleteBanner(query);
    if (!deletedBanner) {
      return res.recordNotFound();
    }
    return res.success({ data: deletedBanner });          
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Banner from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Banner.
 * @return {Object} : number of deactivated documents of Banner. {status, message, data}
 */
const softDeleteManyBanner = async (req, res) => {
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
    let updatedBanner = await deleteDependentService.softDeleteBanner(query, updateBody);
    if (!updatedBanner) {
      return res.recordNotFound();
    }
    return  res.success({ data :updatedBanner });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addBanner,
  bulkInsertBanner,
  findAllBanner,
  getBanner,
  getBannerCount,
  updateBanner,
  bulkUpdateBanner,
  partialUpdateBanner,
  softDeleteBanner,
  deleteBanner,
  deleteManyBanner,
  softDeleteManyBanner,
};
