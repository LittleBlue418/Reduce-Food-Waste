import React from 'react'
import classes from './IngredientEntry.module.css'

import { capitalize } from '../../../utilityFunctions'

import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'

const IngredientEntry = ({
  index,
  ingredientEntry,
  addIngredientAmount,
  addIngredientUnit,
  removeIngredientEntry
}) => {

  return (
    <div className={classes.IngredientEntry} >
      <div>{capitalize(ingredientEntry.ingredient.name)}</div>

      <div className={classes.IngredientFields}>
        <div className={classes.IngredientField}>
          <TextField label="Amount"
            value={ingredientEntry.amount}
            onChange={(e) => addIngredientAmount(e.target.value, index)}
          />
        </div>
        <div className={classes.IngredientField}>
          <TextField label="Unit"
            value={ingredientEntry.unit}
            onChange={(e) => addIngredientUnit(e.target.value, index)}
          />
        </div>
        <IconButton aria-label="delete" onClick={() => removeIngredientEntry(index)}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  )
}

export default IngredientEntry