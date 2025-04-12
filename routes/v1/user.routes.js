const express = require('express');
const authenticate = require('../../middlewares/auth/authenticate');
const userController = require('../../controllers/v1/user.controller');

const userRouter = express.Router();

userRouter.post('/', userController.signup);
userRouter.post('/login', userController.login);

userRouter.use(authenticate);

userRouter.put('/', userController.update);
userRouter.delete('/', userController.deactivate);

module.exports = userRouter;
