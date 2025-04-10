const keyDao = require('../../repositories/v1/key.dao');
const uuidService = require('../uuid.service');
const { UUID } = require('../../common/messages');
const { API_KEY, STATUS_CODE } = require('../../constants/app.constants');

const keyService = {
  generateNewKey: async (data) => {
    const { id } = data;

    // check key limit for user
    const keys = await uuidService.getActiveKeys(id);
    if (keys.length >= API_KEY.MAX_COUNT) {
      return {
        success: false,
        status: STATUS_CODE.UNPORCESSABLE,
        data: {
          message: UUID.FULL,
          apiKeys: keys,
        },
      };
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
};

module.exports = keyService;
