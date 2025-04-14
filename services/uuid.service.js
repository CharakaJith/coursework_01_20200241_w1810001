const { v4: uuidv4 } = require('uuid');
const CustomError = require('../util/customError');
const keyDao = require('../repositories/v1/key.dao');
const { UUID } = require('../common/messages');
const { STATUS_CODE, API_KEY } = require('../constants/app.constants');

const uuidService = {
  getActiveKeys: async (userId) => {
    // get all keys
    const apiKeys = await keyDao.getAllKeysByUser(userId);

    // filter out active keys
    const activeKeys = apiKeys.filter((key) => key.status === API_KEY.STATUS.ACTIVE);

    // filter out expired keys
    const currentDate = new Date();

    const validKeys = activeKeys.filter((key) => new Date(key.expiresAt) > currentDate);
    const expiredKeys = activeKeys.filter((key) => new Date(key.expiresAt) <= currentDate);

    // invalidate expired keys
    if (expiredKeys.length > 0) {
      await invalidateApiKeys(expiredKeys);
    }

    return validKeys;
  },

  generateUUID: async (userId) => {
    let isUnique = false;
    let tryCount = 0;
    const maxTries = 10;

    while (!isUnique && tryCount < maxTries) {
      tryCount++;

      // generate uuid
      const uuid = uuidv4();

      const keyData = {
        userId: userId,
        apiKey: uuid,
      };

      // check if key exists
      const key = await keyDao.getActiveKeyByUser(keyData);
      if (!key) {
        return uuid;
      }
    }

    throw new CustomError(UUID.GENERATE.TIMEOUT, STATUS_CODE.TIME_OUT);
  },
};

async function invalidateApiKeys(apiKeys) {
  for (const key of apiKeys) {
    const keyData = {
      id: key.id,
      status: API_KEY.STATUS.EXPIRED,
    };

    await keyDao.update(keyData);
  }
}

module.exports = uuidService;
