const axios = require('axios');
const CustomError = require('../util/customError');
const { STATUS_CODE, CONNECTION } = require('../constants/app.constants');

const restCountriesService = {
  getAll: async () => {
    try {
      const response = await axios.get(`${process.env.RC_BASE_URL}/all`);

      return response.data;
    } catch (error) {
      const statusCode = getStatusCode(error);

      throw new CustomError(error.message, statusCode);
    }
  },
};

function getStatusCode(error) {
  let statusCode = STATUS_CODE.SERVER_ERROR;

  if (error.response) statusCode = error.response.status;
  else if (error.code === CONNECTION.ABORT) statusCode = STATUS_CODE.TIME_OUT;
  else if (error.code === CONNECTION.NOTFOUND || error.code === CONNECTION.REFUSED) statusCode = STATUS_CODE.BAD_GATEWAY;

  return statusCode;
}

module.exports = restCountriesService;
