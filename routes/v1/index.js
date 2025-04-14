const express = require('express');
const routesV1 = express.Router();
const userRouter = require('./user.routes');
const countryRouter = require('./country.routes');
const keyRouter = require('./key.routes');

const publicRoutesV1 = require('./public/index');

routesV1.use('/user', userRouter);
routesV1.use('/country', countryRouter);
routesV1.use('/key', keyRouter);
routesV1.use('/public', publicRoutesV1);

module.exports = routesV1;
