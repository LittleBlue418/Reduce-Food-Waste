import React, { useState, useEffect } from 'react';
import classes from './AddRecipePage.module.css';

import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import ImageUploader from './ImageUploader/ImageUploader';

import APIClient from '../../apiClient';
import { capitalize } from '../../utilityFunctions';

const AddRecipePage = () => {
  const [API] = useState(new APIClient())
  const [allIngredients, setAllIngredients] = useState([])
  const [inputValue, setInputValue] = useState ("")
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    description: "",
    image: "",
    method: [],
    ingredients: [],
  })

  useEffect(() => {
    API.list_ingredients().then(ingredients => {
      setAllIngredients(ingredients)
    })
  }, [API])


  const usedIngredients = newRecipe.ingredients.map(ingredient => ingredient.ingredient)

  const setName = (name) => setNewRecipe({ ...newRecipe, name: name });
  const setDescription = (description) => setNewRecipe({ ...newRecipe, description: description });
  const setImage = (image) => setNewRecipe({ ...newRecipe, image: image });

  const addMethodStep = () => {
    newRecipe.method.push("")
    setNewRecipe({ ...newRecipe })
  }

  const updateMethodStep = (step, index) => {
    newRecipe.method[index] = step
    setNewRecipe({ ...newRecipe })
  }

  const addIngredientEntry = (ingredient) => {
    newRecipe.ingredients.push({
      ingredient:ingredient,
      amount: "",
      unit: ""
    })
    setNewRecipe({ ...newRecipe })
  }

  const addIngredientAmount = (amount, index) => {
    newRecipe.ingredients[index].amount = amount
    setNewRecipe({ ...newRecipe})
  }

  const addIngredientUnit = (unit, index) => {
    newRecipe.ingredients[index].unit = unit
    setNewRecipe({ ...newRecipe})
  }

  const saveToDatabase = () => {
    API.create_recipe(newRecipe).then(() => {
      console.log('saved')
      setNewRecipe({
        name: "",
        description: "",
        image: "",
        method: [],
        ingredients: [],
      })
    }).catch((error) => {
      console.log(error)
    })
  }


  return (
    <div className={classes.AddRecipePage}>

      <TextField label="Recipe Name" value={newRecipe.name} onChange={(e) => setName(e.target.value)} />
      <TextField label="Brief Description" value={newRecipe.description} onChange={(e) => setDescription(e.target.value)} />
      <ImageUploader setImage={setImage}/>

      <br></br>

      {newRecipe.method.map((step, index) => (
        <TextField key={"method" +index} label={"Method Step " + index} value={step} onChange={(e) => updateMethodStep(e.target.value, index)} />
      ))}

      <br></br>

      <IconButton aria-label="delete" onClick={addMethodStep}>
        <AddCircleOutlineIcon />
      </IconButton>

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
        onChange={(event, ingredient, reason) => {
          addIngredientEntry(ingredient)
        }}
        getOptionLabel={(option) => capitalize(option.name)}
        className={classes.SearchBox}
        renderInput={(params) => <TextField {...params} label="Select Ingredient" variant="outlined" />}
      />

      {newRecipe.ingredients.map((ingredientEntry, index) => (
        <div key={"ingredient" +index}>
          <span>{ingredientEntry.ingredient.name}</span>
          <TextField  label="Amount"
                  value={ingredientEntry.amount}
                  onChange={(e) => addIngredientAmount(e.target.value, index)}
          />
          <TextField  label="Unit"
                  value={ingredientEntry.unit}
                  onChange={(e) => addIngredientUnit(e.target.value, index)}
          />

        </div>
      ))}

      <Button variant="outlined" color="primary" onClick={saveToDatabase}>
        Save Recipe
      </Button>

    </div>
  );
};

export default AddRecipePage;