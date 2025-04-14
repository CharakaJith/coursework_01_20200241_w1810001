const models = require('../../models');
const CustomError = require('../../util/customError');
const { DAO } = require('../../common/messages');
const { STATUS_CODE, API_KEY } = require('../../constants/app.constants');
const { ENTITY } = require('../../constants/entity.constants');

const requestDao = {
  insert: async (request) => {
    try {
      return await models.ApiRequest.create(request);
    } catch (error) {
      throw new CustomError(DAO.FAILED.INSERT(ENTITY.REQUESTS, error), STATUS_CODE.SERVER_ERROR);
    }
  },

  getAllByKeyId: async (keyId) => {
    try {
      return await models.ApiRequest.findAll({
        where: {
          keyId: keyId,
        },
      });
    } catch (error) {
      throw new CustomError(DAO.FAILED.GET.BY_KEY(ENTITY.REQUESTS, error), STATUS_CODE.SERVER_ERROR);
    }
  },
};

module.exports = requestDao;
