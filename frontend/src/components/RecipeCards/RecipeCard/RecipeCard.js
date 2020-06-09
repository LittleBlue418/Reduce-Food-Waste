import React from 'react';
import './RecipeCard.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import picture from '../../../assets/images/pLLXRlt.jpg';


const RecipeCard = ({recipe}) => {
  return (
    <Router>
      <Link to="/recipe">
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
              }
            })}
          </div>
        </div>

        <div className="RecipeBody">
          <div className="RecipeImageDiv">
            <img src={picture}></img>
          </div>
          <div>

            <p>list of ingredients (chips)</p>
          </div>
        </div>
      </div>
      </Link>
    </Router>
  )

};

export default RecipeCard;