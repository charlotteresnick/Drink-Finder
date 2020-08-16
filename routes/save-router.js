const express = require('express');
const saveController = require('../controllers/save-controller');
const authHelpers = require('../services/auth/auth-helpers');
const saveRouter = express.Router();

saveRouter.get('/', authHelpers.loginRequired, saveController.create);

module.exports = saveRouter;