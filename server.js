const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

const authHelpers = require('./services/auth/auth-helpers');

const cocktailFetcher = require('./lib/cocktailFetcher');
const cf = new cocktailFetcher();

const authRouter = require('./routes/auth-router');
const userRouter = require('./routes/user-router');
const collectionRouter = require('./routes/collection-router');
const recipeRouter = require('./routes/recipe-router');
const saveRouter = require('./routes/save-router');

const app = express();
require('dotenv').config();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.set('views', 'views');
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.get('/', (req, res) => {
  const locals = {
    title: 'Main',
    pageName: 'main',
    isLoggedIn: !!req.user,
  };
  res.render('layouts/full-page', locals);
});

app.get('/about', (req, res) => {
  const locals = {
    title: 'About',
    pageName: 'about',
  };
  res.render('layouts/full-page', locals);
});

app.get('/search', authHelpers.loginRequired, (req, res) => {
  const locals = {
    title: 'Search',
    pageName: 'search',
  };
  res.render('layouts/full-page', locals);
});

app.get('/results', (req, res) => {
  const { s } = req.query;
  cf.searchCocktailsByName(s).then(cocktails => {
    const locals = {
      title: 'Results',
      pageName: 'results',
      cocktails,
    };
    res.render('layouts/full-page', locals);
  })
});

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/collections', collectionRouter);
app.use('/recipe', recipeRouter);
app.use('/save', saveRouter);

app.use('*', (req, res) => {
  const locals = {
    title: '404 Not Found',
    pageName: '404',
  };
  res.status(404).render('layouts/404-page', locals);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

