const Collections = require('../models/Collections');
const SavedDrink = require('../models/Drinks_Save');
const cocktailFetcher = require('../lib/cocktailFetcher');
const cf = new cocktailFetcher();

const CollectionsController ={
  index(req, res, next) {
    Collections.getAll(req.user.id).then((collections) => {
      const locals = {
        title: 'All Collections',
        pageName: 'all-collections',
        collections
      };
      res.render('layouts/full-page', locals);
    })
  },

  show(req, res, next) {
    Collections.getById(req.params.id).then((collection) => {
      SavedDrink.getAll(collection.id).then((drink_saves) => {
        const cocktailsIds = drink_saves.map(drink_save => drink_save.drink_id);
        cf.getCocktailsByIds(cocktailsIds).then((cocktails) => {
          console.log(cocktails)
          const locals = {
            title: 'Collection',
            pageName: 'single-collection',
            id: req.params.id,
            collection,
            cocktails,
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
    Collections.getById(req.params.id)
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