import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Layout from '../Layout/Layout';
import SearchPage from '../Layout/SearchPage/SearchPage';
import RecipePage from '../components/RecipePage/RecipePage';
import AddRecipePage from '../components/AddRecipePage/AddRecipePage';



const App = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([])
  const [dietaryFilters, setDietaryFilters] = useState ({
                            vegan: false,
                            vegetarian: false,
                            gluten_free: false,
                            nut_free: false,
                            egg_free: false
                          })

      return(
        <Router>

          <div className = "App" >

            <Layout />

            <Switch>

              <Route path="/recipe/:recipe_id">
                <RecipePage />
              </Route>

              <Route path="/addRecipe">
                <AddRecipePage />
              </Route>

              <Route path="/">
                <SearchPage
                  selectedIngredients={selectedIngredients}
                  setSelectedIngredients={setSelectedIngredients}
                  dietaryFilters={dietaryFilters}
                  setDietaryFilters={setDietaryFilters}
                />
              </Route>

            </Switch>

          </div>

        </Router>
      );
}

export default App;
