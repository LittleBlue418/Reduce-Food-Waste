import React, { useState, useEffect, useContext } from 'react'
import classes from './SearchPage.module.css'

import CircularProgress from '@material-ui/core/CircularProgress'
import Pagination from '@material-ui/lab/Pagination'

import { APIContext } from '../../context/APIContext'
import TipBox from './TipBox/TipBox'
import SearchFilters from './SearchFilters/SearchFilters'
import SearchBox from './SearchBox/SearchBox'
import IngredientsChips from './IngredientsChips/IngredientsChips'
import RecipeCards from './RecipeCards/RecipeCards'


const SearchPage = ({
  selectedIngredients,
  setSelectedIngredients,
  dietaryRequirements,
  setDietaryRequirements
}) => {

  const API = useContext(APIContext)
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

    const dietaryRequirementsAsArray = Object.entries(dietaryRequirements)
      .filter((dietaryRequirement) => dietaryRequirement[1])
      .map((dietaryRequirement) => dietaryRequirement[0])

    const ingredient_ids = selectedIngredients.map(ingredient => ingredient._id)


    const searchBody = {
      "ingredient_ids": ingredient_ids,
      "dietary_requirements" : dietaryRequirementsAsArray
    }

    API.search_recipes(searchBody, currentPage).then(result => {
      setCurrentPage(result.current_page)
      setTotalPages(result.total_pages)
      setRecipes(result.recipes)
      setLoading(false)
    })

  }, [API, selectedIngredients, dietaryRequirements, currentPage])

  const toggleDietaryRequirement = (tag) => {
    const searchParams = {...dietaryRequirements}
    searchParams[tag] = !searchParams[tag]
    setDietaryRequirements(searchParams)
    setCurrentPage(1)
  }

  const updateSelectedIngredients = (newSelectedIngredients) => {
    setSelectedIngredients(newSelectedIngredients)
    setCurrentPage(1)
  }

  return (
    <div>
      <TipBox />

      <SearchFilters
        dietaryRequirements={dietaryRequirements}
        toggleDietaryRequirement={toggleDietaryRequirement}
      />
      <SearchBox
        ingredients={allIngredients}
        selectedIngredients={selectedIngredients}
        setSelectedIngredients={updateSelectedIngredients}
      />

      <IngredientsChips
        selectedIngredients={selectedIngredients}
        setSelectedIngredients={updateSelectedIngredients}
      />

      {
        loading && (
          <CircularProgress />
        )
      }

      <RecipeCards
        recipes={recipes}
      />

      <div className={classes.PaginationDiv}>
        <Pagination
          color="primary"
          count={totalPages}
          page={currentPage}
          variant="outlined"
          siblingCount={0}
          boundaryCount={1}
          onChange={(event, page) => {
            setCurrentPage(page)
            window.scrollTo(0, 0)
          }}
        />
      </div>

    </div>
  )
}

export default SearchPage