import React from 'react';
import './RecipeCard.css';
import { Link } from "react-router-dom";


const RecipeCard = ({recipe}) => {
  return (
      <Link to={"/recipe/" + recipe._id}>
      <div className="RecipeCard">

        <div className="RecipeHead">
          <p>{recipe.name}</p>
          <div className="IconDiv">
            {Object.entries(recipe.allergies).map(([key, value]) => {
              if (value === true) {
                  return (
                    <div key={recipe.id+key}
                        className={key}
                        alt={key}
                    />
                  )
              } else {
                return null
              }
            })}
          </div>
        </div>

        <div className="RecipeBody">
          <div className="RecipeImageDiv">
            <img alt={recipe.name} src={recipe.image_url}></img>
          </div>
          <div>

            <p>list of ingredients (chips)</p>
          </div>
        </div>
      </div>
      </Link>
  )

};

export default RecipeCard;