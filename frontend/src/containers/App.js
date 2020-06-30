import React, { useState } from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

import Layout from '../Layout/Layout'
import SearchPage from '../components/SearchPage/SearchPage'
import RecipePage from '../components/RecipePage/RecipePage'
import AddRecipePage from '../components/AddRecipePage/AddRecipePage'
import EditRecipePage from '../components/EditRecipePage/EditRecipePage'
import AboutThisSite from '../components/AboutThisSite/AboutThisSite'

// MateriaUI bug: https://github.com/mui-org/material-ui/issues/13394
import { ThemeProvider, unstable_createMuiStrictModeTheme as createMuiTheme, } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#006400',
    },
    secondary: {
      main: '#7e57c2'
    },
  },
})

const App = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([])
  const [dietaryRequirements, setDietaryRequirements] = useState({
    vegan: false,
    vegetarian: false,
    gluten_free: false,
    lactose_free: false,
    nut_free: false,
    egg_free: false
  })

  return (
    <ThemeProvider theme={theme}>
      <Router>

        <div className="App" >

          <Layout />

          <Switch>

            <Route path="/recipe/:recipe_id">
              <RecipePage />
            </Route>

            <Route path="/addRecipe">
              <AddRecipePage />
            </Route>

            <Route path="/aboutThisSite">
              <AboutThisSite />
            </Route>

            <Route path="/editRecipe/:recipe_id">
              <EditRecipePage />
            </Route>

            <Route path="/">
              <SearchPage
                selectedIngredients={selectedIngredients}
                setSelectedIngredients={setSelectedIngredients}
                dietaryRequirements={dietaryRequirements}
                setDietaryRequirements={setDietaryRequirements}
              />
            </Route>



          </Switch>

        </div>

      </Router>
    </ThemeProvider>
  )
}

export default App
