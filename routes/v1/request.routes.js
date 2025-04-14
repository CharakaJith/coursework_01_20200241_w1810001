const express = require('express');
const authenticate = require('../../middlewares/auth/authenticate');
const requestController = require('../../controllers/v1/request.controller');

const requestRouter = express.Router();
requestRouter.use(authenticate);

requestRouter.get('/', requestController.getAll);

module.exports = requestRouter;
