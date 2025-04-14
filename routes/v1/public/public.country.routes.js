const express = require('express');
const validateAPIKey = require('../../../middlewares/auth/validateApiKey');
const publicCountryController = require('../../../controllers/v1/public.country.controller');

const publicCountryRouter = express.Router();
publicCountryRouter.use(validateAPIKey);

publicCountryRouter.get('/', publicCountryController.fetchAll);
publicCountryRouter.get('/:id', publicCountryController.fetchById);

module.exports = publicCountryRouter;
