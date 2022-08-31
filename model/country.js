/**
 * country.js
 * @description :: sequelize model of database table country
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Country = sequelize.define('country',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true,
    unique:true
  },
  countryName:{ type:DataTypes.STRING },
  isActive:{ type:DataTypes.BOOLEAN },
  phoneCode:{ type:DataTypes.STRING },
  createdAt:{ type:DataTypes.DATE },
  updatedAt:{ type:DataTypes.DATE },
  addedBy:{ type:DataTypes.INTEGER },
  updatedBy:{ type:DataTypes.INTEGER },
  isDeleted:{ type:DataTypes.BOOLEAN }
}
,{
  hooks:{
    beforeCreate: [
      async function (country,options){
        country.isActive = true;
        country.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (country,options){
        if (country !== undefined && country.length) { 
          for (let index = 0; index < country.length; index++) { 
        
            const element = country[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Country.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Country);
sequelizePaginate.paginate(Country);
module.exports = Country;
