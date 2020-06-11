import React from 'react';
import './RecipeHeader.css'

import AuthContext from '../../../context/AuthContext';
import Auxiliary from '../../../hoc/Auxiliary';
import EditIcon from '../../../assets/icons/edit-solid.svg';


const RecipeHeader = ({ name, allergies }) => {
  return (
    <Auxiliary>
      <div className="RecipeHeader">
        <div className="header1">
          <div className="StarDiv">
            <AuthContext.Consumer>
              {(context) => {
                if (context.authenticated) {
                  return (
                    <div className="star" />
                  )
                } else {
                  return (
                    <div className="empty_star" />
                  )
                }
              }}
            </AuthContext.Consumer>
          </div>

          <p>{name}</p>
        </div>
        <div className="header2">
          <button><img alt="edit icon" src={EditIcon} /></button>
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

      <div className="Line"></div>
    </Auxiliary>
  );
};

export default RecipeHeader;