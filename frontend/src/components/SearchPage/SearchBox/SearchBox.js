import React, { useState } from 'react'

import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'

import classes from './SearchBox.module.css'
import { capitalize } from '../../../utilityFunctions'

const SearchBox = ({ingredients, selectedIngredients, setSelectedIngredients}) => {
  const [inputValue, setInputValue] = useState ("")

  return (
    <Autocomplete
      options={ingredients.filter((ingredient) => !selectedIngredients.includes(ingredient))}
      inputValue={inputValue}
      onInputChange={(event, value, reason) => {
        if (reason === 'reset') {
          setInputValue("")
        } else {
          setInputValue(value)
        }
      }}
      value={null}
      loading={ingredients.length === 0}
      onChange={(event, value, reason) => {
        setSelectedIngredients((oldValue) => [...oldValue, value])
      }}
      getOptionLabel={(option) => capitalize(option.name)}
      className={classes.SearchBox}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Select Ingredient"
          variant="outlined"
        />
      )}
    />
  )
}


export default SearchBox