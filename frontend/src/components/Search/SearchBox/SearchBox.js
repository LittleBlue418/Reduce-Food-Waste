import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import classes from './SearchBox.module.css'

const SearchBox = ({ingredients}) => {
  const ingredient_list = []

  ingredients.map((ingredient) => {
    ingredient_list.push({name: ingredient})
  })

  return (
    <Autocomplete
      id="combo-box-demo"
      options={ingredient_list}
      getOptionLabel={(option) => option.name}
      className={classes.SearchBox}
      renderInput={(params) => <TextField {...params} label="Select Ingredient" variant="outlined" />}
    />
  );
};


export default SearchBox;