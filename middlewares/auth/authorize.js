const logger = require('../log/logger');
const { STATUS_CODE } = require('../../constants/app.constants');
const { JWT } = require('../../common/messages');

const authorize = (...allowedRoles) => {
  const checkRole = async (req, res, next) => {
    try {
      // TODO: implement role based access control
      next();
    } catch (error) {
      res.status(STATUS_CODE.FORBIDDON).json({
        success: false,
        response: {
          status: STATUS_CODE.FORBIDDON,
          data: JWT.AUTH.FORBIDDEN,
        },
      });
    }
  };
};

module.exports = authorize;
