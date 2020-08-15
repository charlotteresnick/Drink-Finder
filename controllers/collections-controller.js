const Collections = require('../models/Collections');
const Collection = require('../models/Collections');

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
    Collection.getById(req.params.id).then((collection) => {
      const locals = {
        title: 'Collection',
        pageName: 'single-collection',
        id: req.params.id,
        collection,
        cocktails: [],
      };
      res.render('layouts/full-page', locals);
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