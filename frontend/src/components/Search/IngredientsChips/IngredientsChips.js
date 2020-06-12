import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

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

const IngredientsChips = ({ingredients}) => {
    const classes = useStyles();

    const handleDelete = () => {
      console.info('You clicked the delete icon.');
    };

  return (

    <div className={classes.root}>
      {ingredients.map((ingredient) =>{
        return (
          <Chip label={ingredient} onDelete={handleDelete} color="primary" />
        )
      })}
    </div>
  );
};

export default IngredientsChips;