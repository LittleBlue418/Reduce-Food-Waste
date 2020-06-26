import React from 'react';
import classes from './IngredientAutocomplete.module.css';

import { capitalize } from '../../../utilityFunctions';

import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

const IngredientAutocomplete = ({
  allIngredients,
  usedIngredients,
  inputValue,
  setInputValue,
  addIngredientEntry
}) => {
  return (
    <div className={classes.AutocompleteDiv}>
        <Autocomplete
          options={allIngredients.filter((ingredient) => !usedIngredients.includes(ingredient))}
          inputValue={inputValue}
          onInputChange={(event, inputValue, reason) => {
            if (reason === 'reset') {
              setInputValue("")
            } else {
              setInputValue(inputValue)
            }
          }}
          value={null}
          loading={allIngredients.length === 0}
          onChange={(event, ingredient, reason) => {
            addIngredientEntry(ingredient)
          }}
          getOptionLabel={(option) => capitalize(option.name)}
          className={classes.SearchBox}
          renderInput={(params) => <TextField {...params} label="Select Ingredient" variant="outlined" />}
        />
      </div>
  );
};

export default IngredientAutocomplete;