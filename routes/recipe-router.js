const express = require('express');
const saveController = require('../controllers/save-controller');
const authHelpers = require('../services/auth/auth-helpers');
const recipeRouter = express.Router();

recipeRouter.get('/:id', authHelpers.loginRequired, saveController.show);

module.exports = recipeRouter;