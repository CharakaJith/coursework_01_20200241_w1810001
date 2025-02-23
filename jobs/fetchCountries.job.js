const cron = require('node-cron');
const models = require('../models');
const logger = require('../middlewares/log/logger');
const { LOG_TYPE } = require('../constants/logger.constants');
const { STATUS_CODE, CACHE } = require('../constants/app.constants');
const { CRON } = require('../common/messages');
const countryDao = require('../repositories/v1/country.dao');

// job runs at every day midnight
cron.schedule('0 0 * * *', async () => {
  try {
    // get date ranges
    const now = new Date();
    const lastUpdated = new Date();
    lastUpdated.setDate(now.getDate() - CACHE.DURATION_DAYS);

    // delete countries
    await countryDao.deleteByDate(lastUpdated);

    logger(LOG_TYPE.INFO, true, STATUS_CODE.CREATED, CRON.SUCCESS);
  } catch (error) {
    logger(LOG_TYPE.ERROR, false, STATUS_CODE.SERVER_ERROR, CRON.FAILED(error));
  }
});
