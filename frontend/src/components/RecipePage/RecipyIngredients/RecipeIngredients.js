import React from 'react';
import classes from './RecipeIngredients.module.css'

const RecipeIngredients = ({ingredients}) => {
  return (
    <div>
      <div>
        {ingredients.map((ingredient_entry) => {
          const {amount, unit, ingredient:{name, _id}} = ingredient_entry
          return (
          <div
            key={_id}
            className={classes.RecipeIngredientDiv}>
              <div className={classes.name}>
                {name}
              </div >
              <div className={classes.amount}>
                {amount}
              </div>
              <div className={classes.unit}>
                {unit}
              </div>
          </div>
          )
        })}

      </div>
    </div>
  );
};

export default RecipeIngredients;