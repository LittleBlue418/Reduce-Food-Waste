import React from 'react';
import classes from './RecipePage.module.css';

import RecipeHeader from './ReceipeHeader/RecipeHeader';
import RecipeIngrdients from './RecipyIngredients/RecipeIngredients';
import RecipeMethod from './Recipemethod/RecipeMethod';

const RecipePage = () => {
  return (
    <div className={classes.RecipePage}>
      <RecipeHeader />
      <div className={classes.middleSection}>
        <RecipeIngrdients />
        <div className={classes.PictureDiv}>
          <div className={classes.RecipePicture}/>
        </div>
      </div>
      <RecipeMethod />

    </div>
  );
};

export default RecipePage;