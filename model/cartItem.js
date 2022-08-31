/**
 * cartItem.js
 * @description :: sequelize model of database table cartItem
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let CartItem = sequelize.define('cartItem',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  productId:{ type:DataTypes.INTEGER },
  quantity:{
    type:DataTypes.INTEGER,
    min:1,
    validate:{ min:1 },
    primaryKey:false,
    allowNull:true
  },
  price:{
    type:DataTypes.FLOAT,
    min:1,
    validate:{ min:1 },
    primaryKey:false,
    allowNull:true
  },
  amount:{
    type:DataTypes.FLOAT,
    min:1,
    validate:{ min:1 },
    primaryKey:false,
    allowNull:true
  },
  cartId:{ type:DataTypes.INTEGER },
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
      async function (cartItem,options){
        cartItem.isActive = true;
        cartItem.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (cartItem,options){
        if (cartItem !== undefined && cartItem.length) { 
          for (let index = 0; index < cartItem.length; index++) { 
        
            const element = cartItem[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
CartItem.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(CartItem);
sequelizePaginate.paginate(CartItem);
module.exports = CartItem;
