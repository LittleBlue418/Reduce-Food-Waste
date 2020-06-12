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
  const [ingredients, appendToIngredients] = useState (["potato", "mayonaise"])
  const [alogenFilters, setAlogenFilters] = useState ({
                            vegan: false,
                            vegetarian: false,
                            gluten_free: false,
                            nut_free: false,
                            egg_free: false})
  const [recipes, setRecipes] = useState ([])


  useEffect(() => {
    API.list_recipes().then(recipes => {
      setRecipes(recipes)
    })
  }, [API])

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
        />
        <IngredientsChips
          ingredients={ingredients}
        />

        <RecipeCards
          recipes={recipes}
        />
      </div>
    );

}

export default SearchPage;