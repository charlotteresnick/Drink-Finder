const express = require('express');
const saveController = require('../controllers/save-controller');
const authHelpers = require('../services/auth/auth-helpers');
const saveRouter = express.Router();

saveRouter.get('/', authHelpers.loginRequired, saveController.create);
saveRouter.get('/delete', authHelpers.loginRequired, saveController.delete);

module.exports = saveRouter;