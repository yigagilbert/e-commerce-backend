/**
 * productController.js
 * @description :: exports action methods for product.
 */

const Product = require('../../model/product');
const productSchemaKey = require('../../utils/validation/productValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const models = require('../../model');
const deleteDependentService = require('../../utils/deleteDependent');
const utils = require('../../utils/common');

/**
 * @description : create record of Product in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Product. {status, message, data}
 */ 
const addProduct = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      productSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdProduct = await dbService.createOne(Product,dataToCreate);
    return  res.success({ data :createdProduct });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Product in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Products. {status, message, data}
 */
const bulkInsertProduct = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdProduct = await dbService.createMany(Product,dataToCreate); 
      return  res.success({ data :{ count :createdProduct.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Product from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Product(s). {status, message, data}
 */
const findAllProduct = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundProduct;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      productSchemaKey.findFilterKeys,
      Product.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundProduct = await dbService.count(Product, query);
      if (!foundProduct) {
        return res.recordNotFound();
      } 
      foundProduct = { totalRecords: foundProduct };
      return res.success({ data :foundProduct });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundProduct = await dbService.paginate( Product,query,options);
    if (!foundProduct){
      return res.recordNotFound();
    }
    return res.success({ data:foundProduct }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Product from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Product. {status, message, data}
 */
const getProduct = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundProduct = await dbService.findOne(Product,{ id :id });
    if (!foundProduct){
      return res.recordNotFound();
    }
    return  res.success({ data :foundProduct });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Product.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getProductCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      productSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedProduct = await dbService.count(Product,where);
    if (!countedProduct){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedProduct } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Product with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Product.
 * @return {Object} : updated Product. {status, message, data}
 */
const updateProduct = async (req, res) => {
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
      productSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedProduct = await dbService.update(Product,query,dataToUpdate);
    return  res.success({ data :updatedProduct }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Product with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Products.
 * @return {Object} : updated Products. {status, message, data}
 */
const bulkUpdateProduct = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedProduct = await dbService.update(Product,filter,dataToUpdate);
    if (!updatedProduct){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedProduct.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Product with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Product.
 * @return {Object} : updated Product. {status, message, data}
 */
const partialUpdateProduct = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      productSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedProduct = await dbService.update(Product, query, dataToUpdate);
    if (!updatedProduct) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedProduct });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Product from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Product.
 * @return {Object} : deactivated Product. {status, message, data}
 */
const softDeleteProduct = async (req, res) => {
  try {
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }              
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let updatedProduct = await deleteDependentService.softDeleteProduct(query, updateBody);
    if (!updatedProduct){
      return res.recordNotFound();
    }
    return  res.success({ data :updatedProduct });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Product from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Product. {status, message, data}
 */
const deleteProduct = async (req, res) => {
  try {
    let dataToDeleted = req.body;
    let query = { id:req.params.id };
    if (dataToDeleted && dataToDeleted.isWarning) {
      let countedProduct = await deleteDependentService.countProduct(query);
      if (!countedProduct){
        return res.recordNotFound();
      }
      return res.success({ data :countedProduct });
    }
    let deletedProduct = await deleteDependentService.deleteUser(query);
    if (!deletedProduct){
      return res.recordNotFound(); 
    }
    return  res.success({ data :deletedProduct });    
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }

};

/**
 * @description : delete records of Product in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyProduct = async (req, res) => {
  try {
    let dataToDelete = req.body;
    let query = {};
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids field is required.' });
    }                              
    query = { id:{ $in:dataToDelete.ids } };
    if (dataToDelete.isWarning){
      let countedProduct = await deleteDependentService.countProduct(query);
      if (!countedProduct) {
        return res.recordNotFound();
      }
      return res.success({ data: countedProduct });            
    }
    let deletedProduct = await deleteDependentService.deleteProduct(query);
    if (!deletedProduct) {
      return res.recordNotFound();
    }
    return res.success({ data: deletedProduct });          
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Product from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Product.
 * @return {Object} : number of deactivated documents of Product. {status, message, data}
 */
const softDeleteManyProduct = async (req, res) => {
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
    let updatedProduct = await deleteDependentService.softDeleteProduct(query, updateBody);
    if (!updatedProduct) {
      return res.recordNotFound();
    }
    return  res.success({ data :updatedProduct });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addProduct,
  bulkInsertProduct,
  findAllProduct,
  getProduct,
  getProductCount,
  updateProduct,
  bulkUpdateProduct,
  partialUpdateProduct,
  softDeleteProduct,
  deleteProduct,
  deleteManyProduct,
  softDeleteManyProduct,
};
