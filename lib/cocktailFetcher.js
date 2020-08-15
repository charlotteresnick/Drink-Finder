const axios = require('axios');

class cocktailFetcher {
  formatDrinkData = (d) => {
    const drink = {
      id: d.idDrink,
      name: d.strDrink,
      category: d.strCategory,
      instructions: d.strInstructions,
      image: d.strDrinkThumb,
      glassType: d.strGlass,
    };

    if (d.tags) {
      drink.tags = d.strTags.split(',');
    }
    
    drink.ingredients = Array.from(Array(15), (_, i) => i + 1).map(ingredientNumber => {
      let name = d[`strIngredient${ingredientNumber}`]
      let measure = d[`strMeasure${ingredientNumber}`]

      if (name) name = name.trim();
      if (measure) measure = measure.trim();
      return {
        name,
        measure,
      }
    }).filter(ingredient => ingredient.name || ingredient.measure);

    return drink;
  }

  getCocktailById(id) {
    return axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(response => response.data.drinks[0])
    .then(drinkData => this.formatDrinkData(drinkData))
    .catch(() => { console.log("error in getCocktailById") })
  }
  searchCocktailsByName = (name) => {
    return axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
    .then(response => response.data.drinks || [])
    .then(drinks => drinks.map(drink => this.formatDrinkData(drink)))
    .catch(() => { console.log("error in searchCocktailsByName") })
  }
}

module.exports = cocktailFetcher;
