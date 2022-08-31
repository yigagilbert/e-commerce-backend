/**
 * address.js
 * @description :: sequelize model of database table address
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Address = sequelize.define('address',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  pincodeId:{ type:DataTypes.INTEGER },
  address1:{ type:DataTypes.STRING },
  address2:{ type:DataTypes.STRING },
  landmark:{ type:DataTypes.STRING },
  cityId:{ type:DataTypes.INTEGER },
  isDefault:{ type:DataTypes.BOOLEAN },
  stateId:{ type:DataTypes.INTEGER },
  addressType:{ type:DataTypes.STRING },
  fullName:{ type:DataTypes.STRING },
  addressNo:{ type:DataTypes.INTEGER },
  isActive:{ type:DataTypes.BOOLEAN },
  createdAt:{ type:DataTypes.DATE },
  updatedAt:{ type:DataTypes.DATE },
  addedBy:{ type:DataTypes.INTEGER },
  updatedBy:{ type:DataTypes.INTEGER },
  mobile:{ type:DataTypes.BIGINT },
  shippingId:{ type:DataTypes.INTEGER },
  isDeleted:{ type:DataTypes.BOOLEAN }
}
,{
  hooks:{
    beforeCreate: [
      async function (address,options){
        address.isActive = true;
        address.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (address,options){
        if (address !== undefined && address.length) { 
          for (let index = 0; index < address.length; index++) { 
        
            const element = address[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Address.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Address);
sequelizePaginate.paginate(Address);
module.exports = Address;
