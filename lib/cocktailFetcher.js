const axios = require('axios');

class cocktailFetcher {
  getCocktailUrl = (id) => `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  formatDrinkData = (d) => {
    const drink = {
      id: d.idDrink,
      name: d.strDrink,
      category: d.strCategory,
      tags: d.strTags.split(','),
      instructions: d.strInstructions,
      image: d.strDrinkThumb,
      glassType: d.strGlass,
    };

    
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

  fetchCocktail(id) {
    return axios.get(this.getCocktailUrl(id))
    .then(response => response.data.drinks[0])
    .then(drinkData => this.formatDrinkData(drinkData))
    .catch(() => {})
  }
}

module.exports = cocktailFetcher;
