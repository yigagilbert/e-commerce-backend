/**
 * walletTransaction.js
 * @description :: sequelize model of database table walletTransaction
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let WalletTransaction = sequelize.define('walletTransaction',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  walletId:{ type:DataTypes.INTEGER },
  userId:{ type:DataTypes.INTEGER },
  forOrder:{ type:DataTypes.BOOLEAN },
  forWallet:{ type:DataTypes.BOOLEAN },
  transactionAmount:{ type:DataTypes.FLOAT },
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
      async function (walletTransaction,options){
        walletTransaction.isActive = true;
        walletTransaction.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (walletTransaction,options){
        if (walletTransaction !== undefined && walletTransaction.length) { 
          for (let index = 0; index < walletTransaction.length; index++) { 
        
            const element = walletTransaction[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
WalletTransaction.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(WalletTransaction);
sequelizePaginate.paginate(WalletTransaction);
module.exports = WalletTransaction;
