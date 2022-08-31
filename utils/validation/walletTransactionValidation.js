/**
 * walletTransactionValidation.js
 * @description :: validate each post and put request as per walletTransaction model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of walletTransaction */
exports.schemaKeys = joi.object({
  walletId: joi.number().integer().allow(0),
  userId: joi.number().integer().allow(0),
  forOrder: joi.boolean(),
  forWallet: joi.boolean(),
  transactionAmount: joi.number().allow(0),
  isActive: joi.boolean(),
  isDeleted: joi.boolean()
}).unknown(true);

/** validation keys and properties of walletTransaction for updation */
exports.updateSchemaKeys = joi.object({
  walletId: joi.number().integer().allow(0),
  userId: joi.number().integer().allow(0),
  forOrder: joi.boolean(),
  forWallet: joi.boolean(),
  transactionAmount: joi.number().allow(0),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of walletTransaction for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      walletId: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      userId: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      forOrder: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      forWallet: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      transactionAmount: joi.alternatives().try(joi.array().items(),joi.number(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
