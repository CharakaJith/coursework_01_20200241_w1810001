const userService = require('../../services/v1/user.service');
const { APP_ENV } = require('../../constants/app.constants');

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

  login: async (req, res, next) => {
    try {
      const user = ({ email, password } = req.body);

      const response = await userService.userLogin(user);
      const { success, status, data, accessToken, refreshToken } = response;

      // set access token
      res.set({
        'Access-Token': accessToken,
      });

      // set refresh token in a http-only cookie
      const isSecure = process.env.NODE_ENV === APP_ENV.DEV ? false : true;
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: isSecure,
        sameSite: 'Strict',
        path: '/',
      });

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

  update: async (req, res, next) => {
    try {
      const { id } = req.user;
      const { firstName, lastName } = req.body;
      const userDetails = {
        id,
        firstName,
        lastName,
      };

      const response = await userService.updateUserDetails(userDetails);
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

  updatePassword: async (req, res, next) => {
    try {
      const { id } = req.user;
      const { oldPassword, newPassword } = req.body;
      const userDetails = {
        id,
        oldPassword,
        newPassword,
      };

      const response = await userService.updateUserPassword(userDetails);
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

  deactivate: async (req, res, next) => {
    try {
      const userId = req.user.id;

      const response = await userService.deactivateUser(userId);
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

module.exports = userController;
