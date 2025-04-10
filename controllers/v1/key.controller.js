const keyService = require('../../services/v1/key.service');

const keyController = {
  generate: async (req, res, next) => {
    try {
      const response = await keyService.generateNewKey(req.user);
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

module.exports = keyController;
