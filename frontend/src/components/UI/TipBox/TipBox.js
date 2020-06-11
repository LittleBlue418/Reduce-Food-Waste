import React from 'react';
import classes from './TipBox.module.css'

import Chevron from '../../../assets/icons/chevron-down-solid.svg'


const TipBox = ({clicked, tipShown, tipFunc}) => {
  return (
    <div className={classes.TipBox}>
      <div
        className={classes.TipHeader}
        onClick={clicked}>
        <p>Tip!</p>
        <img alt="down arrow" src={Chevron}/>
      </div>
      {tipShown ?
        <div className={classes.message}>
          <p>{tipFunc().message}</p>
        </div> : null
      }

    </div>
  );
};

export default TipBox;