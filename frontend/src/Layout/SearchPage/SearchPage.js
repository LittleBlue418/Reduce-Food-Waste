import React, { useState, useEffect } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

import TipBox from '../../components/UI/TipBox/TipBox';
import SearchFilters from '../../components/Search/SearchFilters/SearchFilters';
import SearchBox from '../../components/Search/SearchBox/SearchBox';
import IngredientsChips from '../../components/Search/IngredientsChips/IngredientsChips';
import RecipeCards from '../../components/RecipeCards/RecipeCards';

import APIClient from '../../apiClient';


const SearchPage = ({
  selectedIngredients,
  setSelectedIngredients,
  dietaryFilters,
  setDietaryFilters
}) => {

  const [API] = useState (new APIClient())
  const [allIngredients, setAllIngredients] = useState ([])
  const [recipes, setRecipes] = useState ([])
  const [loading, setLoading] = useState (true)
  const [currentPage, setCurrentPage] = useState (1)
  const [totalPages, setTotalPages] = useState (0)


  useEffect(() => {
    API.list_ingredients().then(ingredients => {
      setAllIngredients(ingredients)
    })
  }, [API])

  useEffect(() => {
    setLoading(true)

    const allogens = Object.entries(dietaryFilters)
                      .filter((alogen) => alogen[1])
                      .map((allogen) => allogen[0])

    const ingredient_ids = selectedIngredients.map(ingredient => ingredient._id)


    const searchBody = {
      "ingredient_ids": ingredient_ids,
      "allergens" : allogens
    }

    API.search_recipes(searchBody, currentPage).then(result => {
      setCurrentPage(result.current_page)
      setTotalPages(result.total_pages)
      setRecipes(result.recipes)
      setLoading(false)
    })

  }, [API, selectedIngredients, dietaryFilters, currentPage])

  const toggleAlogen = (tag) => {
    const searchParams = {...dietaryFilters}
    searchParams[tag] = !searchParams[tag]
    setDietaryFilters(searchParams)
  }

    return (
      <div>
        <TipBox />

        <SearchFilters
            alogenFilters={dietaryFilters}
            toggleAlogen={toggleAlogen}
        />
        <SearchBox
            ingredients={allIngredients}
            selectedIngredients={selectedIngredients}
            setSelectedIngredients={setSelectedIngredients}
        />

        <IngredientsChips
            selectedIngredients={selectedIngredients}
            setSelectedIngredients={setSelectedIngredients}
        />

        {
          loading && (
            <CircularProgress />
          )
        }

        <RecipeCards
          recipes={recipes}
        />
      </div>
    );
}

export default SearchPage;