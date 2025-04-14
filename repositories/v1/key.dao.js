const models = require('../../models');
const CustomError = require('../../util/customError');
const { DAO } = require('../../common/messages');
const { STATUS_CODE, API_KEY } = require('../../constants/app.constants');
const { ENTITY } = require('../../constants/entity.constants');

const keyDao = {
  insert: async (key) => {
    try {
      return await models.ApiKey.create(key);
    } catch (error) {
      throw new CustomError(DAO.FAILED.INSERT(ENTITY.KEYS, error), STATUS_CODE.SERVER_ERROR);
    }
  },

  update: async (key) => {
    try {
      return await models.ApiKey.update(
        {
          status: key.status,
        },
        {
          where: {
            id: key.id,
          },
        }
      );
    } catch (error) {
      throw new CustomError(DAO.FAILED.UPDATE(ENTITY.KEYS, error), STATUS_CODE.SERVER_ERROR);
    }
  },

  getActiveKeyByUser: async (key) => {
    try {
      return await models.ApiKey.findOne({
        where: {
          userId: key.userId,
          apiKey: key.apiKey,
          status: API_KEY.STATUS.ACTIVE,
        },
      });
    } catch (error) {
      throw new CustomError(DAO.FAILED.GET.BY_USER(ENTITY.KEYS, error), STATUS_CODE.SERVER_ERROR);
    }
  },

  getAllKeysByUser: async (userId) => {
    try {
      return await models.ApiKey.findAll({
        where: {
          userId: userId,
          status: API_KEY.STATUS.ACTIVE,
        },
      });
    } catch (error) {
      throw new CustomError(DAO.FAILED.GET.BY_USER(ENTITY.KEYS, error), STATUS_CODE.SERVER_ERROR);
    }
  },

  getKeyById: async (keyId) => {
    try {
      return await models.ApiKey.findOne({
        where: {
          id: keyId,
        },
      });
    } catch (error) {
      throw new CustomError(DAO.FAILED.GET.BY_ID(ENTITY.KEYS, error), STATUS_CODE.SERVER_ERROR);
    }
  },

  getKey: async (key) => {
    try {
      return await models.ApiKey.findOne({
        where: {
          apiKey: key,
        },
      });
    } catch (error) {
      throw new CustomError(DAO.FAILED.GET.BY_KEY(ENTITY.KEYS), STATUS_CODE.SERVER_ERROR);
    }
  },
};

module.exports = keyDao;
