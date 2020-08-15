const express = require('express');
const collectionsController = require('../controllers/collections-controller');
const collectionsRouter = express.Router();
const authHelpers = require('../services/auth/auth-helpers');

collectionsRouter.get('/', authHelpers.loginRequired, collectionsController.index);
collectionsRouter.get('/:id', collectionsController.show);

collectionsRouter.post('/', authHelpers.loginRequired, collectionsController.create);


module.exports = collectionsRouter;