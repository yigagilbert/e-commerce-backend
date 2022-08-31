/**
 * bannerValidation.js
 * @description :: validate each post and put request as per banner model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of banner */
exports.schemaKeys = joi.object({
  bannerTitle: joi.string().allow(null).allow(''),
  alternateTitle: joi.string().allow(null).allow(''),
  startDate: joi.date().options({ convert: true }).allow(null).allow(''),
  endDate: joi.date().options({ convert: true }).allow(null).allow(''),
  redirectLink: joi.string().allow(null).allow(''),
  sellerId: joi.number().integer().allow(0),
  isActive: joi.boolean(),
  isDeleted: joi.boolean()
}).unknown(true);

/** validation keys and properties of banner for updation */
exports.updateSchemaKeys = joi.object({
  bannerTitle: joi.string().allow(null).allow(''),
  alternateTitle: joi.string().allow(null).allow(''),
  startDate: joi.date().options({ convert: true }).allow(null).allow(''),
  endDate: joi.date().options({ convert: true }).allow(null).allow(''),
  redirectLink: joi.string().allow(null).allow(''),
  sellerId: joi.number().integer().allow(0),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of banner for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      bannerTitle: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      alternateTitle: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      startDate: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      endDate: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      redirectLink: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      sellerId: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
