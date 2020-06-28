import React, { useState, useContext } from 'react';
import classes from './AddRecipePage.module.css';

import { APIContext } from '../../context/APIContext';
import RecipeForm from '../RecipeForm/RecipeForm';

import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';



const AddRecipePage = () => {
  const API = useContext(APIContext)
  const [previewImage, setPreviewImage] = useState(null);
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    description: "",
    cook_time: "",
    image_data: "",
    image_content_type: "",
    method: [],
    ingredients: [],
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [sucess, setSucess] = useState(false)


  const saveToDatabase = () => {
    setLoading(true)
    API.create_recipe(newRecipe).then((response) => {
      console.log('saved')
      setNewRecipe({
        name: "",
        description: "",
        cook_time: "",
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

      <h2>Add Recipe</h2>

      {error ? <Alert onClose={() => { setError(false) }} severity="error">{error}</Alert> : null}

      {sucess ? <Alert onClose={() => { setSucess(false) }} severity="success">{sucess.name} added!</Alert> : null}

      <RecipeForm
          recipe={newRecipe}
          setRecipe={setNewRecipe}
          previewImage={previewImage}
          setPreviewImage={setPreviewImage}
      />

      <div className={classes.SubmitButtonDiv}>
        <Button variant="contained" color="primary" onClick={saveToDatabase}>
          {loading ? <CircularProgress size={24} /> : "Save Recipe"}
        </Button>
      </div>
    </div>
  );
};

export default AddRecipePage;