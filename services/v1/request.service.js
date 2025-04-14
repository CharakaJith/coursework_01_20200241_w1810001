const keyDao = require('../../repositories/v1/key.dao');
const requestDao = require('../../repositories/v1/request.dao');
const { STATUS_CODE } = require('../../constants/app.constants');

const requestService = {
  getRequestLog: async (userId) => {
    const requestLog = [];

    // get active api keys for user
    const apiKeys = await keyDao.getAllKeysByUser(userId);

    // get request history
    for (const key of apiKeys) {
      const requests = await requestDao.getAllByKeyId(key.id);

      const requestData = requests.map((req) => {
        return {
          maskedKey: maskApiKey(key.apiKey),
          keyStatus: key.status,
          endpoint: req.endpoint,
          status: req.statusCode,
          timeStamp: req.createdAt,
        };
      });

      requestLog.push(...requestData);
    }

    return {
      success: true,
      status: STATUS_CODE.OK,
      data: {
        log: requestLog,
      },
    };
  },
};

function maskApiKey(key) {
  return key
    .split('-')
    .map((segment, index, arr) => {
      if (index === arr.length - 1) {
        return '*'.repeat(segment.length - 4) + segment.slice(-4);
      }
      return '*'.repeat(segment.length);
    })
    .join('-');
}

module.exports = requestService;
