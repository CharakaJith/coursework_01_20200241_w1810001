const logger = require('../log/logger');
const keyDao = require('../../repositories/v1/key.dao');
const requestDao = require('../../repositories/v1/request.dao');
const { STATUS_CODE } = require('../../constants/app.constants');
const { LOG_TYPE } = require('../../constants/logger.constants');
const { API_KEY: API_KEY_MSG } = require('../../common/messages');
const { API_KEY } = require('../../constants/app.constants');

const validateAPIKey = async (req, res, next) => {
  try {
    // check for api key
    const key = req.header('x-api-key');
    if (!key) {
      throw new Error(API_KEY_MSG.MISSING);
    }

    // get and validate api key
    const apiKey = await keyDao.getKey(key);
    if (!apiKey) {
      throw new Error(API_KEY_MSG.INVALID);
    }
    if (apiKey.status !== API_KEY.STATUS.ACTIVE) {
      throw new Error(API_KEY_MSG.NOT_ACTIVE);
    }

    // record request details
    const apiRequest = {
      keyId: apiKey.id,
      endpoint: req.originalUrl,
      statusCode: STATUS_CODE.OK,
    };
    await requestDao.insert(apiRequest);

    next();
  } catch (error) {
    const statusCode = STATUS_CODE.UNAUTHORIZED;

    res.status(statusCode).json({
      success: false,
      response: {
        status: statusCode,
        data: error.message,
      },
    });

    logger(LOG_TYPE.ERROR, false, statusCode, `${error.message}`, req);
  }
};

module.exports = validateAPIKey;
