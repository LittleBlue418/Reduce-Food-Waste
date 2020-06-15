import axios from 'axios'

export class APIClient {
  constructor() {
    this.http = axios.create()
    this.baseUrl = 'http://localhost:5000'

    this.list_ingredients = this.list_ingredients.bind(this)
    this.create_ingredient = this.create_ingredient.bind(this)
    this.get_ingredient = this.get_ingredient.bind(this)
    this.update_ingredient = this.update_ingredient.bind(this)
    this.delete_ingredients = this.delete_ingredients.bind(this)

    this.search_recipes = this.search_recipes.bind(this)

    this.list_recipes = this.list_recipes.bind(this)
    this.create_recipe = this.create_recipe.bind(this)
    this.get_recipe = this.get_recipe.bind(this)
    this.update_recipe = this.update_recipe.bind(this)
    this.delete_recipe = this.delete_recipe.bind(this)
  }

  //============================================================
  // Ingredients
  //============================================================

  list_ingredients() {
    return this.http.get(this.baseUrl + '/api/ingredients').then(result => result.data.ingredients)
  }

  create_ingredient(ingredient) {
    return this.http.post(this.baseUrl + '/api/ingredients', ingredient).then(result => result.data)
  }

  get_ingredient(ingredient_id) {
    return this.http.get(this.baseUrl + '/api/ingredients/' + ingredient_id).then(result => result.data)
  }

  update_ingredient(ingredient_id, ingredient) {
    return this.http.put(this.baseUrl + '/api/ingredients/' + ingredient_id, ingredient).then(result => result.data)
  }

  delete_ingredients(ingredient_id) {
    return this.http.delete(this.baseUrl + '/api/ingredients/' + ingredient_id).then(result => result.data)
  }

  //============================================================
  // Recipes
  //============================================================

  search_recipes() {
    return this.http.post(this.baseUrl + '/api/recipes/_search').then(result => result.data.recipes)
  }

  list_recipes() {
    return this.http.get(this.baseUrl + '/api/recipes').then(result => result.data.recipes)
  }

  create_recipe(recipe) {
    return this.http.post(this.baseUrl + '/api/recipes', recipe).then(result => result.data)
  }

  get_recipe(recipe_id) {
    return this.http.get(this.baseUrl + '/api/recipes/' + recipe_id).then(result => result.data)
  }

  update_recipe(recipe_id, recipe) {
    return this.http.put(this.baseUrl + '/api/recipes/' + recipe_id, recipe).then(result => result.data)
  }

  delete_recipe(recipe_id) {
    return this.http.delete(this.baseUrl + '/api/recipes/' + recipe_id).then(result => result.data)
  }
}

export default APIClient;