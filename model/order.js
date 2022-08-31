/**
 * order.js
 * @description :: sequelize model of database table order
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Order = sequelize.define('order',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true,
    unique:true
  },
  customerId:{ type:DataTypes.INTEGER },
  sellerId:{ type:DataTypes.INTEGER },
  totalAmount:{ type:DataTypes.FLOAT },
  status:{ type:DataTypes.STRING },
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
      async function (order,options){
        order.isActive = true;
        order.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (order,options){
        if (order !== undefined && order.length) { 
          for (let index = 0; index < order.length; index++) { 
        
            const element = order[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Order.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Order);
sequelizePaginate.paginate(Order);
module.exports = Order;
