import React, { useState, useEffect, useContext } from 'react';
import classes from './RecipePage.module.css';

import CircularProgress from '@material-ui/core/CircularProgress';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EditIcon from '@material-ui/icons/Edit';
import { useParams, Link } from "react-router-dom";

import { APIContext } from '../../context/APIContext';
import RecipeHeader from './ReceipeHeader/RecipeHeader';
import RecipeIngrdients from './RecipyIngredients/RecipeIngredients';
import RecipeMethod from './Recipemethod/RecipeMethod';


const RecipePage = () => {
  const API = useContext(APIContext)
  const [recipe, setRecipe] = useState(null)
  const { recipe_id } = useParams();

  useEffect(() => {
    API.get_recipe(recipe_id).then((recipe) => {
      setRecipe(recipe)
    })
  }, [recipe_id, API]);

  if (recipe === null) {
    return <CircularProgress />
  }

  return (
    <>
      <div className={classes.ButtonDiv}>
        <Link to="/"><ArrowBackIcon color="primary"/></Link>
        <Link to={`/editRecipe/${recipe_id}`}><EditIcon color="primary"/></Link>
      </div>


      <div className={classes.RecipePage}>
        <RecipeHeader
          name={recipe.name}
          cookTime={recipe.cook_time}
          dietaryRequirements={recipe.dietary_requirements}
        />

        <div className={classes.Line}></div>
            <div><em>{recipe.description}</em></div>
        <div className={classes.Line}></div>

        <div className={classes.middleSection}>
          <RecipeIngrdients
            ingredients={recipe.ingredients}
          />
          <div
              className={classes.RecipePicture}
              style={{
                backgroundImage: 'url(' + recipe.image_url + ')'
              }}
          />

        </div>

        <div className={classes.Line}></div>

        <RecipeMethod
          method={recipe.method}
        />

      </div>
    </>

  );

};

export default RecipePage;