const express = require('express');
const authenticate = require('../../middlewares/auth/authenticate');
const countryController = require('../../controllers/v1/country.controller');

const countryRouter = express.Router();
countryRouter.use(authenticate);

countryRouter.get('/', countryController.fetchAll);
countryRouter.get('/:id', countryController.fetchById);

module.exports = countryRouter;
