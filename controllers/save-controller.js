const Collection = require('../models/Collection');
const Save = require('../models/Save');
const cocktailFetcher = require('../lib/cocktailFetcher');
const cf = new cocktailFetcher();

const SaveController ={
  create(req, res, next) {
    const {collectionId, cocktailId} = req.query;
    new Save({
      collectionId,
      cocktailId,
    })
    .save()
    .then(() => {
      res.redirect(`/recipe/${cocktailId}`);
    })
    .catch((err) => next(err));
  },

  show(req, res, next) {
    cf.getCocktailById(req.params.id).then((cocktail) => {
      if (!cocktail) {
        res.redirect('/404')
      }
      Collection.getByUserIdAndDrinkId(req.user.id, cocktail.id).then((collections) => {
        console.log(collections)
        const locals = {
          title: 'Recipe',
          pageName: 'recipe',
          cocktail,
          collections,
          isLoggedIn: !!req.user
        };
        res.render('layouts/full-page', locals);
      })
    })
  },

  delete(req, res, next) {
    const { cocktailId, collectionId } = req.query;
    Save.getByCollectionIdAndCocktailId(collectionId, cocktailId)
    .then((save) => {
      return save.delete();
    })
    .then(() => {
      res.redirect(`/collections/${collectionId}`);
    })
    .catch((err) => next(err));
  }
}
module.exports = SaveController