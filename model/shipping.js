/**
 * shipping.js
 * @description :: sequelize model of database table shipping
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
const shippingEnum = require('../constants/shipping');
let Shipping = sequelize.define('shipping',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true,
    unique:true
  },
  orderId:{ type:DataTypes.INTEGER },
  courierCompany:{ type:DataTypes.STRING },
  deliveryStartDate:{ type:DataTypes.DATE },
  estimatedDeliveryDate:{ type:DataTypes.DATE },
  actualDeliveryDate:{ type:DataTypes.DATE },
  isPrepaid:{ type:DataTypes.BOOLEAN },
  isReturned:{ type:DataTypes.BOOLEAN },
  returningReason:{ type:DataTypes.STRING },
  returnPickupDate:{ type:DataTypes.DATE },
  isReturnDamaged:{ type:DataTypes.BOOLEAN },
  returnRecievedDate:{ type:DataTypes.DATE },
        
  shippingStatus:{
    type:DataTypes.ENUM,
    defaultValue:shippingEnum.STATUS.INITIATED,
    values:convertObjectToEnum(shippingEnum.STATUS)
  },
  isActive:{ type:DataTypes.BOOLEAN },
  createdAt:{ type:DataTypes.DATE },
  updatedAt:{ type:DataTypes.DATE },
  addedBy:{ type:DataTypes.INTEGER },
  updatedBy:{ type:DataTypes.INTEGER },
  isDeleted:{ type:DataTypes.BOOLEAN }
}
,{
  hooks:{
    beforeCreate: [
      async function (shipping,options){
        shipping.isActive = true;
        shipping.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (shipping,options){
        if (shipping !== undefined && shipping.length) { 
          for (let index = 0; index < shipping.length; index++) { 
        
            const element = shipping[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Shipping.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Shipping);
sequelizePaginate.paginate(Shipping);
module.exports = Shipping;
