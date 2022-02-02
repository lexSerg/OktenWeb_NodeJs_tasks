const { Router } = require('express');
const userController = require('../controllers/user.controller')

const userRouter = Router();
userRouter.get('/', userController.getUsers);

module.exports = userRouter