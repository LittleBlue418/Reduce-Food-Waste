import React from 'react';
import MethodStep from './MethodStep/MethodStep';

const RecipeMethod = ({method}) => {

  return (
    <div>
        {method.map((method_step, index) => {
          return (
            <MethodStep
              key={index}
              method_step={method_step}
              index={index}
          />
          )
        })}
    </div>
  );
};

export default RecipeMethod;