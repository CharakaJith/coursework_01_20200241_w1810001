const keyDao = require('../../repositories/v1/key.dao');
const uuidService = require('../uuid.service');
const CustomError = require('../../util/customError');
const { API_KEY, STATUS_CODE } = require('../../constants/app.constants');
const { RESPONSE, JWT } = require('../../common/messages');

const keyService = {
  generateNewKey: async (data) => {
    const { id } = data;

    // check key limit for user
    const keys = await uuidService.getActiveKeys(id);
    if (keys.length >= API_KEY.MAX_COUNT) {
      throw new CustomError(RESPONSE.KEY.LIMIT_FULL, STATUS_CODE.UNPORCESSABLE);
    }

    // generate new api key
    const apikey = await uuidService.generateUUID(id);

    const apiKeyData = {
      userId: id,
      apiKey: apikey,
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      status: API_KEY.STATUS.ACTIVE,
    };

    // create new key
    const newKey = await keyDao.insert(apiKeyData);
    return {
      success: true,
      status: STATUS_CODE.CREATED,
      data: {
        apiKey: newKey,
      },
    };
  },

  getAllKeys: async (data) => {
    const { id } = data;

    // get all keys
    const keys = await uuidService.getActiveKeys(id);
    if (keys.length === 0) {
      throw new CustomError(RESPONSE.KEY.NOT_FOUND, STATUS_CODE.NOT_FOUND);
    }

    return {
      success: true,
      status: STATUS_CODE.OK,
      data: {
        apiKeys: keys,
      },
    };
  },

  revokeApiKey: async (data) => {
    const { keyId, userId } = data;

    // get and validate api key
    const key = await keyDao.getKeyById(keyId);
    if (!key) {
      throw new CustomError(RESPONSE.KEY.INVALID_ID, STATUS_CODE.NOT_FOUND);
    }
    if (key.userId !== userId) {
      throw new CustomError(JWT.AUTH.FORBIDDEN, STATUS_CODE.FORBIDDON);
    }
    if (key.status !== API_KEY.STATUS.ACTIVE) {
      throw new CustomError(RESPONSE.KEY.CANNOT_REVOKE, STATUS_CODE.BAD_REQUEST);
    }

    // update key status
    const keyData = {
      id: key.id,
      status: API_KEY.STATUS.REVOKED,
    };
    await keyDao.update(keyData);

    return {
      success: true,
      status: STATUS_CODE.OK,
      data: {
        message: RESPONSE.KEY.REVOKED,
      },
    };
  },
};

module.exports = keyService;
