import React from 'react';
import classes from './AboutThisSite.module.css';

import BannerImage from '../../assets/images/site-banner-double.png'
import VeganIcon from '../../assets/icons/vegan.png';
import VegetarianIcon from '../../assets/icons/vegetarian.png';
import GlutenFreeIcon from '../../assets/icons/gluten_free.png';
import LactoseFreeIcon from '../../assets/icons/lactose_free.png';
import NutFreeIcon from '../../assets/icons/nut_free.png';
import EggFreeIcon from '../../assets/icons/egg_free.png';


const AboutThisSite = () => {
  return (
    <div>
      <div className={classes.HeaderDiv}>
        <div className={classes.Header}>
          <img src={BannerImage} alt="Site logo"></img>
          <h1>Tackle food waste &amp; save money!</h1>
        </div>
      </div>
      <div className={classes.Line}></div>
      <div className={classes.PageBody}>
        <p>
          We all know how it goes, you use half a packet of something for a meal and the
          other half sits in the fridge untill it goes off and has to be thrown away. We've
          all done it. It's estimated that in developed countries we waste about 100kg of food
          a year. That's a lot of waste, and a lot of money!
        </p>

        <h2>How to use this site:</h2>

        <p>
          Each recipe is marked with dietary requirement icons. These are automatically genrated
          from the ingredients in the recipe.
        </p>

        <div className={classes.DietaryKeyDiv}>
          <div className={classes.DietaryIconsDiv}>
            <img src={VeganIcon} alt="icon for vegan" />
            <p>Vegan</p>
          </div>
          <div className={classes.DietaryIconsDiv}>
            <img src={VegetarianIcon} alt="icon for vegtarian"/>
            <p>Vegetarian</p>
          </div>
          <div className={classes.DietaryIconsDiv}>
            <img src={GlutenFreeIcon} alt="icon for gluten free"/>
            <p>Gluten Free</p>
          </div>
          <div className={classes.DietaryIconsDiv}>
             <img src={LactoseFreeIcon} alt="icon for lactose free"/>
             <p>Lactose Free</p>
          </div>
          <div className={classes.DietaryIconsDiv}>
            <img src={NutFreeIcon} alt="icon for nut free"/>
            <p>Nut Free</p>
          </div>
          <div className={classes.DietaryIconsDiv}>
             <img src={EggFreeIcon} alt="icon for egg free"/>
             <p>Egg Free</p>
          </div>
        </div>

        <p>
          NOTE: These are a rough guide, and should not substitute the information on
          the ingredient lable!
        </p>



      </div>
    </div>
  );
};

export default AboutThisSite;