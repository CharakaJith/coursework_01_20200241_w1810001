const db = require('../../database/connection');
const CustomError = require('../../util/customError');
const { DAO } = require('../../common/messages');
const { USER_QUERIES } = require('../../common/queries/user.queries');
const { STATUS_CODE } = require('../../constants/app.constants');

const userDao = {
  insert: async (user) => {
    return new Promise((resolve, reject) => {
      const values = [user.firstName, user.lastName, user.email, user.password];

      db.run(USER_QUERIES.INSERT, values, function (error) {
        if (error) return reject(new CustomError(DAO.FAILED.INSERT('users', error), STATUS_CODE.SERVER_ERROR));

        return userDao
          .getById(this.lastID)
          .then((user) => resolve(user))
          .catch((error) => reject(error));
      });
    });
  },

  getById: async (userId) => {
    return new Promise((resolve, reject) => {
      db.get(USER_QUERIES.GET_BY_ID, [userId], function (error, row) {
        if (error) return reject(new CustomError(DAO.FAILED.GET.BY_ID('users', error), STATUS_CODE.SERVER_ERROR));

        return resolve(row);
      });
    });
  },

  getByEmail: async (userEmail) => {
    return new Promise((resolve, reject) => {
      db.get(USER_QUERIES.GET_BY_EMAIL, [userEmail], function (error, row) {
        if (error) return reject(new CustomError(DAO.FAILED.GET.BY_EMAIL('users', error), STATUS_CODE.SERVER_ERROR));

        return resolve(row);
      });
    });
  },
};

module.exports = userDao;
