const express = require('express');
const authHelpers = require('../services/auth/auth-helpers');
const passport = require('../services/auth/local');
const authRouter = express.Router();

authRouter.get('/login', authHelpers.loginRedirect, (req, res) => {
  const locals = {
    title: 'Login',
    pageName: 'login',
  };
  res.render('layouts/full-page', locals);
});

authRouter.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  })
);

authRouter.get('/logout', (req, res) => {
  req.logout();
  res.redirect('back');
});

authRouter.get('/register', (req, res) => {
  const locals = {
    title: 'Register',
    pageName: 'register',
  };
  res.render('layouts/full-page', locals);
});

module.exports = authRouter;