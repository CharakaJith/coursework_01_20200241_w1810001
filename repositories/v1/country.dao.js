const { Op } = require('sequelize');
const models = require('../../models');
const CustomError = require('../../util/customError');
const { DAO } = require('../../common/messages');
const { STATUS_CODE } = require('../../constants/app.constants');
const { ENTITY } = require('../../constants/entity.constants');

const countryDao = {
  insert: async (country) => {
    try {
      return await models.Country.create(country);
    } catch (error) {
      throw new CustomError(DAO.FAILED.INSERT(ENTITY.COUNTRY, error), STATUS_CODE.SERVER_ERROR);
    }
  },

  getRecent: async (currentTime, startTime) => {
    try {
      return await models.Country.findAll({
        where: {
          createdAt: {
            [Op.between]: [startTime, currentTime],
          },
        },
        include: [
          {
            model: models.Currency,
            as: ENTITY.CURRENCY,
          },
        ],
        attributes: { exclude: ['currencyId'] },
      });
    } catch (error) {
      throw new CustomError(DAO.FAILED.GET.RECENT(ENTITY.COUNTRY, error), STATUS_CODE.SERVER_ERROR);
    }
  },

  delete: async () => {
    try {
      await models.Country.destroy({
        where: {},
        cascade: true,
      });
    } catch (error) {
      throw new CustomError(DAO.FAILED.DELETE(ENTITY.COUNTRY, error), STATUS_CODE.SERVER_ERROR);
    }
  },
};

module.exports = countryDao;
