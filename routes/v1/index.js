const express = require('express');
const routesV1 = express.Router();
const userRouter = require('./user.routes');
const countryRouter = require('./country.routes');
const keyRouter = require('./key.routes');

routesV1.use('/user', userRouter);
routesV1.use('/country', countryRouter);
routesV1.use('/key', keyRouter);

module.exports = routesV1;
