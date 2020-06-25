import React, { useState, useEffect } from 'react';
import classes from './SearchPage.module.css';

import CircularProgress from '@material-ui/core/CircularProgress';
import Pagination from '@material-ui/lab/Pagination';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import TipBox from '../../components/UI/TipBox/TipBox';
import SearchFilters from '../../components/Search/SearchFilters/SearchFilters';
import SearchBox from '../../components/Search/SearchBox/SearchBox';
import IngredientsChips from '../../components/Search/IngredientsChips/IngredientsChips';
import RecipeCards from '../../components/RecipeCards/RecipeCards';

import APIClient from '../../apiClient';

const paginationTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#006400',
    },
  },
});


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
            alogenFilters={dietaryFilters}
            toggleAlogen={toggleAlogen}
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
          <ThemeProvider theme={paginationTheme}>
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
          </ThemeProvider>

        </div>

      </div>
    );
}

export default SearchPage;