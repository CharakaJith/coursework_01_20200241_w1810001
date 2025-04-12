const logger = require('../../middlewares/log/logger');
const CustomError = require('../../util/customError');
const restCountriesService = require('../restCountries.service');
const countryDao = require('../../repositories/v1/country.dao');
const currencyDao = require('../../repositories/v1/currency.dao');
const field_validator = require('../../util/field_validator');
const { STATUS_CODE, CACHE } = require('../../constants/app.constants');
const { LOG_TYPE } = require('../../constants/logger.constants');
const { RESPONSE } = require('../../common/messages');

const countryService = {
  fetchAllCountries: async (data) => {
    // check if country data are recent
    const existingCountries = await getAllRecentCountries();
    if (existingCountries.length > 0) {
      return {
        success: true,
        status: STATUS_CODE.OK,
        data: {
          countries: existingCountries,
        },
      };
    }

    // fetch countries from the rest countries
    const restCountries = await restCountriesService.getAll();

    // clear old countries and save fresh
    await countryDao.delete();
    const newCountries = restCountries.map((country) => {
      // extract currency data
      const currencyKey = country.currencies ? Object.keys(country.currencies)[0] : null;
      const currencyData = currencyKey ? country.currencies[currencyKey] : null;

      return {
        officialName: country.name ? country.name.official : null,
        commonName: country.name ? country.name.common : null,
        capital: country.capital ? country.capital[0] : null,
        currency: {
          name: currencyData ? currencyData.name : null,
          code: currencyKey,
          symbol: currencyData ? currencyData.symbol : null,
        },
        languages: country.languages ? country.languages : null,
        flagUrl: country.flags ? country.flags.svg : null,
      };
    });
    await saveCountries(newCountries);

    // get country details
    const countries = await getAllRecentCountries();

    return {
      success: true,
      status: STATUS_CODE.OK,
      data: {
        countries: countries,
      },
    };
  },

  fetchCountryById: async (countryId) => {
    // validate country id
    const errorArray = [];
    errorArray.push(await field_validator.validate_number(countryId, 'id'));

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

    // fetch country
    const country = await countryDao.getById(countryId);
    if (!country) {
      throw new CustomError(RESPONSE.COUNTRY.INVALID, STATUS_CODE.NOT_FOUND);
    }

    return {
      success: true,
      status: STATUS_CODE.OK,
      data: {
        country: country,
      },
    };
  },
};

async function getAllRecentCountries() {
  // get date ranges
  const now = new Date();
  const lastUpdated = new Date();
  lastUpdated.setHours(now.getHours() - CACHE.DURATION_HOURS);

  // get countries and parse language JSON
  const countries = await countryDao.getRecent(now, lastUpdated);
  for (let country of countries) {
    country.languages = JSON.parse(country.languages);
  }

  return countries;
}

async function saveCountries(countries) {
  for (const country of countries) {
    // extract currency data
    const currencyCode = country.currency ? country.currency.code : null;
    const currencyData = country.currency;

    if (!currencyCode || !currencyData) {
      continue;
    }

    // check currency
    let currency = await currencyDao.getByCode(currencyCode);
    if (!currency) {
      // create new currency
      const currencyDetails = {
        name: currencyData.name,
        code: currencyCode,
        symbol: currencyData.symbol,
      };
      currency = await currencyDao.insert(currencyDetails);
    }

    // create country
    const countryDetails = {
      officialName: country.officialName,
      commonName: country.commonName,
      capital: country.capital,
      currencyId: currency.id,
      languages: JSON.stringify(country.languages),
      flagUrl: country.flagUrl,
    };
    await countryDao.insert(countryDetails);
  }
}

module.exports = countryService;
