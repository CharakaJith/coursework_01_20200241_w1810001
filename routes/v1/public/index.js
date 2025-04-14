const express = require('express');
const publicRoutesV1 = express.Router();
const publicCountryRouter = require('./public.country.routes');

publicRoutesV1.use('/country', publicCountryRouter);

module.exports = publicRoutesV1;
