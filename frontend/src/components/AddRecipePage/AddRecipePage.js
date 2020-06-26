import React, { useState, useEffect, useContext } from 'react';
import classes from './AddRecipePage.module.css';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import ImageUploader from './ImageUploader/ImageUploader';
import TitleSection from './TitleSection/TitleSection';

import { APIContext } from '../../context/APIContext';
import AddIngredientDialog from './AddIngredientmodal/AddIngredientDialog';
import { capitalize } from '../../utilityFunctions';
import IngredientEntry from './IngredientEntry/IngredientEntry';
import MethodStep from './MethodStep/MethodStep';



const AddRecipePage = () => {
  const API = useContext(APIContext)
  const [allIngredients, setAllIngredients] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [previewImage, setPreviewImage] = useState(null);
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    description: "",
    image_data: "",
    image_content_type: "",
    method: [],
    ingredients: [],
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [sucess, setSucess] = useState(false)
  const [openIngredientDialog, setOpenIngredientDialog] = useState(false)

  useEffect(() => {
    API.list_ingredients().then(ingredients => {
      setAllIngredients(ingredients)
    })
  }, [API])


  const usedIngredients = newRecipe.ingredients.map(ingredient => ingredient.ingredient)

  const setName = (name) => setNewRecipe({ ...newRecipe, name: name });
  const setDescription = (description) => setNewRecipe({ ...newRecipe, description: description });
  const setImage = (image_data, image_content_type) => setNewRecipe({
    ...newRecipe,
    image_data: image_data,
    image_content_type: image_content_type
  });

  const addMethodStep = () => {
    newRecipe.method.push("")
    setNewRecipe({ ...newRecipe })
  }

  const updateMethodStep = (step, index) => {
    newRecipe.method[index] = step
    setNewRecipe({ ...newRecipe })
  }

  const removeMethodStep = (index) => {
    newRecipe.method.splice(index, 1)
    setNewRecipe({ ...newRecipe })
  }

  const addIngredientEntry = (ingredient) => {
    newRecipe.ingredients.push({
      ingredient: ingredient,
      amount: "",
      unit: ""
    })
    setNewRecipe({ ...newRecipe })
  }

  const removeIngredientEntry = (index) => {
    newRecipe.ingredients.splice(index, 1)
    setNewRecipe({ ...newRecipe })
  }

  const addIngredientAmount = (amount, index) => {
    newRecipe.ingredients[index].amount = amount
    setNewRecipe({ ...newRecipe })
  }

  const addIngredientUnit = (unit, index) => {
    newRecipe.ingredients[index].unit = unit
    setNewRecipe({ ...newRecipe })
  }

  const onAddNewIngredient = (newIngredient) => {
    const updatedAllIngredients = [...allIngredients, newIngredient]
    updatedAllIngredients.sort((a, b) => a.name.localeCompare(b.name))
    setAllIngredients(updatedAllIngredients)
    addIngredientEntry(newIngredient)
  }

  const saveToDatabase = () => {
    setLoading(true)
    API.create_recipe(newRecipe).then((response) => {
      console.log('saved')
      setNewRecipe({
        name: "",
        description: "",
        image_data: "",
        image_content_type: "",
        method: [],
        ingredients: [],
      })
      setPreviewImage(null)
      setError(null)
      setSucess(response)
      setLoading(false)
      window.scrollTo(0, 0)
    }).catch((error) => {
      setError(error.response.data.message)
      setLoading(false)
      window.scrollTo(0, 0)
    })
  }


  return (
    <div className={classes.AddRecipePage}>

      <AddIngredientDialog
        open={openIngredientDialog}
        setOpen={setOpenIngredientDialog}
        onCreated={onAddNewIngredient}
      />

      <h2>Add Recipe</h2>

      {error ? <Alert onClose={() => { setError(false) }} severity="error">{error}</Alert> : null}

      {sucess ? <Alert onClose={() => { setSucess(false) }} severity="success">{sucess.name} added!</Alert> : null}

      <TitleSection
          nameValue={newRecipe.name}
          descriptionValue={newRecipe.description}
          setName={setName}
          setDescription={setDescription}
      />


      <div className={classes.ImageUploaderWrapper}>
        <h3>Picture</h3>
        <div className={classes.ImageUploaderDiv}>
          <ImageUploader
            setImage={setImage}
            previewImage={previewImage}
            setPreviewImage={setPreviewImage}
          />
        </div>
      </div>



      <div className={classes.Line}></div>


      <h3>Ingredients</h3>

      {newRecipe.ingredients.map((ingredientEntry, index) => (
        <IngredientEntry
          key={"ingredient" + index}
          index={index}
          ingredientEntry={ingredientEntry}
          addIngredientAmount={addIngredientAmount}
          addIngredientUnit={addIngredientUnit}
          removeIngredientEntry={removeIngredientEntry}
        />
      ))}

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

      <div className={classes.CreateNewIngredientDiv}>
        <p>Can't find the ingredient you are looking for?
          <br />
          <span onClick={() => setOpenIngredientDialog(true)}>
            Create A New Ingredient
          </span>
        </p>
      </div>


      <div className={classes.Line}></div>


      <h3>Method</h3>

      {newRecipe.method.map((step, index) => (
        <MethodStep
          key={"method" + index}
          index={index}
          step={step}
          updateMethodStep={updateMethodStep}
          removeMethodStep={removeMethodStep}
        />
      ))}

      <div className={classes.AddStepButtonDiv}>
        <Button variant="outlined" color="primary" onClick={addMethodStep}>
          Add Step
        </Button>
      </div>



      <div className={classes.Line}></div>


      <div className={classes.SubmitButtonDiv}>
        <Button variant="contained" color="primary" onClick={saveToDatabase}>
          {loading ? <CircularProgress size={24} /> : "Save Recipe"}
        </Button>
      </div>
    </div>
  );
};

export default AddRecipePage;