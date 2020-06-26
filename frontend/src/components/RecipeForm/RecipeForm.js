import React, { useState, useEffect, useContext } from 'react';
import classes from './RecipeForm.module.css';

import { APIContext } from '../../context/APIContext';
import AddIngredientDialog from './AddIngredientDialog/AddIngredientDialog';
import ImageUploader from './ImageUploader/ImageUploader';
import IngredientAutocomplete from './IngredientAutocomplete/IngredientAutocomplete';
import IngredientEntry from './IngredientEntry/IngredientEntry';
import MethodStep from './MethodStep/MethodStep';
import TitleSection from './TitleSection/TitleSection';

import Button from '@material-ui/core/Button';



const RecipeForm = ({ recipe, setRecipe, previewImage, setPreviewImage }) => {
  const API = useContext(APIContext)
  const [allIngredients, setAllIngredients] = useState([])
  const [inputValue, setInputValue] = useState("")
  const [openIngredientDialog, setOpenIngredientDialog] = useState(false)

  useEffect(() => {
    API.list_ingredients().then(ingredients => {
      setAllIngredients(ingredients)
    })
  }, [API])

  const usedIngredients = recipe.ingredients.map(ingredient => ingredient.ingredient)

  const setName = (name) => setRecipe({ ...recipe, name: name });
  const setDescription = (description) => setRecipe({ ...recipe, description: description });
  const setImage = (image_data, image_content_type) => setRecipe({
    ...recipe,
    image_data: image_data,
    image_content_type: image_content_type
  });

  const addMethodStep = () => {
    recipe.method.push("")
    setRecipe({ ...recipe })
  }

  const updateMethodStep = (step, index) => {
    recipe.method[index] = step
    setRecipe({ ...recipe })
  }

  const removeMethodStep = (index) => {
    recipe.method.splice(index, 1)
    setRecipe({ ...recipe })
  }

  const addIngredientEntry = (ingredient) => {
    recipe.ingredients.push({
      ingredient: ingredient,
      amount: "",
      unit: ""
    })
    setRecipe({ ...recipe })
  }

  const removeIngredientEntry = (index) => {
    recipe.ingredients.splice(index, 1)
    setRecipe({ ...recipe })
  }

  const addIngredientAmount = (amount, index) => {
    recipe.ingredients[index].amount = amount
    setRecipe({ ...recipe })
  }

  const addIngredientUnit = (unit, index) => {
    recipe.ingredients[index].unit = unit
    setRecipe({ ...recipe })
  }

  const onAddNewIngredient = (newIngredient) => {
    const updatedAllIngredients = [...allIngredients, newIngredient]
    updatedAllIngredients.sort((a, b) => a.name.localeCompare(b.name))
    setAllIngredients(updatedAllIngredients)
    addIngredientEntry(newIngredient)
  }




  return (
    <>

      <AddIngredientDialog
        open={openIngredientDialog}
        setOpen={setOpenIngredientDialog}
        onCreated={onAddNewIngredient}
      />


      <TitleSection
          nameValue={recipe.name}
          descriptionValue={recipe.description}
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

      {recipe.ingredients.map((ingredientEntry, index) => (
        <IngredientEntry
          key={"ingredient" + index}
          index={index}
          ingredientEntry={ingredientEntry}
          addIngredientAmount={addIngredientAmount}
          addIngredientUnit={addIngredientUnit}
          removeIngredientEntry={removeIngredientEntry}
        />
      ))}

      <IngredientAutocomplete
          allIngredients={allIngredients}
          usedIngredients={usedIngredients}
          inputValue={inputValue}
          setInputValue={setInputValue}
          addIngredientEntry={addIngredientEntry}
      />

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

      {recipe.method.map((step, index) => (
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

    </>
  );
};

export default RecipeForm;