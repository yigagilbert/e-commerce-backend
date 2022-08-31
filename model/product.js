/**
 * product.js
 * @description :: sequelize model of database table product
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Product = sequelize.define('product',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true,
    unique:true
  },
  name:{ type:DataTypes.STRING },
  price:{ type:DataTypes.FLOAT },
  sellerId:{ type:DataTypes.INTEGER },
  brand:{ type:DataTypes.STRING },
  categoryId:{ type:DataTypes.INTEGER },
  subCategoryId:{ type:DataTypes.INTEGER },
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
      async function (product,options){
        product.isActive = true;
        product.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (product,options){
        if (product !== undefined && product.length) { 
          for (let index = 0; index < product.length; index++) { 
        
            const element = product[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Product.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Product);
sequelizePaginate.paginate(Product);
module.exports = Product;
