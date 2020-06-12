import React, {useState} from 'react';
import classes from './TipBox.module.css'

import Chevron from '../../../assets/icons/chevron-down-solid.svg'

const tips = [
  {message: "If you cook too much rice put the leftover into the fridge straight away to prevent bacteria forming. Never eat rice that's been left out."},
  {message: "You can re-cook leftover rice, but make sure you heat it thoroughly to kill off any harmful bacteria."},
  {message: "You can eat cold leftover rice as long as it was refrigerated straight way and not left out."},
  {message: "Buy one get one free? Put the second one in the freezer for another day!"},
  {message: "Buying a large peice of meat and cutting it into portions is often cheaper than buying pre-cut. Just freeze the rest for another day."}
]

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
}

const randomTip = () => {
  return tips[randomNumber(0, (tips.length -1))]
}


const TipBox = () => {
  const [tipBoxShown, setTipBox] = useState (false)
  const toggleTipBox = () => setTipBox(!tipBoxShown)


  return (
    <div className={classes.TipBox}>
      <div
        className={classes.TipHeader}
        onClick={toggleTipBox}>
        <p>Tip!</p>
        <img alt="down arrow" src={Chevron}/>
      </div>
      {tipBoxShown ?
        <div className={classes.message}>
          <p>{randomTip().message}</p>
        </div> : null
      }

    </div>
  );
};

export default TipBox;