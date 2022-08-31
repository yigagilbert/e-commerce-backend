/**
 * pincodeValidation.js
 * @description :: validate each post and put request as per pincode model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of pincode */
exports.schemaKeys = joi.object({
  pincode: joi.string().allow(null).allow(''),
  cityId: joi.number().integer().allow(0),
  stateId: joi.number().integer().allow(0),
  countryId: joi.number().integer().allow(0),
  isActive: joi.boolean(),
  isDeleted: joi.boolean()
}).unknown(true);

/** validation keys and properties of pincode for updation */
exports.updateSchemaKeys = joi.object({
  pincode: joi.string().allow(null).allow(''),
  cityId: joi.number().integer().allow(0),
  stateId: joi.number().integer().allow(0),
  countryId: joi.number().integer().allow(0),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of pincode for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      pincode: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      cityId: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      stateId: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      countryId: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
