const Collections = require('../models/Collection');
const Save = require('../models/Save');
const cocktailFetcher = require('../lib/cocktailFetcher');
const cf = new cocktailFetcher();

const CollectionsController ={
  index(req, res, next) {
    Collections.getAll(req.user.id).then((collections) => {
      const locals = {
        title: 'All Collections',
        pageName: 'all-collections',
        collections,
        isLoggedIn: !!req.user
      };
      res.render('layouts/full-page', locals);
    })
  },

  show(req, res, next) {
    Collections.getById(req.params.id).then((collection) => {
      Save.getAll(collection.id).then((saves) => {
        const cocktailsIds = saves.map(save => save.cocktailId);
        cf.getCocktailsByIds(cocktailsIds).then((cocktails) => {
          const locals = {
            title: 'Collection',
            pageName: 'single-collection',
            id: req.params.id,
            collection,
            cocktails,
            isLoggedIn: !!req.user
          };
          res.render('layouts/full-page', locals);
        });
      })
    })
  },

  create(req, res, next) {
    new Collections({
      user_id: req.user.id,
      name: req.body.name,
    })
    .save()
    .then(() => {
      res.redirect(`/collections`);
    })
    .catch((err) => next(err));
  },

  update(req, res, next) {
    Collections.getById(req.params.id)
    .then((collection) => {
      return collection.update(req.body);
    })
    .then((updatedCollection) => {
      res.redirect(`collections`);
    })
    .catch((err) => next(err));
  },

  delete(req, res, next) {
    console.log(req.query)
    Collections.getById(req.query.collectionId)
    .then((collection) => {
      return collection.delete();
    })
    .then(() => {
      res.redirect('/collections');
    })
    .catch((err) => next(err));
  }
};

module.exports = CollectionsController;