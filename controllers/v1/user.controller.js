const userService = require('../../services/v1/user.service');

const userController = {
  signup: async (req, res, next) => {
    try {
      const newUser = ({ firstname, lastName, email, password } = req.body);

      const response = await userService.userSignup(newUser);
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

  login: async (req, res) => {},
};

module.exports = userController;
