const countryService = require('../../services/v1/country.service');

const publicCountryController = {
  fetchAll: async (req, res, next) => {
    try {
      const response = await countryService.fetchAllCountries();
      const { success, status, data } = response;

      res.status(status).json({
        success: success,
        response: {
          status: status,
          data: data,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  fetchById: async (req, res, next) => {
    try {
      const { id } = req.params;

      const response = await countryService.fetchCountryById(id);
      const { success, status, data } = response;

      res.status(status).json({
        success: success,
        response: {
          status: status,
          data: data,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = publicCountryController;
