import React from 'react'
import RecipeCard from './RecipeCard/RecipeCard'
import classes from './RecipeCards.module.css'

const RecipeCards = ({recipes}) => {
  // title
  // dietary filters
  // ingredients
  // image

  return (
    <div className={classes.RecipeCards}>
      {
        recipes.map((recipe) => (
          <RecipeCard
            recipe={recipe}
            key={recipe.id}
          />
        ))
      }
    </div>
  )
}

export default RecipeCards