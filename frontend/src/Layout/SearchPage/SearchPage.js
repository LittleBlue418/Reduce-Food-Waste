import React, { useState, useEffect } from 'react';

import TipBox from '../../components/UI/TipBox/TipBox';
import SearchFilters from '../../components/Search/SearchFilters/SearchFilters';
import SearchBox from '../../components/Search/SearchBox/SearchBox';
import IngredientsChips from '../../components/Search/IngredientsChips/IngredientsChips';
import RecipeCards from '../../components/RecipeCards/RecipeCards';

import APIClient from '../../apiClient';


// On a click of the allergie info OR selection from the ingredients add to 'search'
// search request on the get ingredients API
// return matching recipes & update the search list


const SearchPage = () => {
  const [API] = useState (new APIClient())
  const [ingredients, setIngredients] = useState ([])
  const [recipes, setRecipes] = useState ([])

  const [selectedIngredients, setSelectedIngredients] = useState([])
  const [alogenFilters, setAlogenFilters] = useState ({
                            vegan: false,
                            vegetarian: false,
                            gluten_free: false,
                            nut_free: false,
                            egg_free: false
                          })


  useEffect(() => {
    API.list_recipes().then(recipes => {
      setRecipes(recipes)
    })
    API.list_ingredients().then(ingredients => {
      setIngredients(ingredients)
    })
  }, [API])

  useEffect(() => {
    const allogens = []

    for (let [key, value] of Object.entries(alogenFilters)) {
      if (value === true) {
        allogens.push(key)
      }
    }

    const ingredient_ids = []

    for (let [key, value] of Object.entries(selectedIngredients)) {
      ingredient_ids.push(value._id)
    }

    const searchBody = {
      "ingredient_ids": ingredient_ids,
      "allergens" : allogens
    }

  }, [selectedIngredients, alogenFilters])

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
            selectedIngredients={selectedIngredients}
            setSelectedIngredients={setSelectedIngredients}
        />

        <RecipeCards
          recipes={recipes}
        />
      </div>
    );
}

export default SearchPage;