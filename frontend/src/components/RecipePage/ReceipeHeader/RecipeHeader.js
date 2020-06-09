import React from 'react';
import classes from './RecipeHeader.module.css'

import AuthContext from '../../../context/AuthContext';


const RecipeHeader = () => {
  return (

  <div className={classes.RecipeHeader}>
    <div className={classes.StarDiv}>
      <AuthContext.Consumer>
            {(context) => {
              if (context.authenticated) {
                return (
                  <div className={classes.star} />
                )
              } else {
                return (
                  <div className={classes.empty_star} />
                )
              }
            }}
      </AuthContext.Consumer>
    </div>

    <p>Recipe title here</p>
    <button>Edit</button>
    <div>X X X X</div>

  </div>


  );
};

export default RecipeHeader;