/**
 * imageController.js
 * @description :: exports action methods for image.
 */

const Image = require('../../../model/image');
const imageSchemaKey = require('../../../utils/validation/imageValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const utils = require('../../../utils/common');

/**
 * @description : create record of Image in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Image. {status, message, data}
 */ 
const addImage = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      imageSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdImage = await dbService.createOne(Image,dataToCreate);
    return  res.success({ data :createdImage });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Image in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Images. {status, message, data}
 */
const bulkInsertImage = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdImage = await dbService.createMany(Image,dataToCreate); 
      return  res.success({ data :{ count :createdImage.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Image from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Image(s). {status, message, data}
 */
const findAllImage = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundImage;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      imageSchemaKey.findFilterKeys,
      Image.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundImage = await dbService.count(Image, query);
      if (!foundImage) {
        return res.recordNotFound();
      } 
      foundImage = { totalRecords: foundImage };
      return res.success({ data :foundImage });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundImage = await dbService.paginate( Image,query,options);
    if (!foundImage){
      return res.recordNotFound();
    }
    return res.success({ data:foundImage }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Image from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Image. {status, message, data}
 */
const getImage = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundImage = await dbService.findOne(Image,{ id :id });
    if (!foundImage){
      return res.recordNotFound();
    }
    return  res.success({ data :foundImage });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Image.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getImageCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      imageSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedImage = await dbService.count(Image,where);
    if (!countedImage){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedImage } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Image with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Image.
 * @return {Object} : updated Image. {status, message, data}
 */
const updateImage = async (req, res) => {
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
      imageSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedImage = await dbService.update(Image,query,dataToUpdate);
    return  res.success({ data :updatedImage }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Image with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Images.
 * @return {Object} : updated Images. {status, message, data}
 */
const bulkUpdateImage = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedImage = await dbService.update(Image,filter,dataToUpdate);
    if (!updatedImage){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedImage.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Image with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Image.
 * @return {Object} : updated Image. {status, message, data}
 */
const partialUpdateImage = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      imageSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedImage = await dbService.update(Image, query, dataToUpdate);
    if (!updatedImage) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedImage });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Image from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Image.
 * @return {Object} : deactivated Image. {status, message, data}
 */
const softDeleteImage = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Image, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Image from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Image. {status, message, data}
 */
const deleteImage = async (req, res) => {
  const result = await dbService.deleteByPk(Image, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Image in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyImage = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedImage = await dbService.destroy(Image,query);
    return res.success({ data :{ count :deletedImage.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Image from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Image.
 * @return {Object} : number of deactivated documents of Image. {status, message, data}
 */
const softDeleteManyImage = async (req, res) => {
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
    let updatedImage = await dbService.update(Image,query,updateBody, options);
    if (!updatedImage) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedImage.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addImage,
  bulkInsertImage,
  findAllImage,
  getImage,
  getImageCount,
  updateImage,
  bulkUpdateImage,
  partialUpdateImage,
  softDeleteImage,
  deleteImage,
  deleteManyImage,
  softDeleteManyImage,
};
