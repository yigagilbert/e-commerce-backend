/**
 * productValidation.js
 * @description :: validate each post and put request as per product model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of product */
exports.schemaKeys = joi.object({
  name: joi.string().allow(null).allow(''),
  price: joi.number().allow(0),
  sellerId: joi.number().integer().allow(0),
  brand: joi.string().allow(null).allow(''),
  categoryId: joi.number().integer().allow(0),
  subCategoryId: joi.number().integer().allow(0),
  isActive: joi.boolean(),
  isDeleted: joi.boolean()
}).unknown(true);

/** validation keys and properties of product for updation */
exports.updateSchemaKeys = joi.object({
  name: joi.string().allow(null).allow(''),
  price: joi.number().allow(0),
  sellerId: joi.number().integer().allow(0),
  brand: joi.string().allow(null).allow(''),
  categoryId: joi.number().integer().allow(0),
  subCategoryId: joi.number().integer().allow(0),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of product for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      price: joi.alternatives().try(joi.array().items(),joi.number(),joi.object()),
      sellerId: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      brand: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      categoryId: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      subCategoryId: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
