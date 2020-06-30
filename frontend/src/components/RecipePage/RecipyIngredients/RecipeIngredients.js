import React from 'react'
import RecipeIngredient from './RecipeIngredient/RecipeIngredient'
import classes from './RecipeIngredients.module.css'

const RecipeIngredients = ({ ingredients }) => {
  return (
    <div className={classes.AllIngredientsDiv}>
      {ingredients.map((ingredient_entry) => {
        return (
          <RecipeIngredient
            key={ingredient_entry.ingredient._id}
            ingredient_entry={ingredient_entry}
          />
        )
      })}
    </div>
  )
}

export default RecipeIngredients