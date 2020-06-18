import React, { useState, useEffect } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

import TipBox from '../../components/UI/TipBox/TipBox';
import SearchFilters from '../../components/Search/SearchFilters/SearchFilters';
import SearchBox from '../../components/Search/SearchBox/SearchBox';
import IngredientsChips from '../../components/Search/IngredientsChips/IngredientsChips';
import RecipeCards from '../../components/RecipeCards/RecipeCards';

import APIClient from '../../apiClient';


const SearchPage = () => {
  const [API] = useState (new APIClient())
  const [ingredients, setIngredients] = useState ([])
  const [recipes, setRecipes] = useState ([])
  const [loading, setLoading] = useState (true)

  const [selectedIngredients, setSelectedIngredients] = useState([])
  const [alogenFilters, setAlogenFilters] = useState ({
                            vegan: false,
                            vegetarian: false,
                            gluten_free: false,
                            nut_free: false,
                            egg_free: false
                          })


  useEffect(() => {
    API.list_ingredients().then(ingredients => {
      setIngredients(ingredients)
    })
  }, [API])

  useEffect(() => {
    setLoading(true)

    const allogens = Object.entries(alogenFilters)
                      .filter((alogen) => alogen[1])
                      .map((allogen) => allogen[0])

    const ingredient_ids = selectedIngredients.map(ingredient => ingredient._id)


    const searchBody = {
      "ingredient_ids": ingredient_ids,
      "allergens" : allogens
    }

    API.search_recipes(searchBody).then(recipes => {
      setRecipes(recipes)
      setLoading(false)
    })

  }, [API, selectedIngredients, alogenFilters])

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