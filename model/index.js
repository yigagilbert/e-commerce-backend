/**
 * index.js
 * @description :: exports all the models and its relationships among other models
 */

const dbConnection = require('../config/dbConnection');
const db = {};
db.sequelize = dbConnection;

db.user = require('./user');
db.banner = require('./banner');
db.image = require('./image');
db.cart = require('./cart');
db.cartItem = require('./cartItem');
db.category = require('./category');
db.city = require('./city');
db.state = require('./state');
db.country = require('./country');
db.order = require('./order');
db.orderItem = require('./orderItem');
db.pincode = require('./pincode');
db.product = require('./product');
db.shipping = require('./shipping');
db.address = require('./address');
db.wallet = require('./wallet');
db.walletTransaction = require('./walletTransaction');
db.userAuthSettings = require('./userAuthSettings');
db.userTokens = require('./userTokens');
db.role = require('./role');
db.projectRoute = require('./projectRoute');
db.routeRole = require('./routeRole');
db.userRole = require('./userRole');

db.user.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.user, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.user.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.user, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.banner.belongsTo(db.user, {
  foreignKey: 'sellerId',
  as: '_sellerId',
  targetKey: 'id' 
});
db.user.hasOne(db.banner, {
  foreignKey: 'sellerId',
  sourceKey: 'id' 
});
db.banner.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.banner, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.banner.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.banner, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.image.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.image, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.image.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.image, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.cart.belongsTo(db.user, {
  foreignKey: 'customerId',
  as: '_customerId',
  targetKey: 'id' 
});
db.user.hasMany(db.cart, {
  foreignKey: 'customerId',
  sourceKey: 'id' 
});
db.cart.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.cart, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.cart.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.cart, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.cartItem.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.cartItem, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.cartItem.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.cartItem, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.category.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.category, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.category.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.category, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.city.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.city, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.city.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.city, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.state.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.state, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.state.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.state, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.country.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.country, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.country.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.country, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.order.belongsTo(db.user, {
  foreignKey: 'customerId',
  as: '_customerId',
  targetKey: 'id' 
});
db.user.hasOne(db.order, {
  foreignKey: 'customerId',
  sourceKey: 'id' 
});
db.order.belongsTo(db.user, {
  foreignKey: 'sellerId',
  as: '_sellerId',
  targetKey: 'id' 
});
db.user.hasOne(db.order, {
  foreignKey: 'sellerId',
  sourceKey: 'id' 
});
db.order.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.order, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.order.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.order, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.orderItem.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.orderItem, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.orderItem.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.orderItem, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.pincode.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.pincode, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.pincode.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.pincode, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.product.belongsTo(db.user, {
  foreignKey: 'sellerId',
  as: '_sellerId',
  targetKey: 'id' 
});
db.user.hasOne(db.product, {
  foreignKey: 'sellerId',
  sourceKey: 'id' 
});
db.product.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.product, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.product.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.product, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.shipping.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.shipping, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.shipping.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.shipping, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.address.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.address, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.address.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.address, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.wallet.belongsTo(db.user, {
  foreignKey: 'userId',
  as: '_userId',
  targetKey: 'id' 
});
db.user.hasOne(db.wallet, {
  foreignKey: 'userId',
  sourceKey: 'id' 
});
db.wallet.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.wallet, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.wallet.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.wallet, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.walletTransaction.belongsTo(db.user, {
  foreignKey: 'userId',
  as: '_userId',
  targetKey: 'id' 
});
db.user.hasOne(db.walletTransaction, {
  foreignKey: 'userId',
  sourceKey: 'id' 
});
db.walletTransaction.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.walletTransaction, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.walletTransaction.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.walletTransaction, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.userAuthSettings.belongsTo(db.user, {
  foreignKey: 'userId',
  as: '_userId',
  targetKey: 'id' 
});
db.user.hasMany(db.userAuthSettings, {
  foreignKey: 'userId',
  sourceKey: 'id' 
});
db.userAuthSettings.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.userAuthSettings, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.userAuthSettings.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.userAuthSettings, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.userTokens.belongsTo(db.user, {
  foreignKey: 'userId',
  as: '_userId',
  targetKey: 'id' 
});
db.user.hasMany(db.userTokens, {
  foreignKey: 'userId',
  sourceKey: 'id' 
});
db.userTokens.belongsTo(db.user, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.userTokens, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.userTokens.belongsTo(db.user, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.user.hasMany(db.userTokens, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.userRole.belongsTo(db.user, {
  foreignKey: 'userId',
  as: '_userId',
  targetKey: 'id' 
});
db.user.hasMany(db.userRole, {
  foreignKey: 'userId',
  sourceKey: 'id' 
});
db.image.belongsTo(db.banner, {
  foreignKey: 'bannerId',
  as: '_bannerId',
  targetKey: 'id' 
});
db.banner.hasOne(db.image, {
  foreignKey: 'bannerId',
  sourceKey: 'id' 
});
db.cartItem.belongsTo(db.cart, {
  foreignKey: 'cartId',
  as: '_cartId',
  targetKey: 'id' 
});
db.cart.hasOne(db.cartItem, {
  foreignKey: 'cartId',
  sourceKey: 'id' 
});
db.product.belongsTo(db.category, {
  foreignKey: 'categoryId',
  as: '_categoryId',
  targetKey: 'id' 
});
db.category.hasOne(db.product, {
  foreignKey: 'categoryId',
  sourceKey: 'id' 
});
db.product.belongsTo(db.category, {
  foreignKey: 'subCategoryId',
  as: '_subCategoryId',
  targetKey: 'id' 
});
db.category.hasOne(db.product, {
  foreignKey: 'subCategoryId',
  sourceKey: 'id' 
});
db.pincode.belongsTo(db.city, {
  foreignKey: 'cityId',
  as: '_cityId',
  targetKey: 'id' 
});
db.city.hasOne(db.pincode, {
  foreignKey: 'cityId',
  sourceKey: 'id' 
});
db.address.belongsTo(db.city, {
  foreignKey: 'cityId',
  as: '_cityId',
  targetKey: 'id' 
});
db.city.hasOne(db.address, {
  foreignKey: 'cityId',
  sourceKey: 'id' 
});
db.city.belongsTo(db.state, {
  foreignKey: 'stateId',
  as: '_stateId',
  targetKey: 'id' 
});
db.state.hasOne(db.city, {
  foreignKey: 'stateId',
  sourceKey: 'id' 
});
db.pincode.belongsTo(db.state, {
  foreignKey: 'stateId',
  as: '_stateId',
  targetKey: 'id' 
});
db.state.hasOne(db.pincode, {
  foreignKey: 'stateId',
  sourceKey: 'id' 
});
db.address.belongsTo(db.state, {
  foreignKey: 'stateId',
  as: '_stateId',
  targetKey: 'id' 
});
db.state.hasOne(db.address, {
  foreignKey: 'stateId',
  sourceKey: 'id' 
});
db.state.belongsTo(db.country, {
  foreignKey: 'countryId',
  as: '_countryId',
  targetKey: 'id' 
});
db.country.hasOne(db.state, {
  foreignKey: 'countryId',
  sourceKey: 'id' 
});
db.pincode.belongsTo(db.country, {
  foreignKey: 'countryId',
  as: '_countryId',
  targetKey: 'id' 
});
db.country.hasOne(db.pincode, {
  foreignKey: 'countryId',
  sourceKey: 'id' 
});
db.orderItem.belongsTo(db.order, {
  foreignKey: 'orderId',
  as: '_orderId',
  targetKey: 'id' 
});
db.order.hasOne(db.orderItem, {
  foreignKey: 'orderId',
  sourceKey: 'id' 
});
db.shipping.belongsTo(db.order, {
  foreignKey: 'orderId',
  as: '_orderId',
  targetKey: 'id' 
});
db.order.hasOne(db.shipping, {
  foreignKey: 'orderId',
  sourceKey: 'id' 
});
db.address.belongsTo(db.pincode, {
  foreignKey: 'pincodeId',
  as: '_pincodeId',
  targetKey: 'id' 
});
db.pincode.hasOne(db.address, {
  foreignKey: 'pincodeId',
  sourceKey: 'id' 
});
db.cartItem.belongsTo(db.product, {
  foreignKey: 'productId',
  as: '_productId',
  targetKey: 'subCategoryId' 
});
db.product.hasOne(db.cartItem, {
  foreignKey: 'productId',
  sourceKey: 'subCategoryId' 
});
db.orderItem.belongsTo(db.product, {
  foreignKey: 'productId',
  as: '_productId',
  targetKey: 'id' 
});
db.product.hasOne(db.orderItem, {
  foreignKey: 'productId',
  sourceKey: 'id' 
});
db.address.belongsTo(db.shipping, {
  foreignKey: 'shippingId',
  as: '_shippingId',
  targetKey: 'id' 
});
db.shipping.hasOne(db.address, {
  foreignKey: 'shippingId',
  sourceKey: 'id' 
});
db.walletTransaction.belongsTo(db.wallet, {
  foreignKey: 'walletId',
  as: '_walletId',
  targetKey: 'id' 
});
db.wallet.hasOne(db.walletTransaction, {
  foreignKey: 'walletId',
  sourceKey: 'id' 
});
db.routeRole.belongsTo(db.role, {
  foreignKey: 'roleId',
  as: '_roleId',
  targetKey: 'id' 
});
db.role.hasMany(db.routeRole, {
  foreignKey: 'roleId',
  sourceKey: 'id' 
});
db.userRole.belongsTo(db.role, {
  foreignKey: 'roleId',
  as: '_roleId',
  targetKey: 'id' 
});
db.role.hasMany(db.userRole, {
  foreignKey: 'roleId',
  sourceKey: 'id' 
});
db.routeRole.belongsTo(db.projectRoute, {
  foreignKey: 'routeId',
  as: '_routeId',
  targetKey: 'id' 
});
db.projectRoute.hasMany(db.routeRole, {
  foreignKey: 'routeId',
  sourceKey: 'id' 
});

module.exports = db;