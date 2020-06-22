import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import classes from './RecipePage.module.css';

import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EditIcon from '@material-ui/icons/Edit';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import RecipeHeader from './ReceipeHeader/RecipeHeader';
import RecipeIngrdients from './RecipyIngredients/RecipeIngredients';
import RecipeMethod from './Recipemethod/RecipeMethod';
import APIClient from '../../apiClient';
import Auxiliary from '../../hoc/Auxiliary'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#006400',
    },
  },
});

const RecipePage = () => {
  const [recipe, setRecipe] = useState(null)
  const [API] = useState(new APIClient())
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
    <Auxiliary>
      <div className={classes.ButtonDiv}>
        <ThemeProvider theme={theme}>
          <Button className={classes.ButtonBack} variant="outlined" color="primary">
            <ArrowBackIcon />
          </Button>
          <Button className={classes.ButtonBack} variant="outlined" color="primary">
            <EditIcon />
          </Button>
        </ThemeProvider>
      </div>


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
    </Auxiliary>

  );

};

export default RecipePage;