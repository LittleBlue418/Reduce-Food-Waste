import React from 'react';
import classes from './Banner.module.css';
import Logo from '../Logo/Logo';



const Banner = () => (
  <div className={classes.Banner}>
    <div className={classes.LogoContainer}>
        <Logo />
    </div>
    <div className={classes.BannerText}>Reduce Food Waste</div>
  </div>
);

export default Banner;