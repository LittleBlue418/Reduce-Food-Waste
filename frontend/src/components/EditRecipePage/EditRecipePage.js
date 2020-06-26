import React, { useState, useEffect, useContext } from 'react';
import classes from './EditRecipePage.module.css';

import { APIContext } from '../../context/APIContext';
import RecipeForm from '../RecipeForm/RecipeForm';
import { useParams, Link } from "react-router-dom";

import Alert from '@material-ui/lab/Alert';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteIcon from '@material-ui/icons/Delete';



const EditRecipePage = () => {
  const API = useContext(APIContext)
  const [previewImage, setPreviewImage] = useState(null);
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [sucess, setSucess] = useState(false)
  const { recipe_id } = useParams();

  useEffect(() => {
    API.get_recipe(recipe_id).then((recipe) => {
      setRecipe(recipe)
    })
  }, [recipe_id, API]);

  if (recipe === null) {
    return <CircularProgress />
  }


  const saveToDatabase = () => {
    // setLoading(true)
    // API.create_recipe(recipe).then((response) => {
    //   console.log('saved')
    //   setRecipe({
    //     name: "",
    //     description: "",
    //     image_data: "",
    //     image_content_type: "",
    //     method: [],
    //     ingredients: [],
    //   })
    //   setPreviewImage(null)
    //   setError(null)
    //   setSucess(response)
    //   setLoading(false)
    //   window.scrollTo(0, 0)
    // }).catch((error) => {
    //   setError(error.response.data.message)
    //   setLoading(false)
    //   window.scrollTo(0, 0)
    // })
  }


  return (
    <div className={classes.EditRecipePage}>
      <div className={classes.HeaderDiv}>
        <Link to={`/recipe/${recipe_id}`}><ArrowBackIcon color="primary"/></Link>
        <h2>Edit Recipe</h2>
        <Link to="/"><DeleteIcon color="error"/></Link>
      </div>



      {error ? <Alert onClose={() => { setError(false) }} severity="error">{error}</Alert> : null}

      {sucess ? <Alert onClose={() => { setSucess(false) }} severity="success">{sucess.name} added!</Alert> : null}

      <RecipeForm
          recipe={recipe}
          setRecipe={setRecipe}
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

export default EditRecipePage;