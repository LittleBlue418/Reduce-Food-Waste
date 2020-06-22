import React, { useState } from 'react';
import classes from './RecipeIngredients.module.css'
import RecipeIngredient from './RecipeIngredient/RecipeIngredient'

const RecipeIngredients = ({ ingredients }) => {
  const [clicked, toggleClicked] = useState (false)

  let stepClass

  if (clicked) {
      stepClass = classes.methodStepToggled
  } else {
      stepClass = classes.methodStep
  }

  return (
    <div className={classes.IngredientsContainerDiv}>
      {ingredients.map((ingredient_entry) => {
        return (
          <RecipeIngredient ingredient_entry={ingredient_entry} />
        )
      })}
    </div>
  );
};

export default RecipeIngredients;