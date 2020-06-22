import React, { useState } from 'react';
import classes from './RecipeIngredient.module.css'

const RecipeIngredients = ({ ingredient_entry }) => {
  const [clicked, toggleClicked] = useState (false)
  const { amount, unit, ingredient: { name, _id } } = ingredient_entry

  let stepClass

  if (clicked) {
      stepClass = classes.methodStepToggled
  } else {
      stepClass = classes.methodStep
  }

  return (
          <div
            key={_id}
            className={stepClass}>
            <input type="checkbox"
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