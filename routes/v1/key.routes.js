const express = require('express');
const authenticate = require('../../middlewares/auth/authenticate');
const keyController = require('../../controllers/v1/key.controller');

const keyRouter = express.Router();
keyRouter.use(authenticate);

keyRouter.post('/', keyController.generate);

module.exports = keyRouter;
