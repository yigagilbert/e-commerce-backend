/**
 * orderItemValidation.js
 * @description :: validate each post and put request as per orderItem model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of orderItem */
exports.schemaKeys = joi.object({
  orderId: joi.number().integer().allow(0),
  productId: joi.number().integer().allow(0),
  price: joi.number().allow(0),
  quantity: joi.number().integer().allow(0),
  amount: joi.number().allow(0),
  isActive: joi.boolean(),
  isDeleted: joi.boolean()
}).unknown(true);

/** validation keys and properties of orderItem for updation */
exports.updateSchemaKeys = joi.object({
  orderId: joi.number().integer().allow(0),
  productId: joi.number().integer().allow(0),
  price: joi.number().allow(0),
  quantity: joi.number().integer().allow(0),
  amount: joi.number().allow(0),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of orderItem for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      orderId: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      productId: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      price: joi.alternatives().try(joi.array().items(),joi.number(),joi.object()),
      quantity: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      amount: joi.alternatives().try(joi.array().items(),joi.number(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
