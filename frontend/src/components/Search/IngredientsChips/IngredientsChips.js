import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { capitalize } from '../../../utilityFunctions';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

const IngredientsChips = ({ selectedIngredients, setSelectedIngredients}) => {
  const classes = useStyles();

  const unSelectIngredient = (ingredient_id) => {
    setSelectedIngredients(
        selectedIngredients.filter(ingredient => ingredient._id !== ingredient_id)
    )
  }

  return (
    <div className={classes.root}>
      {selectedIngredients.map((ingredient) => {
        return (
          <Chip
            label={capitalize(ingredient.name)}
            onDelete={() => unSelectIngredient(ingredient._id)}
            color="primary"
            key={ingredient._id}
          />
        )
      })}
    </div>
  );
};

export default IngredientsChips;