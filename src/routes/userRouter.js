const { Router } = require('express');
const { userController } = require('../controllers');

const userRouter = Router();

userRouter.get('/', userController.getUsers);
userRouter.get('/info', userController.getUser);
userRouter.patch('/info', userController.patchUser);

module.exports = userRouter;
