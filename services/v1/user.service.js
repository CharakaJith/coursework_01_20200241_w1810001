const bcrypt = require('bcrypt');
const logger = require('../../middlewares/log/logger');
const CustomError = require('../../util/customError');
const userDao = require('../../repositories/v1/user.dao');
const jwtService = require('../jwt.service');
const field_validator = require('../../util/field_validator');
const { LOG_TYPE } = require('../../constants/logger.constants');
const { STATUS_CODE } = require('../../constants/app.constants');
const { RESPONSE, JWT } = require('../../common/messages');

const userService = {
  userSignup: async (data) => {
    const { firstName, lastName, email, password } = data;

    // validate user details
    const errorArray = [];
    errorArray.push(await field_validator.validate_string(firstName, 'firstName'));
    errorArray.push(await field_validator.validate_string(lastName, 'lastName'));
    errorArray.push(await field_validator.validate_email(email, 'email'));
    errorArray.push(await field_validator.validate_string(password, 'password'));

    // check request data
    const filteredErrors = errorArray.filter((obj) => obj !== 1);
    if (filteredErrors.length !== 0) {
      logger(LOG_TYPE.ERROR, false, STATUS_CODE.BAD_REQUEST, filteredErrors);

      return {
        success: false,
        status: STATUS_CODE.BAD_REQUEST,
        data: filteredErrors,
      };
    }

    // check if user already registered
    const user = await userDao.getByEmail(email);
    if (user) {
      throw new CustomError(RESPONSE.USER.EXISTS, STATUS_CODE.CONFLICT);
    }

    // hash password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // create new user
    const userDetails = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: encryptedPassword,
    };
    const newUser = await userDao.insert(userDetails);

    // remove password
    delete newUser.dataValues.password;

    return {
      success: true,
      status: STATUS_CODE.CREATED,
      data: {
        user: newUser,
      },
    };
  },

  userLogin: async (data) => {
    const { email, password } = data;

    // validate user details
    const errorArray = [];
    errorArray.push(await field_validator.validate_email(email, 'email'));
    errorArray.push(await field_validator.validate_string(password, 'password'));

    // check request data
    const filteredErrors = errorArray.filter((obj) => obj !== 1);
    if (filteredErrors.length !== 0) {
      logger(LOG_TYPE.ERROR, false, STATUS_CODE.BAD_REQUEST, filteredErrors);

      return {
        success: false,
        status: STATUS_CODE.BAD_REQUEST,
        data: filteredErrors,
      };
    }

    // get user details
    const user = await userDao.getByEmail(email);
    if (!user) {
      throw new CustomError(RESPONSE.USER.INVALID_CRED, STATUS_CODE.UNAUTHORIZED);
    }

    // validate password and remove it
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new CustomError(RESPONSE.USER.INVALID_CRED, STATUS_CODE.UNAUTHORIZED);
    }
    delete user.dataValues.password;

    // check if user is active
    if (!user.isActive) {
      throw new CustomError(RESPONSE.USER.INACTIVE, STATUS_CODE.FORBIDDON);
    }

    // generate access token and refresh token
    const tokenUser = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isActive: user.isActive,
    };
    const accessToken = await jwtService.generateAccessToken(tokenUser);
    const refreshToken = await jwtService.generateRefreshToken(tokenUser);

    return {
      success: true,
      status: STATUS_CODE.OK,
      data: {
        user: user,
      },
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  },

  updateUserDetails: async (data) => {
    const { id, firstName, lastName } = data;

    // validate user details
    const errorArray = [];
    errorArray.push(await field_validator.validate_string(firstName, 'firstName'));
    errorArray.push(await field_validator.validate_string(lastName, 'lastName'));

    // check request data
    const filteredErrors = errorArray.filter((obj) => obj !== 1);
    if (filteredErrors.length !== 0) {
      logger(LOG_TYPE.ERROR, false, STATUS_CODE.BAD_REQUEST, filteredErrors);

      return {
        success: false,
        status: STATUS_CODE.BAD_REQUEST,
        data: filteredErrors,
      };
    }

    // get and validate user
    const user = await userDao.getById(id);
    if (!user) {
      throw new CustomError(RESPONSE.USER.NOT_FOUND);
    }
    if (user.id !== id) {
      throw new CustomError(JWT.AUTH.FORBIDDEN, STATUS_CODE.FORBIDDON);
    }
    if (!user.isActive) {
      throw new CustomError(RESPONSE.USER.INACTIVE, STATUS_CODE.FORBIDDON);
    }

    // update user
    const userData = {
      id: user.id,
      firstName: firstName,
      lastName: lastName,
      password: user.password,
      isActive: user.isActive,
    };
    await userDao.update(userData);

    // fetch updated user
    const updatedUser = await userDao.getById(id);

    // remove password
    delete updatedUser.dataValues.password;

    return {
      success: true,
      status: STATUS_CODE.OK,
      data: {
        user: updatedUser,
      },
    };
  },

  updateUserPassword: async (data) => {
    const { id, oldPassword, newPassword } = data;

    // validate user details
    const errorArray = [];
    errorArray.push(await field_validator.validate_string(oldPassword, 'oldPassword'));
    errorArray.push(await field_validator.validate_string(newPassword, 'newPassword'));

    // check request data
    const filteredErrors = errorArray.filter((obj) => obj !== 1);
    if (filteredErrors.length !== 0) {
      logger(LOG_TYPE.ERROR, false, STATUS_CODE.BAD_REQUEST, filteredErrors);

      return {
        success: false,
        status: STATUS_CODE.BAD_REQUEST,
        data: filteredErrors,
      };
    }

    // get and validate user
    const user = await userDao.getById(id);
    if (!user) {
      throw new CustomError(RESPONSE.USER.NOT_FOUND);
    }
    if (user.id !== id) {
      throw new CustomError(JWT.AUTH.FORBIDDEN, STATUS_CODE.FORBIDDON);
    }
    if (!user.isActive) {
      throw new CustomError(RESPONSE.USER.INACTIVE, STATUS_CODE.FORBIDDON);
    }

    // validate password
    const isValidPassword = await bcrypt.compare(oldPassword, user.password);
    if (!isValidPassword) {
      throw new CustomError(RESPONSE.USER.INVALID_PASSWORD, STATUS_CODE.UNAUTHORIZED);
    }

    // hash new password
    const encryptedPassword = await bcrypt.hash(newPassword, 10);

    // update user
    const userData = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      password: encryptedPassword,
      isActive: user.isActive,
    };
    await userDao.update(userData);

    return {
      success: true,
      status: STATUS_CODE.OK,
      data: {
        message: RESPONSE.USER.PWD_UPDATED,
      },
    };
  },

  deactivateUser: async (userId) => {
    // get and validate user
    const user = await userDao.getById(userId);
    if (!user) {
      throw new CustomError(RESPONSE.USER.NOT_FOUND);
    }
    if (user.id !== userId) {
      throw new CustomError(JWT.AUTH.FORBIDDEN, STATUS_CODE.FORBIDDON);
    }
    if (!user.isActive) {
      throw new CustomError(RESPONSE.USER.INACTIVE, STATUS_CODE.FORBIDDON);
    }

    // deactivate user
    const userData = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
      isActive: false,
    };
    await userDao.update(userData);

    return {
      success: true,
      status: STATUS_CODE.GONE,
      data: {
        message: RESPONSE.USER.DEACTIVATED,
      },
    };
  },
};

module.exports = userService;
