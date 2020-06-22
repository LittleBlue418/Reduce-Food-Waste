import React from 'react';
import classes from './RecipeIngredients.module.css'
import RecipeIngredient from './RecipeIngredient/RecipeIngredient'

const RecipeIngredients = ({ ingredients }) => {
  return (
    <div className={classes.IngredientsContainerDiv}>
      {ingredients.map((ingredient_entry) => {
        return (
          <RecipeIngredient
            key={ingredient_entry.ingredient._id}
            ingredient_entry={ingredient_entry}
          />
        )
      })}
    </div>
  );
};

export default RecipeIngredients;