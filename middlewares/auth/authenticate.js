const jwt = require('jsonwebtoken');
const logger = require('../log/logger');
const { STATUS_CODE } = require('../../constants/app.constants');
const { JWT } = require('../../common/messages');

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    // decode access token
    const decodedToken = jwt.verify(JSON.parse(token), process.env.ACCESS_TOKEN_SECRET);
    req.user = decodedToken.tokenUser;

    next();
  } catch (error) {
    res.status(STATUS_CODE.UNAUTHORIZED).json({
      success: false,
      response: {
        status: STATUS_CODE.UNAUTHORIZED,
        data: JWT.AUTH.FAILED,
      },
    });

    logger(LOG_TYPE.ERROR, false, STATUS_CODE.UNAUTHORIZED, `${error.message}`, req);
  }
};

module.exports = authenticate;
