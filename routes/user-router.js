const express = require('express');
const userRouter = express.Router();
const usersController = require('../controllers/users-controller');

userRouter.post('/', usersController.create);

module.exports = userRouter;