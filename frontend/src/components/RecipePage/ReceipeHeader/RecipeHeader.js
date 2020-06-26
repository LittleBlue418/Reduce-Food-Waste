import React from 'react';
import './RecipeHeader.css'


const RecipeHeader = ({ name, allergies }) => {
  return (
    <>
      <div className="RecipeHeader">
        <div className="TitleDiv">
          <h2>{name}</h2>
        </div>

        <div className="IconsDiv">
          <div className="IconDivRecipe">
            {Object.entries(allergies).map(([key, value]) => {
              if (value === true) {
                return (
                  <div key={key + "recipe"}
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
      </div>
    </>
  );
};

export default RecipeHeader;