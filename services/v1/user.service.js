const bcrypt = require('bcrypt');
const logger = require('../../middlewares/log/logger');
const CustomError = require('../../util/customError');
const field_validator = require('../../util/field_validator');
const userDao = require('../../repositories/v1/user.dao');
const { LOG_TYPE } = require('../../constants/logger.constants');
const { STATUS_CODE } = require('../../constants/app.constants');
const { RESPONSE } = require('../../common/messages');

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
    delete newUser.password;

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
      throw new CustomError(PAYLOAD.USER.INVALID_CRED, STATUS_CODE.UNAUTHORIZED);
    }
    delete user.password;

    return {
      success: true,
      status: STATUS_CODE.CREATED,
      data: {
        user: user,
      },
    };
  },
};

module.exports = userService;
