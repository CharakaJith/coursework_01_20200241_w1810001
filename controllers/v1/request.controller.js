const requestService = require('../../services/v1/request.service');

const requestController = {
  getAll: async (req, res, next) => {
    try {
      const { id } = req.user;

      const response = await requestService.getRequestLog(id);
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

module.exports = requestController;
