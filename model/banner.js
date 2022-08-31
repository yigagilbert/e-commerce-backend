/**
 * banner.js
 * @description :: sequelize model of database table banner
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Banner = sequelize.define('banner',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true,
    unique:true
  },
  bannerTitle:{ type:DataTypes.STRING },
  alternateTitle:{ type:DataTypes.STRING },
  startDate:{ type:DataTypes.DATE },
  endDate:{ type:DataTypes.DATE },
  redirectLink:{ type:DataTypes.STRING },
  sellerId:{ type:DataTypes.INTEGER },
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
      async function (banner,options){
        banner.isActive = true;
        banner.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (banner,options){
        if (banner !== undefined && banner.length) { 
          for (let index = 0; index < banner.length; index++) { 
        
            const element = banner[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Banner.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Banner);
sequelizePaginate.paginate(Banner);
module.exports = Banner;
