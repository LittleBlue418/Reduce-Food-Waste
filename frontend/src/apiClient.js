import axios from 'axios'

export class APIClient {
  constructor() {
    this.http = axios.create()
    this.baseUrl = 'http://localhost:5000'

    this.updateImageURL = this.updateImageURL.bind(this)

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

    this.get_image_as_data_url = this.get_image_as_data_url.bind(this)
  }


  // Convert image id to url
  updateImageURL(recipe) {
    recipe['image_url'] = this.baseUrl + '/api/images/' + recipe['image_id']
    return recipe
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

  search_recipes(query, page=1) {
    // Axios query - url, search query (from front), parameters (page number front front)
    return this.http.post(this.baseUrl + '/api/recipes/_search', query, {params: {page:page}}).then(result => {
      const recipeData = result.data
      recipeData.recipes.forEach(this.updateImageURL)
      return recipeData
    })
  }

  list_recipes(page=1) {
    // Axios query - url, parameters (page number front front)
    return this.http.get(this.baseUrl + '/api/recipes', {params: {page:page}}).then(result => {
      const recipeData = result.data
      recipeData.recipes.forEach(this.updateImageURL)
      return recipeData
    })
  }

  create_recipe(recipe) {
    return this.http.post(this.baseUrl + '/api/recipes', recipe).then(result => {
      return this.updateImageURL(result.data)
    })
  }

  get_recipe(recipe_id) {
    return this.http.get(this.baseUrl + '/api/recipes/' + recipe_id).then(result => {
      return this.updateImageURL(result.data)
    })
  }

  update_recipe(recipe_id, recipe) {
    return this.http.put(this.baseUrl + '/api/recipes/' + recipe_id, recipe).then(result => {
      return this.updateImageURL(result.data)
    })
  }

  delete_recipe(recipe_id) {
    return this.http.delete(this.baseUrl + '/api/recipes/' + recipe_id).then(result => result.data)
  }


  //============================================================
  // Images
  //============================================================

  get_image_as_data_url(image_id) {
    return this.http.get(this.baseUrl + '/api/images/' + image_id, {
      responseType: 'arraybuffer'
    }).then((response) => {
      // Constructing the data url for the image preview
      // Opposite from the scale image function in the image uploader where we convert url to data
      const content_type = response.headers["content-type"]
      // Buffer is an object like window
      const data = Buffer.from(response.data, 'binary').toString('base64')

      return `data:${content_type};base64,${data}`
    })
  }

}

export default APIClient;