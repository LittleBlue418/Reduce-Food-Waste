import React, { useState, useEffect } from 'react';

import TipBox from '../../components/UI/TipBox/TipBox';
import SearchFilters from '../../components/Search/SearchFilters/SearchFilters';
import SearchBox from '../../components/Search/SearchBox/SearchBox';
import IngredientsChips from '../../components/Search/IngredientsChips/IngredientsChips';
import RecipeCards from '../../components/RecipeCards/RecipeCards';

import APIClient from '../../apiClient';


// get ingredients from API ingredients endpoint
// pass ingredients to the search bar
// On a click of the allergie info OR selection from the ingredients add to 'search'
// search request on the get ingredients API
// return matching recipes & update the search list


const SearchPage = () => {
  const [API] = useState (new APIClient())
  const [selectedIngredients, setSelectedIngredients] = useState([])

  const [ingredients, setIngredients] = useState ([])
  const [alogenFilters, setAlogenFilters] = useState ({
                            vegan: false,
                            vegetarian: false,
                            gluten_free: false,
                            nut_free: false,
                            egg_free: false})
  const [recipes, setRecipes] = useState ([])
  const [search, setSearch] = useState({
    "ingredient_ids": [],
    "allergens":[]
  })


  useEffect(() => {
    API.list_recipes().then(recipes => {
      setRecipes(recipes)
    })
    API.list_ingredients().then(ingredients => {
      setIngredients(ingredients)
    })
  }, [API])

  const addSearchIngredient = (event) => {
    const ingredient_name = event.currentTarget.innerHTML
    const ingredient_object = ingredients.ingredient_name

    const searchParams = {...search}
    searchParams["ingredient_ids"].push(event.currentTarget.innerHTML)
    setSearch(searchParams)
    console.log(search)
  }


  const toggleAlogen = (tag) => {
    const searchParams = {...alogenFilters}
    searchParams[tag] = !searchParams[tag]
    setAlogenFilters(searchParams)
  }

    return (
      <div>
        <TipBox />

        <SearchFilters
            alogenFilters={alogenFilters}
            toggleAlogen={toggleAlogen}
        />
        <SearchBox
            ingredients={ingredients}
            selectedIngredients={selectedIngredients}
            setSelectedIngredients={setSelectedIngredients}
        />

        <IngredientsChips
            searchResults={search}
        />

        <RecipeCards
          recipes={recipes}
        />
      </div>
    );
}

export default SearchPage;