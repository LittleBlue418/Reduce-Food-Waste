import React, { useState } from 'react';
import classes from './AddIngredientDialog.module.css';

import APIClient from '../../../apiClient';
import { labelFromKey } from '../../../utilityFunctions';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';

const AddIngredientDialog = ({ open, setOpen }) => {
  const [API] = useState(new APIClient())
  const [dietaryRequirements, setDietaryRequirements] = useState({
    vegan: false,
    vegetarian: false,
    gluten_free: false,
    nut_free: false,
    egg_free: false,
  });
  const [ingredientName, setIngredientName] = useState(null)
  const [error, setError] = useState(false)

  const handleChange = (event) => {
    setDietaryRequirements({ ...dietaryRequirements, [event.target.name]: event.target.checked });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveToDatabase = () => {
    const newIngredient = {
      name: ingredientName,
      ...dietaryRequirements,
    }
    API.create_ingredient(newIngredient).then(() => {
      handleClose()
      setDietaryRequirements({
        vegan: false,
        vegetarian: false,
        gluten_free: false,
        nut_free: false,
        egg_free: false,
      })
      console.log('saved')
    }).catch((error) => {
      setError(error)
    })
  }

  const GreenCheckbox = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Ingredient</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If you didn't find the ingredient in the drop down list you can add it here!
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Ingredient Name"
            type="text"
            fullWidth
            onChange={(e) => setIngredientName(e.target.value)}
          />
          <FormGroup>
            {
              Object.entries(dietaryRequirements).map(([key, value]) => {
                return (
                  <FormControlLabel
                    control={<GreenCheckbox checked={value}
                      onChange={handleChange}
                      name={key} />}
                    key={key}
                    label={labelFromKey(key)}
                  />
                )
              })
            }
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={saveToDatabase} color="primary">
            Add New Ingredient
          </Button>
        </DialogActions>
      </Dialog>
    </div>

  );
};

export default AddIngredientDialog;