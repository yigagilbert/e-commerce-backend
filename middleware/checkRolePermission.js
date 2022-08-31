/**
 * checkRolePermission.js
 * @description :: middleware that checks access of APIs for logged-in user
 */

const model = require('../model');
const dbService = require('../utils/dbService');
const { replaceAll } = require('../utils/common');
const { role } = require('../model');

/**
 * @description : middleware for authentication with role and permission.
 * @param {obj} req : request of route.
 * @param {obj} res : response of route.
 * @param {callback} next : executes the next middleware succeeding the current middleware.
 */

const checkRolePermission = async (req, res, next) => {
  if (!req.user) {
    return res.unAuthorized({ message :'Authorization token required!' });
  } 
  const loggedInUserId = req.user.id;
  let rolesOfUser = await dbService.findAll(model.userRole, {
    userId: loggedInUserId,
    isActive: true,
    isDeleted: false,

  },
  { attributes: ['roleId'] });
  if (rolesOfUser && rolesOfUser.length) {
    rolesOfUser = [...new Set((rolesOfUser).map((item) => item.roleId))];
    const route = await dbService.findOne(model.projectRoute, {
      route_name: replaceAll((req.route.path.toLowerCase()), '/', '_'),
      uri: req.route.path.toLowerCase(),
    });
    if (route) {
      const allowedRoute = await dbService.findAll(model.routeRole, {

        $and: [
          { routeId: route.id },
          { roleId: { $in: rolesOfUser } },
          { isActive: true },
          { isDeleted: false },
        ],

      });
      if (allowedRoute && allowedRoute.length) {
        next();
      } else {
        return res.unAuthorized({ message :'You are not having permission to access this route!' });
      }
    } else {
      return res.unAuthorized({ message :'You are not having permission to access this route!' });
    }
  } else {
    next();
  }

};

module.exports = checkRolePermission;
