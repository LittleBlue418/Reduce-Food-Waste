import React, { useState, useEffect, useContext } from 'react';
import classes from './EditRecipePage.module.css';

import { APIContext } from '../../context/APIContext';
import RecipeForm from '../RecipeForm/RecipeForm';
import { useParams, Link, useHistory } from "react-router-dom";

import Alert from '@material-ui/lab/Alert';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';



const EditRecipePage = () => {
  const API = useContext(APIContext)
  const [previewImage, setPreviewImage] = useState(null);
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const { recipe_id } = useParams();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)

  const history = useHistory();


  useEffect(() => {
    const loadRecipeAndImage = async (recipe_id) => {
      const recipe = await API.get_recipe(recipe_id)
      setRecipe(recipe)
      const data_url = await API.get_image_as_data_url(recipe.image_id)
      setPreviewImage(data_url)
    }
    loadRecipeAndImage(recipe_id)
  }, [recipe_id, API]);



  if (recipe === null) {
    return <CircularProgress />
  }


  const saveToDatabase = () => {
    setLoading(true)
    API.update_recipe(recipe_id, recipe).then((response) => {
      history.push(`/recipe/${recipe_id}`)
    }).catch((error) => {
      setError(error.response.data.message)
      setLoading(false)
      window.scrollTo(0, 0)
    })
  }

  const deleteRecipeFromDatabase = () => {
    API.delete_recipe(recipe_id).then(() => {
      history.push('/')
    }).catch((error) => {
      setError(error.response.data.message)
      setOpenDeleteDialog(false)
    })
  }



  return (
    <div className={classes.EditRecipePage}>

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Recipe"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to permanently delete this recipe?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteRecipeFromDatabase} color="primary" >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <div className={classes.HeaderDiv}>
        <Link to={`/recipe/${recipe_id}`}><ArrowBackIcon color="primary" /></Link>
        <h2>Edit Recipe</h2>
        <IconButton onClick={() => setOpenDeleteDialog(true)}>
          <DeleteIcon color="error" />
        </IconButton>
      </div>


      {error ? <Alert onClose={() => { setError(false) }} severity="error">{error}</Alert> : null}


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