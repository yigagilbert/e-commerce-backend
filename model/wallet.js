/**
 * wallet.js
 * @description :: sequelize model of database table wallet
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Wallet = sequelize.define('wallet',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true,
    unique:true
  },
  userId:{ type:DataTypes.INTEGER },
  walletAmount:{ type:DataTypes.FLOAT },
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
      async function (wallet,options){
        wallet.isActive = true;
        wallet.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (wallet,options){
        if (wallet !== undefined && wallet.length) { 
          for (let index = 0; index < wallet.length; index++) { 
        
            const element = wallet[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Wallet.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Wallet);
sequelizePaginate.paginate(Wallet);
module.exports = Wallet;
