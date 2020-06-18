import React, { useState, useEffect } from 'react';
import {  useParams } from "react-router-dom";

import classes from './RecipePage.module.css';

import RecipeHeader from './ReceipeHeader/RecipeHeader';
import RecipeIngrdients from './RecipyIngredients/RecipeIngredients';
import RecipeMethod from './Recipemethod/RecipeMethod';
import APIClient from '../../apiClient';


const RecipePage = () => {
  const [recipe, setRecipe] = useState (null)
  const [API] = useState (new APIClient())
  const { recipe_id } = useParams();

  useEffect(() => {
    API.get_recipe(recipe_id).then((recipe) => {
      setRecipe(recipe)
    })
  }, [recipe_id, API]);

    if (recipe === null) {
      return <p>Loading...</p>
    }

    return (
    <div className={classes.RecipePage}>
      <RecipeHeader
        name={recipe.name}
        allergies={recipe.allergies}
      />

      <div className={classes.Line}></div>

      <div className={classes.middleSection}>
        <RecipeIngrdients
          ingredients={recipe.ingredients}
        />
        <div className={classes.PictureDiv}>
          <div
            className={classes.RecipePicture}
            style={{
              backgroundImage: 'url(' + recipe.image_url + ')'
            }}
          />
        </div>
      </div>

      <div className={classes.Line}></div>

      <RecipeMethod
        method={recipe.method}
      />

    </div>
  );

};

export default RecipePage;