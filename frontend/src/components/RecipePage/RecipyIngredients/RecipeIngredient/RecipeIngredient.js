import React, { useState } from 'react';
import classes from './RecipeIngredient.module.css'

const RecipeIngredients = ({ ingredient_entry }) => {
  const [clicked, toggleClicked] = useState (false)
  const { amount, unit, ingredient: { name } } = ingredient_entry

  let ingredientClass

  if (clicked) {
    ingredientClass = classes.methodStepToggled
  } else {
    ingredientClass = classes.methodStep
  }

  return (
          <div className={ingredientClass}>
            <input type="checkbox"
                className={classes.checkbox}
                checked={clicked}
                onChange={() => toggleClicked(
                clicked => !clicked
                )}/>

            <div className={classes.amount}>
              {amount}
            </div>
            <div className={classes.unit}>
              {unit}
            </div>
            <div className={classes.name}>
              {name}
            </div >
          </div>
        )
};

export default RecipeIngredients;